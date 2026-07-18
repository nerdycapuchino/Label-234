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
