package org.webvibecourse.product_service.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.commonsecurity.SecurityUtils;
import org.example.commonutils.util.GenericSpecBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.webvibecourse.product_service.dto.request.CategoryRequest;
import org.webvibecourse.product_service.dto.response.CategoryResponse;
import org.webvibecourse.product_service.entity.Category;
import org.webvibecourse.product_service.mapper.CategoryMapper;
import org.webvibecourse.product_service.repository.CategoryRepository;
import org.webvibecourse.product_service.service.CategoryService;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service implement responsible for managing category,including their
 * lifecycle operations and associated business logic
 *
 * <p>This service handles:</p>
 * <ul>
 *     <li>Create new categories</li>
 *     <li>Updating existing categories</li>
 *     <li>Fetching category details by ID</li>
 *     <li>Retrieving paginated category lists with dynamic filtering, sorting, and searching</li>
 *      <li>Activating or deactivating category</li>
 * </ul>
 * <p>This class provides the concrete implementation of {@link CategoryService}</p>
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {
    /** Repository for performing database operations on categories. */
    private final CategoryRepository repository;

    /** Utility class for accessing security-related information(e.g., getCurrentUserId()).*/
    private final SecurityUtils securityUtils;

    /** Mapper for converting between category and DTOS. */
    private final CategoryMapper mapper;

    /** Fields allowed for searching. */
    private static final List<String> SEARCH_FIELDS =
            List.of("name","code");
    @Override
    public void create(CategoryRequest request) {
        Category category = mapper.toEntity(request,securityUtils.getCurrentUserId());
        repository.save(category);
    }

    /**
     * Updates an existing category identified  by the given ID using the
     * provided request data
     * <p>The method fetches the existing entity from the database,applies the updated
     * values from the request through the mapper,and the persists the changes</p>
     * @param id the id of the category to update
     * @param request the DTO containing the updated category data
     */
    @Override
    public void update(Long id, CategoryRequest request) {
        Category category = repository.getReferenceById(id);

        mapper.update(request, category);
        repository.save(category);
    }

    /**
     * fetches a paginated list of categories
     * with support for dynamic search, filtering, and sorting.
     *
     * <p>Features:</p>
     * <ul>
     *     <li>Sorting using RSQL syntax</li>
     *     <li>Filtering using RSQL specifications</li>
     *     <li>Text search on predefined fields</li>
     *     <li>Optional unpaged results when "all" is true</li>
     * </ul>
     * Flow:
     * 1. Build Pageable (or unpaged)
     * 2. Build Specification using GenericSpecBuilder
     * 3. Query DB for Page<Category>
     * 4. Load all categories → build lookup map (id → Category)
     * 5. Convert each Category → CategoryResponse
     * 6. Add parentName & level
     * 7. Build children hierarchy **within the current page only**
     * 8. Return Page<CategoryResponse>
     * @param page        the page number (0-based)
     * @param size        number of items per page
     * @param sort        RSQL sort expression
     * @param searchField field used for searching
     * @param searchValue value to search for
     * @param filter      RSQL filter expression
     * @param all         if true, return unpaged results
     * @return paginated list of categories responses
     */
    @Override
    public Page<CategoryResponse> getCategories(
            Integer page, Integer size, String sort, String searchField,
            String searchValue, String filter, boolean all
                                               ) {

        Pageable pageable = all ? Pageable.unpaged() : PageRequest.of(page - 1, size);

        // 1. Query các category MATCH (theo search + filter)
        Specification<Category> spec = GenericSpecBuilder.build(
                sort, filter, searchField, searchValue, SEARCH_FIELDS
                                                               );
        Page<Category> matchPage = repository.findAll(spec, pageable);

        // 2. Load FULL LIST để build tree
        List<Category> allCats = repository.findAll();
        Map<Long, Category> lookup = buildLookup(allCats);

        // 3. Gom tất cả: MATCH + PARENTS + CHILDREN
        Set<Category> included = new LinkedHashSet<>();

        for (Category cat : matchPage.getContent()) {
            collectParents(cat, lookup, included);
            collectChildren(cat, lookup, included);
        }

        // 4. Map sang DTO
        List<CategoryResponse> flatDtos = included.stream()
                .map(c -> {
                    CategoryResponse dto = mapper.toResponse(c);
                    enhanceCategory(dto, lookup);
                    return dto;
                })
                .collect(Collectors.toList());

        // 5. Build tree & lấy roots
        List<CategoryResponse> roots = buildChildrenTree(flatDtos);

        return new PageImpl<>(roots, pageable, roots.size());
    }

    private void collectChildren(Category cat, Map<Long, Category> lookup, Set<Category> result) {
        if (cat == null || result.contains(cat)) return;

        result.add(cat);

        lookup.values().stream()
                .filter(c -> cat.getId().equals(c.getParentId()))
                .forEach(child -> collectChildren(child, lookup, result));
    }



    private void collectParents(Category cat, Map<Long, Category> lookup, Set<Category> result) {
        if (cat == null || result.contains(cat)) return;

        result.add(cat);

        if (cat.getParentId() != null) {
            collectParents(lookup.get(cat.getParentId()), lookup, result);
        }
    }

    private List<CategoryResponse> buildChildrenTree(List<CategoryResponse> flatList) {

        Map<Long, CategoryResponse> map = flatList.stream()
                .collect(Collectors.toMap(CategoryResponse::getId, c -> c));

        // reset children
        flatList.forEach(dto -> dto.setChildren(new ArrayList<>()));

        // assign children
        for (CategoryResponse dto : flatList) {
            if (dto.getParentId() != null) {
                CategoryResponse parent = map.get(dto.getParentId());
                if (parent != null) {
                    parent.getChildren().add(dto);
                }
            }
        }

        // return root nodes
        return flatList.stream()
                .filter(dto -> dto.getParentId() == null || !map.containsKey(dto.getParentId()))
                .collect(Collectors.toList());
    }


    /** Creates a lookup map: id → Category (ignoring null ids). */
    private Map<Long, Category> buildLookup(List<Category> categories) {
        return categories.stream()
                .filter(c -> c.getId() != null)
                .collect(Collectors.toMap(Category::getId, c -> c));
    }


    /**
     * Enriches a CategoryResponse with:
     * - parentName
     * - level (depth in category tree)
     */
    private void enhanceCategory(CategoryResponse dto, Map<Long, Category> lookup) {
        Category cat = lookup.get(dto.getId());
        if (cat == null) return;

        dto.setParentName(resolveParentName(cat, lookup));
        dto.setLevel(calcLevel(cat, lookup));
    }

    /** Resolves parent name (returns null for root or missing parent). */
    private String resolveParentName(Category category, Map<Long, Category> lookup) {
        Long parentId = category.getParentId();
        if (parentId == null) return null;

        Category parent = lookup.get(parentId);
        return parent == null ? null : parent.getName();
    }

    /**
     * Computes the depth level of a category:
     * - level = number of ancestors
     */
    private int calcLevel(Category category, Map<Long, Category> lookup) {
        int level = 0;
        Long parentId = category.getParentId();

        while (parentId != null) {
            level++;
            Category parent = lookup.get(parentId);
            if (parent == null) break;
            parentId = parent.getParentId();
        }
        return level;
    }



    /**
     * Retrieves a category by its ID.
     *
     * @param id id the ID of the category
     * @return the corresponding category
     */
    @Override
    public CategoryResponse getCategoryById(Long id) {

        Category category = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Category not found with id " + id
                ));

        List<Category> allCategories = repository.findAll();

        Map<Long, Category> lookup = buildLookup(allCategories);

        CategoryResponse dto = mapper.toResponse(category);

        enhanceCategory(dto, lookup);
        dto.setChildren(findChildren(dto.getId(), lookup));

        return dto;
    }
    /**
     * Finds direct children of a given category from full lookup map.
     * (Only used for getCategoryById)
     */
    private List<CategoryResponse> findChildren(Long id, Map<Long, Category> lookup) {
        return lookup.values().stream()
                .filter(c -> id.equals(c.getParentId()))
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Updates the active status of category by its ID
     *
     * @param id The ID of the category to update
     * @param status The new status (true = active, false = inactive)
     */
    @Override
    public void changeStatus(Long id, Boolean status) {
        Category category = repository.getReferenceById(id);

        category.setActive(status);
        repository.save(category);
    }
}
