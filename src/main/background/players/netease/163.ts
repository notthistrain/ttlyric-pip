import { RuntimeMessageHandler } from "@/types"

export const getMusic163CurrentSong: RuntimeMessageHandler = async (
  message,
  sender,
  sendResponse
) => {
  const songMaskEl = document.querySelector<HTMLAnchorElement>(
    "#g_player > div.head.j-flag > a"
  )
  const playEl = document.querySelector<HTMLAnchorElement>(
    "#g_player > div.btns > a.ply.j-flag.pas"
  )
  const progressEl = document.querySelector<HTMLSpanElement>(
    "#g_player > div.play > div.m-pbar > span"
  )
  let songId: string | undefined,
    isPlaying: boolean | undefined,
    currentTime: string | undefined,
    fullTime: string | undefined
  if (songMaskEl) {
    const href = songMaskEl.href
    songId = href.split("id=")[1]
  }
  if (playEl) {
    isPlaying = playEl.getAttribute("data-action") === "pause"
  }
  if (progressEl) {
    const html = progressEl.innerHTML
    const reg = /<em>(.*?)<\/em>\s\/\s(.+)/
    const match = html.match(reg)
    if (Array.isArray(match)) {
      currentTime = match[1]
      fullTime = match[2]
    }
  }
  sendResponse({
    song: {
      valid: !!songMaskEl,
      songId,
    },
    play: {
      valid: !!playEl,
      isPlaying,
    },
    progress: {
      valid: !!progressEl,
      currentTime,
      fullTime,
    },
  })
  return true
}
