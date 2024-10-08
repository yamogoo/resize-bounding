import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

import terserOptions from "./terser.config.js";

import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [vue(), dts()],
  server: {
    port: 9090,
  },
  build: {
    outDir: "dist",
    cssCodeSplit: true,
    cssMinify: "lightningcss",
    minify: "terser",
    terserOptions,
    lib: {
      entry: resolve(__dirname, "./lib/index.ts"),
      name: "Vue3ResizeBounding",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `vue3-resize-bounding.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
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
