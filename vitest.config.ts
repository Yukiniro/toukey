import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    testTimeout: 500,
    include: ["__test__/**/*.test.ts"],
    coverage: {
      provider: "v8",
      exclude: ["**/site/**", "**/playground/**", "src/types.ts"]
    }
  }
});
