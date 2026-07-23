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
        STRAPI_API_URL: "https://cms.234label.com",
        // Set STRAPI_API_TOKEN on the VPS (e.g. via a local .env or `pm2 set`),
        // do not commit the token. Generate it in Strapi admin under
        // Settings -> API Tokens (read-only, full access to orders/products).
        STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN || "",
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
