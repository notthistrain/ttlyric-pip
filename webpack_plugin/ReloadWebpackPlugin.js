// @ts-check
const webpack = require("webpack")
const http = require("http")

let serverSign = -1
let needReload = false
/**
 * @type {http.Server}
 */
let server = http.createServer((request, response) => {
  if (request.url === "/sse") {
    serverSign = Date.now()
    let crxSign = serverSign
    console.log(`crx connected--${crxSign}`)
    response.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    })
    let timer = setInterval(() => {
      if (crxSign !== serverSign) {
        console.log(`crx connection close--${crxSign}`)
        // @ts-ignore
        crxSign = null
        clearInterval(timer)
        // @ts-ignore
        timer = null
        response.end()
        return
      }
      if (needReload) {
        needReload = false
        response.write(`data: reload\n\n`)
      }
    }, 1000)
  }
})

server.listen(3347, "127.0.0.1", () => {
  console.log("\nsse server listen...\n")
})

/**
 * @implements {webpack.WebpackPluginInstance}
 */
class ReloadPlugin {
  constructor() {}
  /**
   * @param {webpack.Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.done.tap({ name: "CRX reload" }, (stats) => {
      if (!stats.hasErrors()) needReload = true
    })
    compiler.hooks.shutdown.tap({ name: "SSE close" }, () => {
      console.log("\nsse server close...\n")
      server?.close()
      // @ts-ignore
      server = null
    })
  }
}

module.exports = ReloadPlugin
