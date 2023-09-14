import { useRuntimeMessageHandlerCreator } from "@/libs"
import { SSEClient } from "./SSEClient"
import { BackgroundContext, MessageAction, SCRIPT } from "@/types"
import afterCheckedHost from "./handler/afterCheckedHost"

const context: BackgroundContext = {}

const sse = new SSEClient()
sse.connect()

const [addHandler, removeHandler] =
  useRuntimeMessageHandlerCreator<BackgroundContext>(SCRIPT.BACKGROUND, context)

addHandler(MessageAction.CHECKED_HOST, afterCheckedHost)
