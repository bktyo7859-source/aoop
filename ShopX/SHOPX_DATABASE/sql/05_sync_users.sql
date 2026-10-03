-- =============================================================================
-- ShopX Customer & Admin Accounts Synchronization
-- =============================================================================

BEGIN;

-- 1. Update customer #1 to match user's custom credentials
UPDATE customers
SET
    name = 'Shashank',
    email = 'shashank@shopx.local',
    password = 'ShopX@123',
    role = 'CUSTOMER'
WHERE id = 1;

-- 2. Ensure an Admin account exists (ID 99443 or next available)
INSERT INTO customers (id, name, email, password, role)
VALUES (99443, 'ShopX Administrator', 'admin@shopx.local', 'Admin@123', 'ADMIN')
ON CONFLICT (email) DO UPDATE
SET
    name = 'ShopX Administrator',
    password = 'Admin@123',
    role = 'ADMIN';

-- Ensure a cart exists for the admin account as well
INSERT INTO carts (id, customer_id)
VALUES (99443, (SELECT id FROM customers WHERE email = 'admin@shopx.local'))
ON CONFLICT (customer_id) DO NOTHING;

-- Reset sequence to maximum customer id
SELECT setval(pg_get_serial_sequence('customers', 'id'), (SELECT MAX(id) FROM customers), true);
SELECT setval(pg_get_serial_sequence('carts', 'id'), (SELECT MAX(id) FROM carts), true);

COMMIT;

-- Verification query
SELECT id, name, email, password, role FROM customers WHERE id = 1 OR role = 'ADMIN';
