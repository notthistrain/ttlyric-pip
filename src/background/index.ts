let sseClient = new EventSource("http://127.0.0.1:3347/sse")
sseClient.addEventListener("open", () => {
  console.info("sse connect")
})
sseClient.addEventListener("message", (event: MessageEvent<string>) => {
  if (event.data === "reload") {
    chrome.runtime.reload()
  }
})
sseClient.addEventListener("close", () => {
  console.warn("sse server close")
})
sseClient.addEventListener("error", (e) => {
  console.warn("sse server error", e)
  sseClient.close()
})
