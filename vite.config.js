import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/Frontend-Mentor-Shortly-URL-shortening-API-Challenge/",

  plugins: [react()],
});
