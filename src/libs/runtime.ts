import { MessageDTO, RuntimeMessageHandler, SCRIPT } from "../types"

/**
 * @description
 * @returns [添加消息处理器, 删除消息处理器]
 */
export function useCRXRuntimeMessage(module: SCRIPT) {
  const handlers = new Map<string, RuntimeMessageHandler>()
  chrome.runtime.onMessage.addListener(
    (message: MessageDTO<any>, sender, sendResponse) => {
      const { dest, action } = message
      if (dest === module) {
        const handler = handlers.get(action)
        if (handler) {
          handler(message, sender, sendResponse)
        } else {
          console.error(`没有${action}对应的消息处理`, message)
        }
      } else {
        console.log("消息是不是发错人了", message)
      }
      return true
    }
  )
  return () => {
    const addHandler = (key: string, fn: RuntimeMessageHandler) => {
      if (handlers.has(key)) {
        throw new Error(`runtime-${key} 消息处理key重复了`)
      }
      handlers.set(key, fn)
      console.log(`添加${key}消息处理`)
    }
    const removeHandler = (key: string) => {
      handlers.delete(key)
      console.log(`消息处理${key}已移除`)
    }
    return [addHandler, removeHandler]
  }
}
