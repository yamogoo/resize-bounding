// https://nuxt.com/docs/api/configuration/nuxt-config

import packageJson from "./package.json";
import terserOptions from "./terser.config.js";

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
    },
  },

  devtools: { enabled: true },

  appConfig: {
    classPrefix: "ui-",
  },

  runtimeConfig: {
    public: {
      appName: packageJson.name,
      appDescription: packageJson.description,
      productVersion: packageJson.dependencies["vue3-boundarize"],
    },
  },

  components: {
    global: true,
    dirs: ["~/components"],
  },

  compatibilityDate: "2024-07-03",
  modules: [
    "@nuxtjs/color-mode",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/test-utils/module",
    "nuxt-icons",
  ],

  colorMode: {
    preference: "system",
    fallback: "dark",
    classPrefix: "theme-",
    classSuffix: "",
    storageKey: "theme",
  },

  vite: {
    build: {
      cssCodeSplit: true,
      cssMinify: "lightningcss",
      minify: "terser",
      terserOptions,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import 'core-styles';
            @import '@/styles/fonts.scss';
            @import '@/styles/index.scss';
          `,
        },
      },
    },
  },
});
