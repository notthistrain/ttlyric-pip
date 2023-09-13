import { SCRIPT } from "./const"

/**
 * @description 音乐的状态
 */
export enum SongState {
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

export interface MusicEventHandler<T = void> {
  (): Promise<T>
}

export enum MessageAction {
  /** 识别到是个音乐网址 */
  CHECKED_HOST = "CHECKED_HOST",
}

export interface MessageDTO<T = undefined> {
  action: MessageAction
  data?: T
  from: SCRIPT
  dest: SCRIPT
}

export interface BackgroundContext {}
