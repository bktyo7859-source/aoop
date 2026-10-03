package com.shopx.service;

import com.shopx.dto.ProductResponse;
import com.shopx.exception.ProductNotFoundException;
import com.shopx.model.Category;
import com.shopx.model.Inventory;
import com.shopx.model.InventoryTransaction;
import com.shopx.model.Product;
import com.shopx.model.TransactionType;
import com.shopx.repository.CategoryRepository;
import com.shopx.repository.InventoryRepository;
import com.shopx.repository.InventoryTransactionRepository;
import com.shopx.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;
    private final CategoryRepository categoryRepository;
    private final InventoryTransactionRepository transactionRepository;

    public ProductService(ProductRepository productRepository,
                          InventoryRepository inventoryRepository,
                          CategoryRepository categoryRepository,
                          InventoryTransactionRepository transactionRepository) {
        this.productRepository = productRepository;
        this.inventoryRepository = inventoryRepository;
        this.categoryRepository = categoryRepository;
        this.transactionRepository = transactionRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    /**
     * Paginated product search with optional text search and category filter.
     * Returns ProductResponse DTOs with flattened category name and inventory quantity.
     */
    public Page<ProductResponse> searchProducts(String search, Long categoryId, Pageable pageable) {
        String searchTerm = (search != null && !search.isBlank()) ? search.trim() : null;
        Long catId = (categoryId != null && categoryId > 0) ? categoryId : null;

        Page<Product> productPage;
        if (searchTerm != null && catId != null) {
            productPage = productRepository.findByCategoryIdAndSearch(catId, searchTerm, pageable);
        } else if (searchTerm != null) {
            productPage = productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                    searchTerm, searchTerm, pageable);
        } else if (catId != null) {
            productPage = productRepository.findByCategoryId(catId, pageable);
        } else {
            productPage = productRepository.findAll(pageable);
        }

        // Batch-load inventory for products on this page
        List<Long> productIds = productPage.getContent().stream()
                .map(Product::getId)
                .collect(Collectors.toList());

        Map<Long, Integer> inventoryMap = inventoryRepository.findByProductIdIn(productIds)
                .stream()
                .filter(inv -> inv.getProduct() != null && inv.getProduct().getId() != null && inv.getQuantity() != null)
                .collect(Collectors.toMap(
                        inv -> inv.getProduct().getId(),
                        Inventory::getQuantity,
                        (a, b) -> a
                ));

        return productPage.map(product -> new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStockQuantity(),
                product.getCategory() != null ? product.getCategory().getId() : null,
                product.getCategory() != null ? product.getCategory().getName() : "Uncategorized",
                inventoryMap.getOrDefault(product.getId(), product.getStockQuantity())
        ));
    }

    @Transactional
    public Product createProduct(Product product) {
        // Ensure category is attached if category_id is set
        if (product.getCategory() != null && product.getCategory().getId() != null) {
            Category category = categoryRepository.findById(product.getCategory().getId())
                    .orElse(product.getCategory());
            product.setCategory(category);
        }

        Product savedProduct = productRepository.save(product);

        // Automatically initialize inventory for the new product
        int initialQuantity = savedProduct.getStockQuantity() != null ? savedProduct.getStockQuantity() : 0;
        Inventory inventory = new Inventory(savedProduct, initialQuantity);
        inventoryRepository.save(inventory);

        // Record initial inventory transaction if quantity > 0
        if (initialQuantity > 0) {
            InventoryTransaction transaction = new InventoryTransaction(
                    savedProduct,
                    initialQuantity,
                    TransactionType.PURCHASE
            );
            transactionRepository.save(transaction);
        }

        return savedProduct;
    }

    public Product updateProduct(Long id, Product updatedProduct) {

        Product existingProduct = productRepository.findById(id)
            .orElseThrow(() -> new ProductNotFoundException(id));
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setStockQuantity(updatedProduct.getStockQuantity());
        existingProduct.setCategory(updatedProduct.getCategory());

        return productRepository.save(existingProduct);
    }

    public void deleteProduct(Long id) {

        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException(id);
        }

        productRepository.deleteById(id);
    }
}