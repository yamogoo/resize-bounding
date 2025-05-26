import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  {
    ignores: [
      "*.d.ts",
      "**/tests-report/*",
      "**/.vscode/*",
      "**/.netlify/*",
      "**/node_modules/*",
      "**/.nuxt/*",
      "**/.output/*",
      "**/dist/*",
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  { files: ["**/*.{js,ts,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      "no-async-promise-executor": "off",
      "vue/multi-word-component-names": "off",
      "eslintvue/max-attributes-per-line": "off",
      "vue/require-default-prop": "off",
      "vue/html-self-closing": "off",
      "vue/max-attributes-per-line": "off",
    },
  },
);
