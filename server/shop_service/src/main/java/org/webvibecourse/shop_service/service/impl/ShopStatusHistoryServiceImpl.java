package org.webvibecourse.shop_service.service.impl;

import io.github.perplexhub.rsql.RSQLJPASupport;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.commonutils.util.SearchHelper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.webvibecourse.shop_service.dto.response.ShopStatusHistoryResponse;
import org.webvibecourse.shop_service.entity.ShopStatusHistory;
import org.webvibecourse.shop_service.mapper.ShopStatusHistoryMapper;
import org.webvibecourse.shop_service.repository.ShopStatusHistoryRepository;
import org.webvibecourse.shop_service.service.ShopStatusHistoryService;

import java.util.List;

/**
 * Service responsible for managing the lifecycle and business logic of ShopStatusHistory entities.
 *
 * <p>This service handles:</p>
 * <ul>
 *     <li> Querying shop status history with search, filter, and sorting</li>
 * </ul>
 *
 * <p>
 * Serves as the business layer ensuring accurate retrieval and management
 * of shop status history records
 * </p>
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ShopStatusHistoryServiceImpl implements ShopStatusHistoryService {
    //Repository for database operations
    private final ShopStatusHistoryRepository repository;

    //Fields allowed for searching
    private static final List<String> SEARCH_FIELDS =
            List.of("previousStatus");
    //field mapper
    private final ShopStatusHistoryMapper mapper;

    /**
     * Retrieves a paginated list of history shops
     * with support for dynamic search, filtering, and sorting.
     *
     * <p>Features:</p>
     * <ul>
     *     <li>Sorting using RSQL syntax</li>
     *     <li>Filtering using RSQL specifications</li>
     *     <li>Text search on predefined fields</li>
     *     <li>Optional unpaged results when "all" is true</li>
     * </ul>
     * @param page the page number (0-based)
     * @param size number of items per page
     * @param sort  RSQL sort expression
     * @param searchField field used for searching
     * @param searchValue value to search for
     * @param filter RSQL filter expression
     * @param all if true, return unpaged results
     * @return paginated list of shop status history responses
     */
    @Override
    public Page<ShopStatusHistoryResponse> getShopStatusHistories
            (
                    Integer page,
                    Integer size,
                    String sort,
                    String searchField,
                    String searchValue,
                    String filter,
                    boolean all
            ) {
        log.info("start find shops status histories");

        Pageable pageable = all
                ? Pageable.unpaged()
                : PageRequest.of(page-1, size);
        Specification<ShopStatusHistory> spec = Specification.where(null);
        //sort
        if(sort != null && !sort.isEmpty()) {
            spec = spec.and(RSQLJPASupport.toSort(sort));
        }
        //filter
        if(filter != null && !filter.isEmpty()) {
            spec = spec.and(RSQLJPASupport.toSpecification(filter));
        }
        if(searchField != null && !searchField.isEmpty()) {
            spec = spec.and(
                    SearchHelper.buildSearchSpec
                            (searchField,
                            searchValue,
                            SEARCH_FIELDS));
        }
        //Querying param and mapper ShopStatusHistoryResponse
        return repository.
                findAll(spec,pageable)
                .map(mapper::toResponse);
    }
}
