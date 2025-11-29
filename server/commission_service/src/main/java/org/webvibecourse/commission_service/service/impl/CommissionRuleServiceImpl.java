package org.webvibecourse.commission_service.service.impl;

import io.github.perplexhub.rsql.RSQLJPASupport;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.commonsecurity.SecurityUtils;
import org.example.commonutils.util.GenericSpecBuilder;
import org.example.commonutils.util.SearchHelper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.webvibecourse.commission_service.dto.request.CommissionRuleRequest;
import org.webvibecourse.commission_service.dto.response.CommissionRuleResponse;
import org.webvibecourse.commission_service.entity.CommissionRule;
import org.webvibecourse.commission_service.mapper.CommissionRuleMapper;
import org.webvibecourse.commission_service.repository.CommissionRuleRepository;
import org.webvibecourse.commission_service.service.CommissionRuleService;

import java.util.List;

/**
 * Service implement responsible for managing commission rules,including their
 * lifecycle operations and associated business logic
 *
 * <p>This service handles:</p>
 * <ul>
 *     <li>Create new commission rules</li>
 *     <li>Updating existing commission</li>
 *     <li>Activating or deactivating commission rules</li>
 * </ul>
 * <p>This class provides the concrete implementation of {@link CommissionRuleService}</p>
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CommissionRuleServiceImpl implements CommissionRuleService {
    /** Repository for performing database operations on commission rules. */
    private final CommissionRuleRepository repository;
    /** Utility class for accessing security-related information(e.g., getCurrentUserId()).*/
    private final SecurityUtils securityUtils;
    /** Mapper for converting between CommissionRule and DTOS. */
    private final CommissionRuleMapper mapper;

    /** Fields allowed for searching. */
    private static final List<String> SEARCH_FIELDS =
            List.of("shopCode");
    /**
     * Create a new commission rule based on the provider request
     * @param request request the DTO containing commission rule information to be created
     */
    @Override
    public void create(CommissionRuleRequest request) {
        CommissionRule entity = mapper.toEntity(request);
        repository.save(entity);
    }

    /**
     * Updates an existing commission rule identified  by the given ID using the
     * provided request data
     * <p>The method fetches the existing entity from the database,applies the updated
     * values from the request through the mapper,and the persists the changes</p>
     * @param id the id of the commission rule to update
     * @param request the DTO containing the updated commission rule data
     */
    @Override
    public void update(Long id, CommissionRuleRequest request) {
        CommissionRule entity = repository.getReferenceById(id);

        mapper.update(request, entity);
        repository.save(entity);
    }

    /**
     * fetches a paginated list of commission rule with support for dynamic search, filtering, and sorting.
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
     * @return paginated list of commission rule responses
     */
    @Override
    public Page<CommissionRuleResponse> getCommissionRules
    (
            Integer page,
            Integer size,
            String sort,
            String searchField,
            String searchValue,
            String filter,
            boolean all
    ) {
        log.info("start find commission rules");

        Pageable pageable = all
                ? Pageable.unpaged()
                : PageRequest.of(page-1, size);

        Specification<CommissionRule> spec = GenericSpecBuilder.build(
                sort,
                filter,
                searchField,
                searchValue,
                SEARCH_FIELDS);
        return repository.findAll(spec,pageable)
                .map(mapper::toResponse);
    }

    /**
     * Updates the active status of commission rule by its ID
     *
     * @param id The ID of the CommissionRule to update
     * @param status The new status (true = active, false = inactive)
     */
    @Override
    public void changeStatus(Long id, Boolean status) {

        CommissionRule entity = repository.getReferenceById(id);

        entity.setActive(status);
        repository.save(entity);
    }

    /**
     * Retrieves a commission rule by its ID.
     *
     * @param id id the ID of the commission rule
     * @return the corresponding commission rule
     */
    @Override
    public CommissionRuleResponse findById(Long id) {
        return repository.findById(id)
                .map(mapper::toResponse)
                .orElseThrow(
                        () -> new EntityNotFoundException("Commission role not found with id " + id));
    }


}
