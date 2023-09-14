export class SSEClient {
  constructor() {
    this.eventsource = null
  }
  url = "http://127.0.0.1:3347/sse"
  eventsource: EventSource | null
  connect() {
    this.eventsource = null
    const sseClient = new EventSource(this.url)
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
    this.eventsource = sseClient
  }
  close() {
    this.eventsource?.close()
  }
}
