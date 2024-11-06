import { fixupPluginRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-imports": [
        "error",
        {
          type: "natural",
          order: "asc",
          groups: ["builtin", "react", "external", "parent", "sibling"],
          "custom-groups": {
            value: {
              react: ["react", "react-dom/*"],
            },
          },
        },
      ],
    },
  },
  {
    plugins: {
      react: fixupPluginRules(eslintPluginReact),
      "react-hooks": fixupPluginRules(eslintPluginReactHooks),
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
  {
    rules: {
      "@typescript-eslint/no-namespace": "off",
      "no-undef": "error",
      "no-undefined": "error",
      "no-void": "error",
    },
  },
];
