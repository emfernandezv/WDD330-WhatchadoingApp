export default {
    root: "src",
    publicDir: "../public",
    build: {
      outDir: "../dist",
      emptyOutDir: true
    },
    server: {
      port: 5173,
      proxy: {
        "/serpapi": {
          target: "https://serpapi.com",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/serpapi/, "")
        }
      }
    }
  };
  