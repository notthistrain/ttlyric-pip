import { SCRIPT } from "./const"

export interface MessageDTO<T> {
  action: string
  data: T
  from: SCRIPT,
  dest: SCRIPT
}

export interface RuntimeMessageHandler<T = any> {
  (
    message: MessageDTO<T>,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ): void
}

