import lioonVitePlugin from "@lioon/react/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    lioonVitePlugin({
      outputDir: "src/i18n",
      supportedLocales: ["en", "ja", "ko", "zh", "es"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
