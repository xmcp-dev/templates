const { defineConfig } = require("eslint/config");

const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const prettierPlugin = require("eslint-plugin-prettier");
const simpleImportSortPlugin = require("eslint-plugin-simple-import-sort");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const typescriptParser = require("@typescript-eslint/parser");

module.exports = defineConfig([
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSortPlugin,
      "react-hooks": reactHooksPlugin,
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
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    ignores: [".xmcp/**", "dist/**", "node_modules/**"],
  },
]);
