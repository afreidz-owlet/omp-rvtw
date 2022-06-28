/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test.setup.ts",
    coverage: {
      all: true,
      src: ["./src"],
      reporter: ["text", "html"],
      exclude: [
        "**/*.d.ts",
        "src/pages",
        "**/*.test.*",
        "src/main.tsx",
        "src/test.setup.ts",
        "src/components/icons",
      ],
    },
  },
});
