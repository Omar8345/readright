import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import { imagetools } from "vite-imagetools";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    viteCompression(),
    imagetools(),
    visualizer({ open: true }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My Vite App",
        short_name: "ViteApp",
        description: "A highly optimized Vite + React project",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
}));
