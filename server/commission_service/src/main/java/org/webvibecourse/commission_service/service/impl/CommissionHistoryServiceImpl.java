package org.webvibecourse.commission_service.service.impl;

import io.github.perplexhub.rsql.RSQLJPASupport;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.commonsecurity.SecurityUtils;
import org.example.commonutils.util.SearchHelper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.webvibecourse.commission_service.dto.response.CommissionHistoryResponse;
import org.webvibecourse.commission_service.entity.CommissionHistory;
import org.webvibecourse.commission_service.mapper.CommissionHistoryMapper;
import org.webvibecourse.commission_service.repository.CommissionHistoryRepository;
import org.webvibecourse.commission_service.service.CommissionHistoryService;

import java.util.List;

/**
 * Service implement responsible for managing commission histories,including their
 * lifecycle operations and associated business logic
 *
 * <p>This service handles:</p>
 * <ul>
 *    <li>Fetching commission history details and
 *    querying commission histories with search, filter, and sorting</li>
 * </ul>
 * <p>This class provides the concrete implementation of {@link CommissionHistoryService}</p>
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class CommissionHistoryServiceImpl implements CommissionHistoryService {
    /** Repository for performing database operations on commission histories. */
    private final CommissionHistoryRepository repository;

    /** Utility class for accessing security-related information(e.g., getCurrentUserId()).*/
    private final SecurityUtils securityUtils;

    /** Mapper for converting between CommissionHistory and DTOS. */
    private final CommissionHistoryMapper mapper;

    /** Fields allowed for searching. */
    private static final List<String> SEARCH_FIELDS =
            List.of("orderAmount");

    /**
     * fetches a paginated list of commission histories
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
     * @return paginated list of commission histories responses
     */
    @Override
    public Page<CommissionHistoryResponse> getCommissionHistories
            (
                    Integer page,
                    Integer size,
                    String sort,
                    String searchField,
                    String searchValue,
                    String filter,
                    boolean all
            ) {
        log.info("start get commission histories");

        Pageable pageable = all
                ? Pageable.unpaged()
                : PageRequest.of(page - 1, size);

        Specification<CommissionHistory> spec = buildSpecification(
                sort,
                filter,
                searchField,
                searchValue);
        return repository.findAll(spec,pageable)
                .map(mapper::toResponse);
    }
    /**
     * Retrieves a commission history by its ID.
     *
     * @param id id the ID of the commission history
     * @return the corresponding commission history
     */
    @Override
    public CommissionHistoryResponse getCommissionHistoryById(Long id) {
        return repository.findById(id)
                .map(mapper::toResponse)
                .orElseThrow(
                        () -> new EntityNotFoundException("Commission history not found with id " + id));
    }

    /**
     * Builds a dynamic JPA Specification based on sorting, filtering,
     * and text-search parameters provided by the client.
     *
     * <p>This method combines sort, filter, and search specifications into a
     * single Specification instance, allowing flexible querying of commission
     * histories.</p>
     *
     * @param sort        the sort expression (RSQL format), may be null or empty
     * @param filter      the filter expression (RSQL format), may be null or empty
     * @param searchField the field to perform text search on
     * @param searchValue the text value to search for
     * @return a combined Specification representing all applied query conditions
     */
    private Specification<CommissionHistory> buildSpecification
            (
                    String sort,
                    String filter,
                    String searchField,
                    String searchValue
            ){
        Specification<CommissionHistory> spec = Specification.
                where((root, query, cb)
                              -> cb.conjunction());
        // Sort
        if (sort != null && !sort.isEmpty()) {
            spec = spec.and(RSQLJPASupport.toSort(sort));
        }

        // Filter
        if (filter != null && !filter.isEmpty()) {
            spec = spec.and(RSQLJPASupport.toSpecification(filter));
        }

        // Search
        if (searchValue != null && !searchValue.isEmpty()) {
            spec = spec.and(
                    SearchHelper.buildSearchSpec(
                            searchField,
                            searchValue,
                            SEARCH_FIELDS));
        }
        return spec;
    }
}
