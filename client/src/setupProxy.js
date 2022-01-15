const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
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
  app.use(
    createProxyMiddleware(
      'https://www.mapquestapi.com/staticmap/v5/map?start=${this.state.origin}|flag-start&end=${this.state.dest}|flag-end&size=@2x&key=#{ENV.fetch("consumer_key")}',
      {
        target:
          'https://www.mapquestapi.com/staticmap/v5/map?start=${this.state.origin}|flag-start&end=${this.state.dest}|flag-end&size=@2x&key=#{ENV.fetch("consumer_key")}',
        changeOrigin: true // API endpoint 2
      }
    )
  );
};
