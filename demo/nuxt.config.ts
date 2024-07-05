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
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/test-utils/module",
    "nuxt-icons",
  ],

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
            // @import 'core-styles/reset-styles';
            @import '@/styles/_fonts.scss';
            @import '@/styles/_index.scss';
          `,
        },
      },
    },
  },
});
