package com.shopx.service;

import com.shopx.model.Inventory;
import com.shopx.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public Optional<Inventory> getInventoryById(Long id) {
        return inventoryRepository.findById(id);
    }

    public Inventory createInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public Inventory updateInventory(Long id, Inventory updatedInventory) {

        Inventory existingInventory = inventoryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Inventory not found with id: " + id));

        existingInventory.setProduct(updatedInventory.getProduct());
        existingInventory.setQuantity(updatedInventory.getQuantity());

        return inventoryRepository.save(existingInventory);
    }

    public void deleteInventory(Long id) {

        if (!inventoryRepository.existsById(id)) {
            throw new RuntimeException(
                    "Inventory not found with id: " + id);
        }

        inventoryRepository.deleteById(id);
    }

    public Inventory reduceStock(Long inventoryId, Integer quantity) {

    Inventory inventory = inventoryRepository.findById(inventoryId)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Inventory not found with id: " + inventoryId));

    if (inventory.getQuantity() < quantity) {
        throw new RuntimeException("Insufficient stock");
    }

    inventory.setQuantity(
            inventory.getQuantity() - quantity
    );

    return inventoryRepository.save(inventory);
}
public Inventory reduceStockByProduct(
        com.shopx.model.Product product,
        Integer quantity) {

    Inventory inventory = inventoryRepository.findByProduct(product)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Inventory not found for product"));

    if (inventory.getQuantity() < quantity) {
        throw new RuntimeException("Insufficient stock");
    }

    inventory.setQuantity(
            inventory.getQuantity() - quantity
    );

    return inventoryRepository.save(inventory);
}
}