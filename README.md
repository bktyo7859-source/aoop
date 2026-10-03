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
   - **Interactive Payment Suite**:
     - **Bharat UPI Instant**: Dynamic QR code with live 5:00-minute expiry countdown timer, multi-app support (GPay, PhonePe, Paytm, BHIM, Cred), and real-time VPA verification (`@okhdfcbank`, `@okaxis`, `@oksbi`, `@paytm`, `@ybl`).
     - **Net Banking**: Popular Indian banks (HDFC, ICICI, SBI, Axis, Kotak, PNB) + searchable list of 30+ scheduled banks with a 256-bit encrypted simulated bank gateway & OTP authorization modal.
   - **Patron Portal & Order Ledger**: Instant 1-click demo accounts (`shashank@shopx.local` / `ShopX@123`), registration, and order item modal inspector.
   - **Interactive Custom Cursor**: Desktop cursor follower with contextual hover states (`VIEW`, `EXPLORE`, `+ ADD`, magnetic buttons).

4. **Production Parity & Vercel Zero-Config Deployment**:
   - **SPA Routing Rewrites**: `vercel.json` included at both the repository root and `ShopX/web/` ensuring direct URL access (e.g. `/shop`, `/product/1`, `/checkout`) and browser refresh never 404.
   - **Dynamic API Base URL**: `VITE_API_BASE_URL` support for external backend host integration with fallback handling for unconfigured environments.
   - **Resilient Fallback Engine**: Seamless client-side dataset fallback matching database categories, products, persistent cart, and order history so the Vercel deployment is 100% functional out-of-the-box.

---

## ✦ Project Directory Structure

```
spx/
├── README.md                 # Root documentation & architecture guide
├── vercel.json               # Vercel SPA routing & build configuration for root deploys
├── .gitignore                # Global build & artifact exclusions
└── ShopX/
    ├── backend/              # Spring Boot Java 21 REST API (Port 8080)
    │   ├── pom.xml
    │   └── src/main/java/com/shopx/
    │       ├── config/       # WebConfig (CORS mappings)
    │       ├── controller/   # REST Controllers (Auth, Products, Cart, Orders, Checkout...)
    │       ├── dto/          # Data Transfer Objects
    │       ├── model/        # JPA Entities (Product, Order, Customer, Cart...)
    │       ├── repository/   # Spring Data Repositories
    │       └── service/      # Transactional Business Logic
    ├── web/                  # ShopCX React 19 + Vite Web Frontend (Port 5173)
    │   ├── index.html        # Typography links & SEO metadata
    │   ├── vercel.json       # Vercel configuration for web subfolder deploys
    │   ├── vite.config.js    # Reverse proxy to http://localhost:8080
    │   ├── .env.example      # Environment variable reference
    │   └── src/
    │       ├── components/   # Header, Footer, CustomCursor, CartDrawer, SearchModal, ProductCard...
    │       ├── context/      # AuthContext, CartContext, WishlistContext, ToastContext
    │       ├── pages/        # Home, Shop, Collections, ProductDetail, Cart, Checkout, Account, Orders...
    │       ├── services/     # REST API service layer & fallback engine
    │       └── utils/        # Editorial Image curation engine
    ├── frontend/             # Original JavaFX desktop application
    └── SHOPX_DATABASE/       # PostgreSQL schema & CSV migration scripts (32,950+ rows)
```

---

## ✦ Vercel Deployment Instructions

### Method A: Deploy from GitHub (Recommended)
1. Import repository `https://github.com/bktyo7859-source/aoop.git` into **Vercel**.
2. **Root Directory**: Select `ShopX/web` (or leave default if deploying root monorepo).
3. **Framework Preset**: `Vite`
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Environment Variables** *(Optional)*:
   - `VITE_API_BASE_URL`: `https://your-backend-domain.com/api` (if deploying the Java backend to Render/Railway).
7. Click **Deploy**.

---

## ✦ How to Run Locally

### Prerequisites
- **Java 21 LTS** & **PostgreSQL 18**
- **Node.js v20+** & **npm**

### Step 1: Start the Spring Boot Backend (Port 8080)
```bash
cd ShopX/backend
.\mvnw.cmd spring-boot:run
```

### Step 2: Start the ShopCX Web Frontend (Port 5173)
```bash
cd ShopX/web
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## ✦ Demo Accounts
- **Customer**: `shashank@shopx.local` / `ShopX@123`
- **Administrator**: `admin@shopx.local` / `Admin@123`
