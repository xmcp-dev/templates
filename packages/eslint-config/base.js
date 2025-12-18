const { defineConfig } = require("eslint/config");

const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const prettierPlugin = require("eslint-plugin-prettier");
const simpleImportSortPlugin = require("eslint-plugin-simple-import-sort");
const typescriptParser = require("@typescript-eslint/parser");

module.exports = defineConfig([
  {
    files: ["**/*.{js,ts}"],
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSortPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
    },
    rules: {
      semi: "off",
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
      "prettier/prettier": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    ignores: [".xmcp/**", "dist/**", "node_modules/**"],
  },
]);
