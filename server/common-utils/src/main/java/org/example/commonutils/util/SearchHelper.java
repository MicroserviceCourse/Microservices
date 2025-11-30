package org.example.commonutils.util;

import io.github.perplexhub.rsql.RSQLJPASupport;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.stream.Collectors;
import jakarta.persistence.criteria.JoinType;


public interface SearchHelper {
    static <T> Specification<T> parseSearchToken(String search, List<String> searchFields) {
        return search != null && !search.isBlank() && searchFields != null && !searchFields.isEmpty()
                ? (Specification) searchFields.stream()
                .map(field -> field + "=like='" + search.trim() + "'")   // luôn LIKE dạng string
                .collect(Collectors.collectingAndThen(Collectors.joining(","), RSQLJPASupport::toSpecification))
                : RSQLJPASupport.toSpecification((String) null);
    }
    static <T> Specification<T> parseSearchKeyValue(String searchField, String searchValue){
        return searchField !=null && !searchField.isBlank() && searchValue !=null && !searchValue.isBlank()
                ? RSQLJPASupport.toSpecification(searchField + "=like='" + searchValue.trim() + "'")
                : RSQLJPASupport.toSpecification((String) null);
    }
    static <T> Specification<T>buildSearchSpec(String searchField, String searchValue,List<String>searchFields){
        if(searchField == null || searchField.isBlank()){
            return parseSearchToken(searchValue, searchFields);
        }
        return parseSearchKeyValue(searchField, searchValue);
    }

    static <T> Specification<T> relationFieldInOrNotIn(
            String relation,      // ví dụ: "roles"
            String nestedField,   // ví dụ: "role"
            String targetField,   // ví dụ: "id"
            List<Long> values,    // ví dụ: [1, 2]
            boolean isNotIn       // true = NOT IN, false = IN
    ) {
        return (root, query, cb) -> {
            var join = root.join(relation, jakarta.persistence.criteria.JoinType.LEFT);

            query.distinct(true);

            var expression = join.get(nestedField).get(targetField);

            if (isNotIn) {
                return cb.or(
                        cb.isNull(expression),
                        expression.in(values).not()
                );
            } else {
                return cb.and(
                        cb.isNotNull(expression),
                        expression.in(values)
                );
            }
        };
    }

}
