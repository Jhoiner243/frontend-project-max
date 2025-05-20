import { Textarea } from "@/components/ui/textarea";
import { cx } from "class-variance-authority";
import { motion } from "framer-motion";
import { ArrowUpIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import { LlmResponse } from "../types/llm.types";
import { StopIcon } from "./icons";
const suggestedActions = [
  {
    title: "¿Cuantos clientes hay activos",
    label: "en la empresa?",
    action: "Cuantos clientes hay activos de la base de datos?",
  },
  {
    title: "¿Cual es el producto",
    label: "con menos cantidad?",
    action: "Cual es el producto con menos cantidad?",
  },
];
export default function MultiModalInput({
  messages,
  prompt,
  stop,
  handleInput,
  textAreaRef,
  handleSubmit,
  isLoading,
  onSubmit,
  className,
}: {
  messages: LlmResponse;
  stop: () => void;
  textAreaRef?: React.Ref<HTMLTextAreaElement>;
  handleInput: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: ({ prompt }: { prompt: string }) => void;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    prompt?: string
  ) => void;
  prompt: string;
  isLoading: boolean;
  className?: string;
}) {
  return (
    <div className="relative w-full flex flex-col gap-4">
      {messages.messages.length === 0 && isLoading === false && (
        <div className="grid sm:grid-cols-2 gap-2 w-full">
          {suggestedActions.map((suggestedAction, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.06 * index }}
              key={index}
              className={index > 1 ? "hidden sm:block" : "block"}
            >
              <Button
                variant="ghost"
                onClick={(event) => {
                  event.preventDefault();
                  onSubmit?.({ prompt: suggestedAction.action });
                }}
                className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
              >
                <span className="font-medium">{suggestedAction.title}</span>
                <span className="text-muted-foreground">
                  {suggestedAction.label}
                </span>
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      <Textarea
        ref={textAreaRef}
        placeholder="Pregunta sobre la empresa..."
        value={prompt}
        onChange={handleInput}
        className={cx(
          "min-h-[80px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-xl text-base bg-muted",
          className
        )}
        rows={3}
        autoFocus
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            if (isLoading) {
              toast.error("Please wait for the model to finish its response!");
            } else {
              handleSubmit();
            }
          }
        }}
      />
      {isLoading ? (
        <Button
          className="rounded-full p-1.5 h-fit absolute bottom-0 right-2 m-0.5 border dark:border-zinc-600"
          onClick={(event) => {
            event.preventDefault();
            stop();
            onSubmit?.({ prompt: prompt });
          }}
        >
          <StopIcon size={14} />
        </Button>
      ) : (
        <Button
          className="rounded-full p-1.5 h-fit absolute bottom-0 right-2 m-0.5 border dark:border-zinc-600"
          onClick={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
          disabled={prompt.length === 0}
        >
          <ArrowUpIcon size={14} />
        </Button>
      )}
    </div>
  );
}
