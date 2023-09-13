import { BasePlayer, Player, PlayerProps } from "../BasePlayer"

class NeteasePlayer extends BasePlayer implements Player {
  selector = {
    song: "#g_player > div.head.j-flag > a",
    pause: "#g_player > div.btns > a.ply.j-flag.pas",
    play: "#g_player > div.btns > a.ply.j-flag.pas",
    nexttrack: "",
    pretrack: "",
    progress: "#g_player > div.play > div.m-pbar > span",
  }
  siteName = ""
  jsFiles = ["js/163.js"]

  constructor(props: PlayerProps) {
    super(props)
  }

  getSongId() {
    const songEl = this.elMap.get(this.selector.song)
    if (songEl instanceof HTMLAnchorElement) {
      const href = songEl.href
      const songId = href.split("id=")[1]
      return songId
    }
    return null
  }

  getPlayState() {
    const playEl = this.elMap.get(this.selector.pause)
    if (playEl instanceof HTMLAnchorElement) {
      return playEl.getAttribute("data-action") === "pause"
    }
    return null
  }

  getProgress() {
    const progressEl = this.elMap.get(this.selector.progress)
    if (progressEl instanceof HTMLSpanElement) {
      const html = progressEl.innerHTML
      const reg = /<em>(.*?)<\/em>\s\/\s(.+)/
      const match = html.match(reg)
      if (Array.isArray(match)) {
        return { currentTime: match[1], fullTime: match[2] }
      }
    }
    return null
  }

  async afterInsert() {}
  async onPause() {}
  async onPlay() {}
  async onProgressDrag() {}
  async onTabClose() {}
}
