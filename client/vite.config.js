import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
	target: "http://localhost:8080/",
        changeOrigin: true,
        secure: false,
	ws: true,
        configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          },
      },
    },
  },
  build: {
          rollupOptions: {
              output:{
                  manualChunks(id) {
                      if (id.includes('node_modules')) {
                          return id.toString().split('node_modules/')[1].split('/')[0].toString();
                      }
                  }
              }
          }
      }
});
