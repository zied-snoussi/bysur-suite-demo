import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // This app has no Tailwind/PostCSS of its own — @zied-snoussi/ui ships
  // already-compiled CSS. Pin an empty PostCSS config so Vite doesn't walk up
  // the monorepo looking for one (and choke on another app's config).
  css: {
    postcss: {},
  },
});
