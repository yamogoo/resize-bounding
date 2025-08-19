import path from "node:path";

import packageJson from "./package.json";
import terserOptions from "./terser.config.js";

import { ColorsGenerator } from "./colorsGenerator";
import { TokensParser } from "./tokensParser";

new ColorsGenerator({
  source: "./tokens/baseColors.json",
  outDir: "./tokens/colors.json",
  variations: 40,
});

new TokensParser({
  source: "./tokens",
  outDir: "./assets/scss/abstracts",
});

export default defineNuxtConfig({
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ["gsap/types", "vitest/globals"],
      },
      include: ["./tokensParser.ts"],
    },
  },
  modules: [
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxt/test-utils/module",
    "nuxt-icons",
    "nuxt-simple-robots",
    "@nuxt/eslint",
    "@nuxt/eslint-config",
  ],
  components: {
    global: true,
    dirs: ["~/components"],
  },
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [
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
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-1Y60DZ2V3T",
          async: true,
        },
        {
          innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-1Y60DZ2V3T');
      `,
          type: "text/javascript",
        },
      ],
    },
  },
  imports: {
    autoImport: false,
  },
  runtimeConfig: {
    public: {
      authorName: packageJson.author.fullName,
      appName: packageJson.name,
      appTitle: packageJson.title,
      appDescription: packageJson.description,
      productVueVersion: packageJson.productVueVersion,
      productReactVersion: packageJson.productReactVersion,
    },
  },
  compatibilityDate: "2024-07-03",
  nitro: {
    output: {
      publicDir: path.join(__dirname, "dist"),
    },
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
            @use "@/assets/scss/app.colors" as colors;
            @use "@/assets/scss/app.abstracts" as *;
            @use "@/assets/scss/app.core" as *;
            @use "@/assets/scss/app.mixins" as *;
            @use "@/assets/scss/app.extends" as *;
          `,
        },
      },
    },
  },
  eslint: {},
  robots: {
    disallow: [],
  },
});
