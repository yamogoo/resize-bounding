import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

import terserOptions from "./terser.config";

import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react(), dts({})],
  server: {
    port: 9089,
  },
  build: {
    outDir: "dist",
    cssCodeSplit: true,
    cssMinify: "lightningcss",
    minify: "terser",
    terserOptions,
    lib: {
      entry: resolve(__dirname, "./lib/index.tsx"),
      name: "ReactResizeBounding",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `react-resize-bounding.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        exports: "named",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./lib", import.meta.url)),
    },
  },
});
