package org.webvibecourse.shop_service.service.impl;

import io.github.perplexhub.rsql.RSQLJPASupport;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.commonsecurity.SecurityUtils;
import org.example.commonutils.Enum.ShopStatus;
import org.example.commonutils.util.SearchHelper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.webvibecourse.shop_service.dto.response.ShopResponse;
import org.webvibecourse.shop_service.entity.Shop;
import org.webvibecourse.shop_service.entity.ShopStatusHistory;
import org.webvibecourse.shop_service.mapper.ShopMapper;
import org.webvibecourse.shop_service.repository.ShopRepository;
import org.webvibecourse.shop_service.repository.ShopStatusHistoryRepository;
import org.webvibecourse.shop_service.service.ShopService;

import java.util.List;

/**
 * Service responsible for managing the lifecycle and business logic of Shop entities.
 *
 * <p>This service handles:</p>
 * <ul>
 *     <li>Approving, rejecting, blocking, and restoring shops</li>
 *     <li>Validating allowed status transitions</li>
 *     <li>Recording status change history for auditing</li>
 *     <li>Fetching shop details and querying shops with search, filter, and sorting</li>
 * </ul>
 *
 * <p>
 * Acts as the core business layer ensuring data integrity and enforcing rules
 * related to shop status management.
 * </p>
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ShopServiceImpl implements ShopService {
    //Repository for database operations
    private final ShopRepository shopRepository;
    private final ShopStatusHistoryRepository historyRepository;
    //Field utils security.Example:getCurrentUserId()
    private final SecurityUtils securityUtils;
    //field Mapper
    private final ShopMapper shopMapper;
    //Fields allowed for searching
    private static final List<String> SEARCH_FIELDS =
            List.of("shopCode");

    /**
     * Approve shop is in PENDING -> ACTIVE status.
     *
     * @param id
     */
    @Override
    public void approveShop(Long id) {
        Shop shop = getShopRef(id);

        changeStatus(
                shop,
                ShopStatus.PENDING,
                ShopStatus.ACTIVE,
                "Approved Shop"
                    );
    }

    /**
     * Get shop using findById and throw error if it doesn't exist.
     *
     * @param id
     * @return
     */
    private Shop getShop(Long id) {
        return shopRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Shop not found with id " + id));
    }

    /**
     * Save shop status change history.
     *
     * @param shop
     * @param previous
     * @param next
     * @param reason
     */
    private void saveHistory(Shop shop, Integer previous, Integer next, String reason) {
        //1.prepare data set fields prepare to save shop status history
        ShopStatusHistory shopStatusHistory = ShopStatusHistory.builder()
                .shop(shop)
                .previousStatus(previous)
                .newStatus(next)
                .reason(reason)
                .actionBy(securityUtils.getCurrentUserId())
                .build();
        //2.save data to shop status history table from set data
        historyRepository.save(shopStatusHistory);
    }

    /**
     * Get shop reference (lazy loading) –
     * use when you only need a reference and
     * don't need to fetch the whole thing.
     *
     * @param id
     * @return
     */
    private Shop getShopRef(Long id) {
        try {
            return shopRepository.getReferenceById(id);
        } catch (Exception e) {
            throw new EntityNotFoundException
                    ("Shop reference not found: " + id);
        }
    }

    /**
     * Reject shop from PENDING -> REJECTED status.
     *
     * @param id
     * @param reason
     */
    @Override
    public void rejectShop(Long id, String reason) {
        //1.query data to get information of a specific shop
        Shop shop = getShopRef(id);
        //2.Call the change Status
        // function to reject the shop's status.
        changeStatus(
                shop,
                ShopStatus.PENDING,
                ShopStatus.REJECTED,
                reason
                    );
    }

    /**
     * Block shop from ACTIVE -> BLOCKED state.
     *
     * @param id
     * @param reason
     */
    @Override
    public void blockShop(Long id, String reason) {
        //1.query data to get information of a specific shop
        Shop shop = getShopRef(id);
        //2.Call the change Status
        // function to block the shop's status.
        changeStatus(
                shop,
                ShopStatus.ACTIVE,
                ShopStatus.BLOCKED,
                reason
                    );
    }

    /**
     * Common function to change shop status.
     * - Check shop is in requiredCurrentStatus
     * - Change to new status
     * - Save history
     */
    private void changeStatus(
            Shop shop,
            ShopStatus requiredCurrentStatus,
            ShopStatus nextStatus,
            String reason
                             ) {
        //1.Validate current state
        Integer previous = shop.getStatus();
        if (!previous.equals(requiredCurrentStatus.getCode())) {
            throw new IllegalStateException(
                    "Shop must be in state " + requiredCurrentStatus.name()
                    + " to change to " + nextStatus.name()
            );
        }
        //2.set New status
        shop.setStatus(nextStatus.getCode());
        shopRepository.save(shop);

        //3.save history change
        saveHistory(shop, previous, nextStatus.getCode(), reason);
    }

    /**
     * Get shop details and map to DTO.
     *
     * @param id
     * @return
     */
    @Override
    public ShopResponse getDetailShop(Long id) {
        return shopMapper.toResponse(getShop(id));
    }

    /**
     * Retrieves a paginated list of shops with support for dynamic search, filtering, and sorting.
     *
     * <p>Features:</p>
     * <ul>
     *     <li>Sorting using RSQL syntax</li>
     *     <li>Filtering using RSQL specifications</li>
     *     <li>Text search on predefined fields</li>
     *     <li>Optional unpaged results when "all" is true</li>
     * </ul>
     *
     * @param page        the page number (0-based)
     * @param size        number of items per page
     * @param sort        RSQL sort expression
     * @param searchField field used for searching
     * @param searchValue value to search for
     * @param filter      RSQL filter expression
     * @param all         if true, return unpaged results
     * @return paginated list of shop responses
     */

    @Override
    public Page<ShopResponse> getShops
    (
            Integer page,
            Integer size,
            String sort,
            String searchField,
            String searchValue,
            String filter,
            boolean all
    ) {
        log.info("start find shops");

        Pageable pageable = all
                ? Pageable.unpaged()
                : PageRequest.of(page - 1, size);
        Specification<Shop> spec = Specification.where(null);
        //sort
        if (sort != null && !sort.isEmpty()) {
            spec = spec.and(RSQLJPASupport.toSort(sort));
        }
        //filter
        if (filter != null && !filter.isEmpty()) {
            spec = spec.and(RSQLJPASupport.toSpecification(filter));
        }
        //Search by text
        if (searchValue != null && !searchValue.isEmpty()) {
            spec = spec.and(
                    SearchHelper.buildSearchSpec
                            (
                                    searchField,
                                    searchValue,
                                    SEARCH_FIELDS
                            )
                           );
        }
        //Query by any params
        return shopRepository.
                findAll(spec, pageable)
                .map(shopMapper::toResponse);
    }

    /**
     * Restore shop:
     * - Only allow restore from BLOCKED or INACTIVE
     * - Change back to ACTIVE
     */
    @Override
    public void restoreShop(Long id) {

        Shop shop = getShopRef(id);
        Integer currentStatus = shop.getStatus();
        //1. Check if status can be restored
        boolean restorable = !currentStatus.
                equals(ShopStatus.BLOCKED.getCode()) &&
                             !currentStatus.
                                     equals(ShopStatus.INACTIVE.getCode());
        if (restorable) {

            throw new IllegalStateException(
                    "Shop must be BLOCKED or INACTIVE to restore."
            );
        }
        //2. Determine current state before restore
        ShopStatus fromStatus = currentStatus ==
                                ShopStatus.BLOCKED.getCode()
                ? ShopStatus.BLOCKED
                : ShopStatus.INACTIVE;
        //3. Active Status
        changeStatus(
                shop,
                fromStatus,
                ShopStatus.ACTIVE,
                "Restore Shop"
                    );
    }
}
