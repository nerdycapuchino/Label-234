module.exports = {
  apps: [
    {
      name: "234label-web",
      cwd: "/var/www/234label",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        // Storefront reads products/orders from the custom backend API.
        NEXT_PUBLIC_BACKEND_API_URL: "https://api.234label.com",
        // Strapi retained for blogs/journal only.
        NEXT_PUBLIC_STRAPI_API_URL: "https://cms.234label.com",
      },
    },
    {
      name: "234label-admin",
      cwd: "/var/www/234label/admin-panel",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001",
      env: {
        NODE_ENV: "production",
        PORT: "3001",
        // Admin panel talks to the custom backend API (JWT auth).
        NEXT_PUBLIC_API_URL: "https://api.234label.com",
      },
    },
    {
      name: "234label-api",
      cwd: "/var/www/234label/backend-api",
      script: "dist/index.js",
      env: {
        NODE_ENV: "production",
        PORT: "3002",
        // DATABASE_URL, JWT_SECRET, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET,
        // and CORS_ORIGINS are set on the VPS via backend-api/.env
        // (never committed). See DEPLOYMENT.md.
      },
    },
    {
      name: "234label-cms",
      cwd: "/var/www/234label/backend",
      script: "node_modules/@strapi/strapi/bin/strapi.js",
      args: "start",
      env: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: "1337",
        PUBLIC_URL: "https://cms.234label.com",
      },
    },
  ],
};
