import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import unocss from "unocss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [unocss(), react()],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  publicDir: "public",
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "./popup.html"),
        background: resolve(__dirname, "./src/background"),
      },
      output: {
        dir: "pkg",
        entryFileNames: "[name].js",
      },
    },
  },
  esbuild: {},
});
