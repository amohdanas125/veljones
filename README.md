# VALJONS — Luxury Streetwear E-Commerce Platform

> **Engineered for Longevity.**  
> High-end PC Fleece luxury streetwear platform featuring **DROP 001** (280 GSM Straight Fit). Built with Next.js 16 (App Router), NestJS 11, NeonDB, Drizzle ORM, and Backblaze B2.

---

## 🚀 Live Services

| Service | Port / URL | Description |
| :--- | :--- | :--- |
| **Frontend Web App** | [**`http://localhost:3000`**](http://localhost:3000) | Next.js 16 App Router with Video Hero, Poppins/Montserrat typography, 9-section layout |
| **Backend API** | [**`http://localhost:4000/api`**](http://localhost:4000/api) | NestJS REST API with Drizzle ORM & fallback store |
| **Swagger API Docs** | [**`http://localhost:4000/api/docs`**](http://localhost:4000/api/docs) | OpenAPI Interactive Documentation |

---

## 🎨 Visual Identity & Client Specifications

- **Brand**: **VALJONS** with the geometric "VJ" monogram logo.
- **Hero Banner**: Looping high-definition video background with audio controls (`VALJONS DROP 001`).
- **Typography**: Google Fonts **Poppins** for headings + **Montserrat** for body and supporting text.
- **Pricing**: Default in Indian Rupees (`Rs. 2,499.00`).
- **Simplified Navigation**: 5 core items:
  1. `Home` (`/`)
  2. `Shop` (`#shop-collection`)
  3. `Our Story` (Interactive Brand Manifesto Modal)
  4. `Contact` (Customer Support & Concierge Modal)
  5. `Cart` (Slide-out Cart Drawer with Free Delivery Indicator)

---

## 📐 Exact 9-Section Homepage Architecture

1. **Hero Banner — VALJONS DROP 001**: Cinematic looping video background, sound toggle, minimal typography, and direct CTA.
2. **Shop the Collection — Three Colour Options**: Straight-Fit PC Fleece Sweatpants in 3 colorways with live swatch switcher, size selection (S–XXL), and pricing in INR (`Rs. 2,499`).
3. **Product Features — PC Fleece, 280 GSM, Straight Fit**: Minimal technical grid with detailed construction specs.
4. **Detailed Product Photography**: Zoomable macro photography gallery (knit loopback, encased waistband, concealed pockets, sneaker pooling).
5. **Lifestyle Campaign**: Editorial street lookbook inspired by Cole Buxton and Outdoor Voices.
6. **Why VALJONS**: Anti-fast-fashion manifesto, pattern drafting, and small-batch drop commitment.
7. **Customer Reviews**: Verified buyer ratings (4.9/5), fit assessments, and testimonials.
8. **Instagram Feed**: Curated social grid with `@valjons` community styling.
9. **Footer**: Value proposition strip, newsletter drop alerts, concierge links, and legal terms.

---

## ⚡ Quickstart

```bash
# Backend (Port 4000)
cd backend
npm install
npm run build
node dist/src/main.js

# Frontend (Port 3000)
cd frontend
npm install
npm run build
npm run start -- -p 3000
```
