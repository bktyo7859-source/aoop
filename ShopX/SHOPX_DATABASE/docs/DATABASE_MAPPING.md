# SHOPX database mapping

This database is designed to match the uploaded Arfat backend JPA entities and table annotations.

## Final tables
Customer -> customers
Category -> categories
Product -> products
Inventory -> inventory
InventoryTransaction -> inventory_transactions
Cart -> carts
CartItem -> cart_items
Order -> orders
OrderItem -> order_items

## Kaggle transformation
Olist string IDs are converted to generated BIGINT IDs because the Java entities use Long.
Customer names/emails are replaced with synthetic ShopX demo values.
Product names/descriptions are generated from category information.
Product price is the median observed Olist item price for that product.
Olist order statuses are mapped to Arfat's OrderStatus enum.
Olist order-item rows represent individual purchased units, so quantity is seeded as 1.
Current inventory is synthetic/deterministic and derived from historical demand; it is NOT claimed to be actual Olist stock.
Inventory transactions include an opening PURCHASE baseline and historical SALE records.

## Important
The current Java Inventory entity is @OneToOne with Product, so the final schema intentionally has one inventory row per product.
Olist sellers, payments, reviews and geolocation are retained as source files but are not loaded into final tables because the current backend has no corresponding JPA entities/tables. They can be added later when Arfat's backend is extended.

Seed customer credentials are demo-only: password `ShopX@123`. Do not use them in production.
