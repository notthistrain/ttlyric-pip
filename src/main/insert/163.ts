import { useRuntimeMessageHandlerCreator } from "@/libs"
import { SCRIPT } from "@/types"

const context: any = {}

const [addHandler, removeHandler] = useRuntimeMessageHandlerCreator(
  SCRIPT.INSERT,
  context
)
