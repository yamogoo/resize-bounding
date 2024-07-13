import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { fileURLToPath, URL } from "node:url";

import terserOptions from "./terser.config";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 9091,
  },
  build: {
    minify: "terser",
    terserOptions,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import 'core-styles';
        `,
      },
    },
  },
});
