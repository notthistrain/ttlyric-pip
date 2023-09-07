/**
 * @description 音乐的状态
 */
enum SongState {
  /** @description 等待加载中 */
  IDLE = "idle",
  /** @description 播放 */
  PLAYING = "playing",
  /** @description 暂停 */
  PAUSE = "pause",
  /** @description 切换到上一首 */
  PRETRACK = "pretrack",
  /** @description 切换到下一首 */
  NEXTTRACK = "nexttrack",
}

interface Props {
  tab: chrome.tabs.Tab
}

abstract class BasePlayer {
  songState = SongState.IDLE
  tabId?: number

  abstract assetFileName: string
  abstract selector: {
    song: string
    pause: string
    nexttrack: string
    pretrack: string
    progress: string
  }
  abstract siteName: string
  abstract onPause: () => void
  abstract onPlay: () => void
  abstract onProgressDrag: () => void
  abstract onPageClose: () => void

  constructor({ tab }: Props) {
    this.tabId = tab.id
  }

  link() {
    if (this.tabId && this.assetFileName) {
      chrome.scripting.executeScript({
        injectImmediately: true,
        target: {
          tabId: this.tabId,
        },
        world: "ISOLATED",
        files: [this.assetFileName],
      })
    }
  }
}
