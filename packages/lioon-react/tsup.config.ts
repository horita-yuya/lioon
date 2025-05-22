// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/vite/index.ts", "src/next/index.ts"],
  format: ["esm"],
  dts: true,
  banner: { js: '"use client";' }, // ← これだけで OK
});
