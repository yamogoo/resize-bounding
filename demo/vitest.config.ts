import { defineVitestConfig } from "@nuxt/test-utils/config";

import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";

export default defineVitestConfig({
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "e2e/**"],
    root: fileURLToPath(new URL("./", import.meta.url)),
    reporters: ["html", "verbose"],
    outputFile: "./src/tests-report/index.html",
    globals: true,
    setupFiles: "./vitest.setup.ts",
  },
});
