import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import unocss from "unocss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [unocss(), react()],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
      },
    },
    outDir: "dist",
  },
  esbuild: {},
});
