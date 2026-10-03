package com.shopx.repository;

import com.shopx.model.Inventory;
import com.shopx.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    Optional<Inventory> findByProduct(Product product);

    List<Inventory> findByProductIdIn(List<Long> productIds);
}