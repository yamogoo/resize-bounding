import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/**"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      reporters: ["verbose"],
      outputFile: "./src/tests-report/index.html",
      globals: true,
      setupFiles: ["./src/__tests__/setup.ts"],
    },
  }),
);
