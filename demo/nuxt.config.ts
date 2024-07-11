// https://nuxt.com/docs/api/configuration/nuxt-config

import path from "node:path";

import packageJson from "./package.json";
import terserOptions from "./terser.config.js";

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          // crossorigin,
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicon/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "/favicon/site.webmanifest",
        },
      ],
    },
  },

  robots: {
    disallow: [],
  },

  devtools: { enabled: true },

  nitro: {
    output: {
      publicDir: path.join(__dirname, "dist"),
    },
  },

  runtimeConfig: {
    public: {
      appName: packageJson.name,
      appTitle: packageJson.title,
      appDescription: packageJson.description,
      productVersion: packageJson.productVersion,
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
    "nuxt-simple-robots",
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
