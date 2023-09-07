import { PluginOption } from "vite"
import { createServer, Server } from "http"
import { resolve } from "path"

/**
 * @description 代码重新构建后通知拓展后台脚本重新加载
 * @returns vite插件配置项
 */
export const CRXReloadPlugin = (): PluginOption => {
  /**
   * @description http连接数有限，建立新tcp连接后把其他连接关闭
   */
  let serverSign: number
  let needReload = false
  let server: Server | null = createServer((request, response) => {
    if (request.url === "/sse") {
      serverSign = Date.now()
      const crxSign = serverSign
      console.log(`crx connected--${crxSign}`)
      response.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
      })
      const timer = setInterval(() => {
        if (crxSign !== serverSign) {
          console.log(`crx connection close--${crxSign}`)
          clearInterval(timer)
          response.end()
          return
        }
        if (needReload) {
          needReload = false
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
      needReload = true
    },
    closeWatcher() {
      console.log("\nsse server close...\n")
      server?.close()
      server = null
    },
  }
}
