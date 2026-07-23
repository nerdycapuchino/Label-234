# Label 234 Project Status

Updated: 18 July 2026

## Done

### Storefront Website - `234label.com`
- Main customer storefront pages are built.
- Brand/content pages are built: home, about, philosophy, our story, fabric story, lookbook, journal, contact, store locator.
- Shop pages are built: collections, product detail, categories, search, stitch for you.
- Shopping journey pages are built: cart, checkout, order confirmation, wishlist.
- Customer dashboard pages are built: login, register, dashboard, profile, orders, order detail, saved measurements, addresses, preferences.
- Collections page now fetches products from Strapi CMS when available.
- Product detail page now fetches product data from Strapi by slug.
- Cart add-to-bag flow works from the live product detail page.
- Cart totals now account for fabric length in metres.
- Storefront production build passes.
- Storefront is running on the VPS through PM2.

### Admin Panel - `admin.234label.com`
- Admin dashboard is built.
- Product management page is built.
- Fabric library/allocation page is built.
- Order management page is built.
- Customer management page is built.
- Settings pages are built.
- Admin panel production build passes.
- Admin panel is deployed and reachable at `http://admin.234label.com/`.

### CMS / Strapi - `cms.234label.com`
- Strapi backend is initialized.
- Product content type is built.
- Order content type is built.
- Appointment content type is built.
- Strapi production build passes.
- Strapi is deployed and reachable at `http://cms.234label.com/admin`.
- CMS is running on the VPS through PM2.

### Deployment
- PM2 ecosystem config added for all three apps:
  - `234label-web` on port `3000`
  - `234label-admin` on port `3001`
  - `234label-cms` on port `1337`
- Nginx config added for:
  - `admin.234label.com`
  - `cms.234label.com`
- Deployment script updated to build and run storefront, admin panel, and CMS.
- Root build issues fixed by updating Tailwind 4 dependencies and excluding nested apps from the root TypeScript check.
- Server local changes were backed up in a Git stash before deployment.

## Pending

### CMS Content Setup
- Create the first Strapi admin user at `http://cms.234label.com/admin`.
- Add real product data in Strapi.
- Upload product images.
- Publish products.
- Enable public API permissions for product reads if the storefront should fetch products without authentication.
- Add journal/article content or create the missing Strapi article/journal content type if needed.

### Storefront Integration
- Confirm live storefront reads products from `https://cms.234label.com` after products are published.
- Replace remaining static/demo content where needed.
- Wire checkout order creation to the Strapi orders API.
- Add proper loading, empty, and error states for CMS-backed pages.

### Payment
- Add Razorpay keys to production environment.
- Implement Razorpay order creation on the backend.
- Implement Razorpay checkout on the frontend.
- Verify payment success/failure callbacks.
- Store paid order status in Strapi.

### Admin Panel Integration
- Admin product, fabrics, orders, and customers pages now fetch from Strapi (`admin-panel/src/lib/{products,orders,customers}.ts`). Customers are derived by aggregating orders by email — there's no dedicated customer content type.
- Fabrics page maps 1 product = 1 roll for now; roll-level tracking (roll number, reserved-for-customer) needs a new Strapi content type — not yet modeled.
- Requires a Strapi API token (Settings -> API Tokens, read access to orders/products) set as `STRAPI_API_TOKEN` on the VPS — orders/customers hold PII so they're fetched server-side with a token, not via public permissions.
- Add authentication/authorization for admin panel access.

### Production Hardening
- Add HTTPS certificates for `admin.234label.com` and `cms.234label.com`.
- Redirect HTTP to HTTPS for all domains.
- Configure production Strapi secrets in `.env`:
  - `APP_KEYS`
  - `API_TOKEN_SALT`
  - `ADMIN_JWT_SECRET`
  - `TRANSFER_TOKEN_SALT`
  - `JWT_SECRET`
- Decide whether to keep SQLite or move CMS database to Postgres/MySQL.
- Configure backups for CMS database and uploaded media.
- Review npm audit findings before final launch.

### Final QA
- Test complete product browsing flow using real CMS products.
- Test add to cart and checkout with real products.
- Test mobile layouts for storefront and admin.
- Test order confirmation and dashboard order tracking.
- Test CMS media uploads on the VPS.
- Test PM2 restart/reboot recovery.
