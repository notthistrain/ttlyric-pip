import { MessageDTO } from "./common"

export interface RuntimeMessageHandler<T = any, C = any> {
  (
    message: MessageDTO<T>,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void,
    context: C
  ): void
}
