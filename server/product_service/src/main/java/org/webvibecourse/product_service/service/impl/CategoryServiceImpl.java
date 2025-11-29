package org.webvibecourse.product_service.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.commonsecurity.SecurityUtils;
import org.example.commonutils.util.GenericSpecBuilder;
import org.springframework.data.domain.Page;
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

import java.util.List;

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
            List.of("name","parentId");
    @Override
    public void create(CategoryRequest request) {
        Category category = mapper.toEntity(request);
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
        log.info("start get categories");

        Pageable pageable = all
                ? Pageable.unpaged()
                : PageRequest.of(page-1,size);

        Specification<Category> spec = GenericSpecBuilder.build
                (
                        sort,
                        filter,
                        searchField,
                        searchValue,
                        SEARCH_FIELDS
                );
        return repository.findAll(spec,pageable)
                .map(mapper::toResponse);
    }

    /**
     * Retrieves a category by its ID.
     *
     * @param id id the ID of the category
     * @return the corresponding category
     */
    @Override
    public CategoryResponse getCategoryById(Long id) {
        return repository.findById(id)
                .map(mapper::toResponse)
                .orElseThrow(
                        () -> new EntityNotFoundException("Category not found with id " + id));
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
