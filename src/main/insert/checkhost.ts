const URLS = ["music.163.com/"]
const { hostname, pathname } = location
const url = `${hostname}${pathname}`
console.log(url)
if (URLS.includes(url)) {
  const message = {
    from: "insert",
    dest: "background",
    action: "CHECKED_HOST",
  }
  chrome.runtime.sendMessage(message)
}
