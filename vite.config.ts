import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://lims.ntc-tech.ru",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
