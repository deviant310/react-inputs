import { resolve } from "path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  build: {
    target: "es2020",
    emptyOutDir: false,
    lib: {
      entry: {
        "select-input/index": resolve("src/select-input"),
        "masked-input/index": resolve("src/masked-input"),
        "number-input/index": resolve("src/number-input"),
      },
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom"],
    },
    sourcemap: command === "serve",
  },
  plugins: [
    react(),
    checker({
      typescript: {
        tsconfigPath:
          command === "build" ? "./tsconfig.build.json" : "./tsconfig.json",
      },
      eslint: {
        lintCommand: `eslint ./src`,
        useFlatConfig: true,
      },
    }),
    command === "build" && dts({ tsconfigPath: "./tsconfig.build.json" }),
  ],
}));
