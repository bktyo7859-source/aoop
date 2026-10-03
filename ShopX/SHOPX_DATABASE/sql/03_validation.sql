SELECT 'customers' table_name, COUNT(*) rows FROM customers
UNION ALL SELECT 'categories', COUNT(*) FROM categories
UNION ALL SELECT 'products', COUNT(*) FROM products
UNION ALL SELECT 'inventory', COUNT(*) FROM inventory
UNION ALL SELECT 'inventory_transactions', COUNT(*) FROM inventory_transactions
UNION ALL SELECT 'carts', COUNT(*) FROM carts
UNION ALL SELECT 'cart_items', COUNT(*) FROM cart_items
UNION ALL SELECT 'orders', COUNT(*) FROM orders
UNION ALL SELECT 'order_items', COUNT(*) FROM order_items
ORDER BY table_name;

SELECT COUNT(*) orphan_orders FROM orders o LEFT JOIN customers c ON c.id=o.customer_id WHERE c.id IS NULL;
SELECT COUNT(*) orphan_order_items FROM order_items oi LEFT JOIN orders o ON o.id=oi.order_id WHERE o.id IS NULL;
SELECT COUNT(*) orphan_inventory FROM inventory i LEFT JOIN products p ON p.id=i.product_id WHERE p.id IS NULL;

SELECT status, COUNT(*) AS order_count FROM orders GROUP BY status ORDER BY order_count DESC;
SELECT ROUND(SUM(total_amount)::numeric,2) AS total_order_value FROM orders;
