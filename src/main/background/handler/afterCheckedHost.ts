import { BackgroundContext, RuntimeMessageHandler } from "@/types"

const afterCheckedHost: RuntimeMessageHandler<undefined, BackgroundContext> = (
  message,
  sender,
  sendResponse,
  context
) => {
  sendResponse()
}

export default afterCheckedHost
