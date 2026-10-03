# SHOPCX — Haute Design & Editorial E-Commerce Experience

A complete frontend redesign and upgrade transforming ShopX into **ShopCX**: a luxury, editorial, highly interactive e-commerce experience inspired by the visual hierarchy and interaction quality of *ViV MGMT*.

---

## ✦ Key Highlights & Features

1. **Editorial Design Language**:
   - Typography system marrying `'Italiana'` and `'Playfair Display'` serif display headings with crisp `'Inter'` Grotesk UI and `'Space Mono'` metadata.
   - Minimalist monochromatic palette: Pure White (`#ffffff`), Gallery Warm Whites (`#fbfbf9`, `#f3f2ee`), and Deep Obsidian (`#0b0b0b`).
   - Hairline borders, generous whitespace, and tactile visual compositions.

2. **Full-Stack Architecture & Java Preservation**:
   - **Backend**: Java 21 LTS with Spring Boot REST API (`http://localhost:8080`), JPA/Hibernate, and PostgreSQL (`ecommerce_engine`).
   - **Frontend**: High-performance React 19 + Vite web client (`http://localhost:5173`) with full CORS & Vite proxy layer.
   - **Database**: 32,950+ active catalog objects across 74 distinct categories with live stock quantities.

3. **Complete Interactive E-Commerce Suite**:
   - **Dynamic Search Overlay**: Debounced product search with keyboard navigation (`ESC`), live image previews, prices, and suggestions.
   - **Product Catalog & Filters**: Category selectors, sorting (Price, Name, Featured), in-stock filtering, and pagination.
   - **Editorial Product Detail**: Multi-angle image gallery with full-screen view, live stock indicators, quantity selectors, and instant buy.
   - **Animated Bag Drawer & Full Cart Page**: Right-side slide-over bag, free shipping progress bar, promo discounts, and instant removal.
   - **Multi-Step Checkout**: Customer dossier, address verification, payment simulation, and celebratory order confirmation.
   - **Patron Portal & Order Ledger**: Instant 1-click demo accounts (`shashank@shopx.local` / `ShopX@123`), registration, and order item modal inspector.
   - **Interactive Custom Cursor**: Desktop cursor follower with contextual hover states (`VIEW`, `EXPLORE`, `+ ADD`, magnetic buttons).

---

## ✦ How to Run the Application

### Prerequisites
- **Java 21 LTS** & **PostgreSQL 18**
- **Node.js v20+** & **npm**

### Step 1: Start the Spring Boot Backend (Port 8080)
```bash
cd backend
.\mvnw.cmd spring-boot:run
```

### Step 2: Start the ShopCX Web Frontend (Port 5173)
```bash
cd web
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## ✦ Demo Accounts
- **Customer**: `shashank@shopx.local` / `ShopX@123`
- **Administrator**: `admin@shopx.local` / `Admin@123`
