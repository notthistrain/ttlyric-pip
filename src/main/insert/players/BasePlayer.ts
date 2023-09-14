import { MusicEventHandler, SongState } from "@/types"

export interface PlayerProps {
  tab: chrome.tabs.Tab
}

export interface Player {
  afterInsert: MusicEventHandler
  onPause: MusicEventHandler
  onPlay: MusicEventHandler
  onProgressDrag: MusicEventHandler
  onTabClose: MusicEventHandler
  getSongId: () => string | null
  getPlayState: () => boolean | null
  getProgress: () => { currentTime: string; fullTime: string } | null
}

export abstract class BasePlayer {
  songState = SongState.IDLE
  tabId?: number
  elMap = new Map<string, HTMLElement | null>()

  abstract selector: { [key: string]: string } & {
    song: string
    pause: string
    play: string
    nexttrack: string
    pretrack: string
    progress: string
  }
  abstract siteName: string
  abstract jsFiles: string[]

  constructor({ tab }: PlayerProps) {
    this.tabId = tab.id
    this.bind()
  }

  bind() {
    Reflect.ownKeys(this.selector).forEach((key) => {
      const value = this.selector[key as string]
      if (value) {
        this.elMap.set(value, document.querySelector(value))
      }
    })
  }

  async link() {
    if (this.tabId && this.jsFiles && this.jsFiles.length > 0) {
      await chrome.scripting.executeScript({
        injectImmediately: true,
        target: {
          tabId: this.tabId,
        },
        world: "ISOLATED",
        files: this.jsFiles,
      })
    }
  }
}
