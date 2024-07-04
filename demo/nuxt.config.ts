// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  components: {
    global: true,
    dirs: ["~/components"],
  },

  compatibilityDate: "2024-07-03",
  modules: ["@nuxt/content", "@nuxt/image", "@nuxt/test-utils/module"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import 'core-styles';
            @import 'core-styles/reset-styles';
            @import '@/styles/_fonts.scss';
            @import '@/styles/_index.scss';
          `,
        },
      },
    },
  },
});
