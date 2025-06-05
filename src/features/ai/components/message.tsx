import { cx } from "class-variance-authority";
import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";
import { formatLlmResponse } from "../../../utils/utils";
import { LlmResponse } from "../types/llm.types";
import { CallTools } from "./call-tools";
import Chat from "./chat";
import { MessageActions } from "./message-actions";

export default function PreviewMessage({
  message,
  isLoading,
}: {
  chatUser: string;
  message: LlmResponse;
  isLoading: boolean;
}) {
  const finalext = formatLlmResponse(message);

  return (
    <motion.div
      className="w-full mx-auto max-w-3xl px-4 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={message.role}
    >
      <div
        className={cx(
          "group-data-[role=user]/message:bg-primary group-data-[role=user]/message:text-primary-foreground flex gap-4 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl"
        )}
      >
        <div className="flex flex-col gap-2 w-full">
          {finalext && finalext.length > 0 && (
            <div className="flex flex-col gap-4">
              <Chat respuesta={finalext} />
            </div>
          )}
          {message.messages && (
            <div className="flex flex-col gap-4">
              <CallTools tools={message} />
            </div>
          )}
          <MessageActions
            key={`actions-${message}`}
            isLoading={isLoading}
            message={message}
          />
        </div>
      </div>
    </motion.div>
  );
}

export const ThinkingMessage = () => {
  const role = "assistant";

  return (
    <motion.div
      className="w-full mx-auto max-w-3xl px-4 group/message "
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      data-role={role}
    >
      <div
        className={cx(
          "flex gap-4 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl",
          {
            "group-data-[role=user]/message:bg-muted": true,
          }
        )}
      >
        <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
          <SparklesIcon size={14} />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-4 text-muted-foreground">
            Thinking...
          </div>
        </div>
      </div>
    </motion.div>
  );
};
