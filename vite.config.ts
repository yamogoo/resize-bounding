import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

import terserConfig from "./terser.config";

import vue from "@vitejs/plugin-vue";

import { resolve } from "path";

export default defineConfig({
  plugins: [
    vue(),
    // dts({
    //   outDir: ["dist"],
    // }),
  ],
  server: {
    port: 9043,
  },
  build: {
    cssCodeSplit: true,
    cssMinify: "lightningcss",
    minify: "terser",
    terserOptions: terserConfig,

    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "Vue3BbResize",
      fileName: `vue3-bb-resize`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import './src/styles/_mixins.scss';
        `,
      },
    },
  },
});
function dts(arg0: { outDir: string[] }): import("vite").PluginOption {
  throw new Error("Function not implemented.");
}
