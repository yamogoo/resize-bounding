import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import { configDefaults, defineConfig } from "vitest/config";

const root = fileURLToPath(new URL("./", import.meta.url));

const nuxtComponentsMock = fileURLToPath(
  new URL("./test/mocks/nuxt-components.ts", import.meta.url),
);

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": root,
      "~": root,
      "#components": nuxtComponentsMock,
    },
  },
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "e2e/**"],
    root,
    reporters: ["verbose"],
    globals: true,
    setupFiles: "./vitest.setup.ts",
  },
});
