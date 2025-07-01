package org.example.search_service.repository;

import org.example.search_service.entity.ProductDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface ProductElasticRepository extends ElasticsearchRepository<ProductDocument,Integer> {
    List<ProductDocument> findByTenSanPhamContainingIgnoreCase(String keyword);
}
