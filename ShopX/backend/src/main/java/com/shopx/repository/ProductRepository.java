package com.shopx.repository;

import com.shopx.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);

    Page<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String name, String description, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category.id = :categoryId "
         + "AND (LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) "
         + "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Product> findByCategoryIdAndSearch(
            @Param("categoryId") Long categoryId,
            @Param("search") String search,
            Pageable pageable);
}