import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { CopyIcon, CrossIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { useCopyToClipboard, useWindowSize } from "usehooks-ts";
import { Button } from "../../../components/ui/button";
import { useChatLlm } from "../hooks/use-chat-llm";
import { useScrollToBottom } from "../hooks/use-scroll-to-bottom";
import { BaseResponseApiLLM, LlmResponse } from "../types/llm.types";
import PreviewMessage from "./message";
import MultiModalInput from "./multimodel-input";

interface MessageRole {
  role: "user" | "assitent";
}
export interface UIBlock {
  title: string;
  documentId: string;
  response: string;
  isVisible: boolean;
  status: "streaming" | "idle";
  boundingBox: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}
export default function Block({
  input,
  handleInput,
  handleSubmit,
  isLoading,
  block,
  setBlock,
  messages,
}: {
  input: string;
  handleInput: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    prompt?: string
  ) => void;
  isLoading: boolean;
  block: UIBlock;
  setBlock: Dispatch<SetStateAction<UIBlock>>;
  messages: LlmResponse;
}) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  //Recibimos los datos cuando enviamos el prompt
  const { documents } = useChatLlm();

  //Modo del boton cuando despues de enviar quieres editarlo
  const [mode, setMode] = useState<"edit" | "diff">("edit");
  //Estado local de los datos
  const [document, setDocument] = useState<BaseResponseApiLLM>();
  //Estado con el ultimo indice del dom
  const [currentVersionIndex, setCurrentVersionIndex] = useState(-1);

  useEffect(() => {
    if (documents && documents.messages.length > 0) {
      const mostRecentDocument = documents.messages.at(-1);

      if (mostRecentDocument) {
        setDocument(mostRecentDocument);
        setCurrentVersionIndex(documents.messages.length - 1);
        setBlock((currentBlok) => ({
          ...currentBlok,
          content: mostRecentDocument ?? "",
        }));
      }
    }
  }, [documents, setBlock]);

  function getDocumentContentById(index: number) {
    if (!documents) return "";
    if (!documents.messages[index]) return "";
    return documents.messages[index] ?? "";
  }

  const handleVersionChange = (type: "next" | "prev" | "toggle" | "latest") => {
    if (!documents) return;

    if (type === "latest") {
      setCurrentVersionIndex(documents.messages.length - 1);
      setMode("edit");
    }

    if (type === "toggle") {
      setMode((mode) => (mode === "edit" ? "diff" : "edit"));
    }

    if (type === "prev") {
      if (currentVersionIndex > 0) {
        setCurrentVersionIndex((index) => index - 1);
      }
    } else if (type === "next") {
      if (currentVersionIndex < documents.messages.length - 1) {
        setCurrentVersionIndex((index) => index + 1);
      }
    }
  };

  const isCurrentVersion =
    documents && documents.messages.length > 0
      ? currentVersionIndex === documents.messages.length - 1
      : true;

  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const isMobile = windowWidth ? windowWidth < 768 : false;

  const [_, copyToClipboard] = useCopyToClipboard();

  return (
    <motion.div
      className="flex flex-row h-dvh w-dvw fixed top-0 left-0 z-50 bg-muted"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.4 } }}
    >
      {!isMobile && (
        <motion.div
          className="relative w-[400px] bg-muted dark:bg-background h-dvh shrink-0"
          initial={{ opacity: 0, x: 10, scale: 1 }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 30,
            },
          }}
          exit={{
            opacity: 0,
            x: 0,
            scale: 0.95,
            transition: { delay: 0 },
          }}
        >
          <AnimatePresence>
            {!isCurrentVersion && (
              <motion.div
                className="left-0 absolute h-dvh w-[400px] top-0 bg-zinc-900/50 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
          <div className="flex flex-col h-full justify-between items-center gap-4">
            <div
              ref={messagesContainerRef}
              className="flex flex-col gap-4 h-full items-center overflow-y-scroll px-4 pt-20"
            >
              {messages.messages.map((index) => (
                <PreviewMessage
                  isLoading={
                    isLoading && index === messages.messages.length - 1
                  }
                  message={messages}
                />
              ))}
              <div
                className="shrink-0 min-w-[24px] min-h-[24px]"
                ref={messagesEndRef}
              ></div>

              <form className="flex flex-row gap-2 relative items-end w-full px-4 pb-4">
                <MultiModalInput
                  prompt={input}
                  handleSubmit={handleSubmit}
                  isLoading={isLoading}
                  messages={messages}
                  handleInput={handleInput}
                  className="bg-background dark:bg-muted"
                />
              </form>
            </div>
          </div>
        </motion.div>
      )}
      <motion.div
        className="fixed dark:bg-muted bg-background h-dvh flex flex-col shadow-xl overflow-y-scroll"
        initial={
          isMobile
            ? {
                opacity: 0,
                x: 0,
                y: 0,
                width: windowWidth,
                height: windowHeight,
                borderRadius: 50,
              }
            : {
                opacity: 0,
                x: block.boundingBox.left,
                y: block.boundingBox.top,
                height: block.boundingBox.height,
                width: block.boundingBox.width,
                borderRadius: 50,
              }
        }
        animate={
          isMobile
            ? {
                opacity: 1,
                x: 0,
                y: 0,
                width: windowWidth,
                height: "100dvh",
                borderRadius: 0,
                transition: {
                  delay: 0,
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                },
              }
            : {
                opacity: 1,
                x: 400,
                y: 0,
                height: windowHeight,
                width: windowWidth ? windowWidth - 400 : "calc(100dvw-400px)",
                borderRadius: 0,
                transition: {
                  delay: 0,
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                },
              }
        }
        exit={{
          opacity: 0,
          scale: 0.5,
          transition: {
            delay: 0.1,
            type: "spring",
            stiffness: 600,
            damping: 30,
          },
        }}
      >
        <div className="p-2 flex flex-row justify-between items-start">
          <div className="flex flex-row gap-4 items-start">
            <Button
              variant="outline"
              className="h-fit p-2 dark:hover:bg-zinc-700"
              onClick={() => {
                setBlock((currentBlock) => ({
                  ...currentBlock,
                  isVisible: false,
                }));
              }}
            >
              <CrossIcon size={18} />
            </Button>
          </div>
        </div>
      </motion.div>
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="p-2 h-fit dark:hover:bg-zinc-700"
              onClick={() => {
                copyToClipboard(block.response);
                toast.success("Copied to clipboard!");
              }}
              disabled={block.status === "streaming"}
            >
              <CopyIcon size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy to clipboard</TooltipContent>
        </Tooltip>
      </div>
    </motion.div>
  );
}
