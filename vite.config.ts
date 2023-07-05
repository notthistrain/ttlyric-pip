import { PluginOption, defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import unocss from "unocss/vite"
import { resolve } from "path"
import { createServer } from "http"

/**
 * @description 代码重新构建后通知拓展后台脚本重新加载
 * @returns vite插件配置项
 */
const reload = (): PluginOption => {
  /**
   * @description http连接数有限，建立新tcp连接后把其他连接断开
   */
  let connLock
  let msgLock = false
  let server = createServer((request, response) => {
    if (request.url === "/sse") {
      connLock = Date.now()
      const resSignal = connLock
      console.log(`client request  ${resSignal}`)
      response.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
      })

      const timer = setInterval(() => {
        if (resSignal !== connLock) {
          console.log(`client close  ${resSignal}`)
          clearInterval(timer)
          response.end()
          return
        }
        if (!msgLock) {
          msgLock = true
          response.write(`data: reload\n\n`)
        }
      }, 1000)

      return
    }
  })
  server.listen(3347, "127.0.0.1", () => {
    console.log("\nsse server listen...\n")
  })
  return {
    name: "crx-reload-plugin",
    buildStart(options) {
      this.addWatchFile(resolve(__dirname, "./public"))
    },
    closeBundle() {
      msgLock = false
    },
    closeWatcher() {
      console.log("\nsse server close...\n")
      server.close()
      server = null
    },
  }
}

export default defineConfig({
  plugins: [unocss(), react(), reload()],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  publicDir: "public",
  build: {
    watch: {
      exclude: ["node_modules/**", "/__uno.css"],
    },
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "./popup.html"),
        background: resolve(__dirname, "./src/background"),
      },
      output: {
        dir: "pkg",
        assetFileNames: "css/[name][extname]",
        entryFileNames: "js/[name].js",
      },
    },
  },
})
