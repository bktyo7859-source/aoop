package com.shopx.service;

import com.shopx.model.InventoryTransaction;
import com.shopx.repository.InventoryTransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryTransactionService {

    private final InventoryTransactionRepository transactionRepository;

    public InventoryTransactionService(
            InventoryTransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<InventoryTransaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Optional<InventoryTransaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    public InventoryTransaction createTransaction(
            InventoryTransaction transaction) {

        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(Long id) {

        if (!transactionRepository.existsById(id)) {
            throw new RuntimeException(
                    "Inventory transaction not found with id: " + id);
        }

        transactionRepository.deleteById(id);
    }
}