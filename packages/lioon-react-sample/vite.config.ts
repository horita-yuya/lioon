import react from "@vitejs/plugin-react";
import lioonVitePlugin from "lioon-react/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), lioonVitePlugin()],
});
