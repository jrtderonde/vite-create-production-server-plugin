import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { createProductionServerPlugin } from "./vite.server.plugin";

const PORT = 8080;

export default defineConfig({
  server: {
    port: PORT,
  },
  plugins: [
    react(),
    createProductionServerPlugin({
      port: 8080,
    }),
  ],
});
