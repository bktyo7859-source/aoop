-- Change D:/SHOPX DATASET/SHOPX_DATABASE if you place this folder elsewhere.
\copy categories(id,name) FROM 'D:/College Work/ShopX/ShopX/SHOPX_DATABASE/data/categories.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');
\copy customers(id,name,email,password,role) FROM 'D:/College Work/ShopX/ShopX/SHOPX_DATABASE/data/customers.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');
\copy products(id,name,description,price,stock_quantity,category_id) FROM 'D:/College Work/ShopX/ShopX/SHOPX_DATABASE/data/products.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');
\copy inventory(id,product_id,quantity) FROM 'D:/College Work/ShopX/ShopX/SHOPX_DATABASE/data/inventory.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');
\copy inventory_transactions(id,product_id,quantity,type,created_at) FROM 'D:/College Work/ShopX/ShopX/SHOPX_DATABASE/data/inventory_transactions.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');
\copy carts(id,customer_id) FROM 'D:/College Work/ShopX/ShopX/SHOPX_DATABASE/data/carts.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');
\copy cart_items(id,cart_id,product_id,quantity) FROM 'D:/College Work/ShopX/ShopX/SHOPX_DATABASE/data/cart_items.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');
\copy orders(id,customer_id,status,total_amount) FROM 'D:/College Work/ShopX/ShopX/SHOPX_DATABASE/data/orders.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');
\copy order_items(id,order_id,product_id,quantity,price) FROM 'D:/College Work/ShopX/ShopX/SHOPX_DATABASE/data/order_items.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

SELECT setval(pg_get_serial_sequence('categories','id'), COALESCE((SELECT MAX(id) FROM categories),1), true);
SELECT setval(pg_get_serial_sequence('customers','id'), COALESCE((SELECT MAX(id) FROM customers),1), true);
SELECT setval(pg_get_serial_sequence('products','id'), COALESCE((SELECT MAX(id) FROM products),1), true);
SELECT setval(pg_get_serial_sequence('inventory','id'), COALESCE((SELECT MAX(id) FROM inventory),1), true);
SELECT setval(pg_get_serial_sequence('inventory_transactions','id'), COALESCE((SELECT MAX(id) FROM inventory_transactions),1), true);
SELECT setval(pg_get_serial_sequence('carts','id'), COALESCE((SELECT MAX(id) FROM carts),1), true);
SELECT setval(pg_get_serial_sequence('cart_items','id'), COALESCE((SELECT MAX(id) FROM cart_items),1), true);
SELECT setval(pg_get_serial_sequence('orders','id'), COALESCE((SELECT MAX(id) FROM orders),1), true);
SELECT setval(pg_get_serial_sequence('order_items','id'), COALESCE((SELECT MAX(id) FROM order_items),1), true);
