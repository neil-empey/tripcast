const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    createProxyMiddleware("/destinations", {
      target: "https://localhost:3001/destinations", // API endpoint 1
      changeOrigin: true,
      pathRewrite: {
        "^/destinations": ""
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
};
