# ShopX – JavaFX Desktop Application

A modern, clean, responsive JavaFX desktop frontend for the **ShopX E-Commerce Order & Inventory Management** system. It connects to the Spring Boot REST API (`http://localhost:8080`) backed by PostgreSQL.

---

## Architecture Overview

```
JavaFX UI (FXML Views + CSS Styling)
            ↕
JavaFX Controllers (Login, Catalog, Cart, Checkout, Confirmation)
            ↕
Async Execution Utility (UiUtils.runAsync - daemon thread pool)
            ↕
API Client Layer (ApiClient, AuthApi, ProductApi, CategoryApi, CartApi, InventoryApi, CheckoutApi, OrderApi)
            ↕ HTTP / JSON
Spring Boot REST Backend (http://localhost:8080)
            ↕
PostgreSQL Database
```

* **No direct database connection**: The desktop application operates strictly over HTTP using standard REST API endpoints.
* **Separation of Concerns**: Controllers delegate all networking to the `api` client layer, maintaining decoupled DTO models (`ProductDto`, `CustomerDto`, `CartItemDto`, etc.).
* **Non-blocking UI**: All HTTP operations are performed off the JavaFX Application Thread via `UiUtils.runAsync`, keeping the user interface completely responsive.
* **Authoritative Stock Management**: The Catalog screen correlates products with the backend's live `Inventory` entity rather than static product stock quantities.

---

## 5 Main Screens

1. **Screen 1 — Login (`LoginView.fxml`)**:
   * Brand header & clean card layout.
   * Email and password inputs (pre-filled with demo account `customer00001@shopx.local` / `ShopX@123`).
   * Authenticates against `POST /api/auth/login`, resolves customer's cart, sets `UserSession`, and transitions to Catalog.
   * Inline loading spinner and user-friendly error banners.

2. **Screen 2 — Product Catalog (`CatalogView.fxml`)**:
   * Top navigation bar showing customer name, cart badge counter (`🛒 Cart (X)`), refresh, and logout.
   * Search filter for instant client-side filtering by name and description.
   * Category dropdown filter loaded dynamically from `GET /api/categories`.
   * Scrollable product card grid displaying:
     * Product name, category tag, and description.
     * Price formatted in Indian Rupees (₹).
     * Authoritative inventory stock badge (`● In Stock (X available)` or `✕ Out of Stock`).
     * "Add to Cart" button (disabled if out of stock).
   * Adding to cart sends `POST /api/carts/items` with payload `{ "cart": { "id": X }, "product": { "id": Y }, "quantity": 1 }` and dynamically updates the cart count.

3. **Screen 3 — Cart (`CartView.fxml`)**:
   * Displays all items retrieved via `GET /api/carts/{cartId}/items`.
   * Shows Product Name, Unit Price, Quantity, Subtotal, and a "Remove" button per item (`DELETE /api/carts/items/{itemId}`).
   * Order summary panel calculating grand total and item count.
   * "Clear Cart" button (`DELETE /api/carts/{cartId}/items`).
   * "Continue Shopping" button returning to Catalog.
   * "Proceed to Checkout" button leading to Screen 4 (disabled if cart is empty).

4. **Screen 4 — Checkout (`CheckoutView.fxml`)**:
   * Customer details card (Name, Email, Role).
   * Order items review table with unit prices and subtotals.
   * Grand total summary card.
   * "Place Order Now" button:
     * Disables immediately on click to prevent duplicate submissions.
     * Calls `POST /api/checkout/{cartId}`.
     * Handles backend errors (such as insufficient stock or empty cart) gracefully.
     * Navigates to Screen 5 upon receiving the confirmed `Order` response.

5. **Screen 5 — Order Confirmation (`OrderConfirmationView.fxml`)**:
   * Success header with confirmation checkmark.
   * Real Order metadata returned by backend: Order ID (`#...`), Customer Name, Status (`CONFIRMED`), Total Amount.
   * Breakdown table of purchased items via `GET /api/orders/{orderId}/items`.
   * "Continue Shopping" button returning to Catalog with fresh inventory.

---

## How to Run

### Prerequisites
* Java 21 LTS installed and on `PATH`.
* Spring Boot backend running on `http://localhost:8080`.

### Step 1: Start the Backend (if not already running)
From the root directory or `backend/`:
```bash
cd backend
./mvnw.cmd spring-boot:run
```

### Step 2: Start the JavaFX Frontend
From `frontend/`:
```bash
cd frontend
./mvnw.cmd javafx:run
```
Or from the project root:
```bash
./frontend/mvnw.cmd -f frontend/pom.xml javafx:run
```
