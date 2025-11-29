package org.example.commonutils.util;

import io.github.perplexhub.rsql.RSQLJPASupport;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

/**
 * Utility class providing a generic, reusable builder for creating
 * dynamic JPA Specifications that support sorting, filtering (via RSQL),
 * and text-based searching.
 *
 * <p>This class helps reduce duplicated logic across multiple services by
 * centralizing sort, filter, and search behavior into a single reusable
 * component. It enables consistent query handling across modules such as:</p>
 *
 * <ul>
 *     <li>Product Service (Product, Variant, Category, Inventory)</li>
 *     <li>Shop Service (Shop, ShopAddress)</li>
 *     <li>User / Account Service</li>
 *     <li>Commission History / Transaction Service</li>
 * </ul>
 *
 * <p>Benefits:</p>
 * <ul>
 *     <li>Eliminates repeated code in service layers.</li>
 *     <li>Ensures unified behavior for sorting, filtering, and searching.</li>
 *     <li>Improves maintainability and readability of services.</li>
 *     <li>Prevents accidental misuse of dynamic fields by restricting search fields.</li>
 * </ul>
 */
public class GenericSpecBuilder<T> {
    /**
     * Builds a dynamic JPA Specification that supports:
     * <ul>
     *     <li><b>Sorting</b> – using RSQL format (e.g., {@code id,desc} or {@code name,asc})</li>
     *     <li><b>Filtering</b> – using RSQL filter expressions
     *         (e.g. {@code status==1;price>=100})</li>
     *     <li><b>Searching</b> – text keyword search on predefined allowed fields</li>
     * </ul>
     *
     * <p>This method is generic, reusable for all entities and services.</p>
     *
     * <p>Parameters:</p>
     * <ul>
     *     <li><b>sort</b> – Sort expression (e.g. "id,desc"). Optional.</li>
     *     <li><b>filter</b> – RSQL filter expression. Optional.</li>
     *     <li><b>searchField</b> – Specific field to search on. Optional.</li>
     *     <li><b>searchValue</b> – The search text. Optional.</li>
     *     <li><b>allowedSearchFields</b> – Whitelist of allowed fields for text searching.</li>
     * </ul>
     *
     * <p>Return value:</p>
     * <ul>
     *     <li>A composed {@code Specification<T>} that merges sort, filter, and search.</li>
     *     <li>If no input is provided, returns a neutral conjunction specification.</li>
     * </ul>
     *
     * <p>Example usage:</p>
     *
     * <pre>{@code
     * private static final String[] SEARCH_FIELDS = {"name", "email", "phone"};
     *
     * Specification<User> spec = GenericSpecBuilder.build(
     *     sort,
     *     filter,
     *     searchField,
     *     searchValue,
     *     SEARCH_FIELDS
     * );
     * }</pre>
     *
     * @param sort Sort expression (optional)
     * @param filter RSQL filter string (optional)
     * @param searchField Field to match searchValue against (optional)
     * @param searchValue Value used for searching (optional)
     * @param allowedSearchFields Allowed fields for searching
     * @return A composed JPA Specification
     * @param <T> Entity type
     */
    public static <T> Specification<T> build
    (            String sort,
                 String filter,
                 String searchField,
                 String searchValue,
                 List<String> allowedSearchFields){

        // Base specification (neutral)
        Specification<T> spec = Specification.allOf();

        //SORT
        if(sort != null && !sort.isEmpty()){
            spec = spec.and(RSQLJPASupport.toSort(sort));
        }

        // FILTER
        if(filter != null && !filter.isEmpty()){
            spec = spec.and(RSQLJPASupport.toSpecification(filter));
        }

        // SEARCH
        if (searchValue != null && !searchValue.isEmpty()) {
            spec = spec.and(SearchHelper.buildSearchSpec(
                    searchField,
                    searchValue,
                    allowedSearchFields));
        }
        return spec;
    }
}
