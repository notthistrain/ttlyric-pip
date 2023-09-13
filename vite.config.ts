import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import unocss from "unocss/vite"
import { resolve } from "path"
import { CRXReloadPlugin as reload } from "./vite_plugin/CRXReloadPlugin"

export default defineConfig({
  plugins: [unocss(), react(), reload()],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": resolve("src"),
    },
  },
  publicDir: "public",
  build: {
    watch: {
      exclude: ["node_modules/**", "/__uno.css"],
    },
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "./popup.html"),
        background: resolve(__dirname, "./src/main/background"),
        checkhost: resolve(__dirname, "./src/main/insert/checkhost"),
      },
      output: {
        dir: "pkg",
        assetFileNames: "css/[name][extname]",
        entryFileNames: "js/[name].js",
      },
    },
  },
})
