import PreviewMessage, { ThinkingMessage } from "../components/message";
import MultiModalInput from "../components/multimodel-input";
import { SpotlightNewDemo } from "../components/principal-background";
import { useChatLlm } from "../hooks/use-chat-llm";
import { useScrollToBottom } from "../hooks/use-scroll-to-bottom";

export default function AskPage() {
  const {
    handleSubmit,
    handleInput,
    textAreaRef,
    input,
    isLoading,
    onSubmit,
    reset,
    documents,
  } = useChatLlm();

  console.log("DOCUMENT: ", documents);
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();
  return (
    <>
      <div className="flex flex-col min-w-0 h-[88dvh] bg-background">
        <div
          ref={messagesContainerRef}
          className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-auto pt-4"
        >
          {!documents && isLoading === false && (
            <div className="max-w-3xl mx-auto md:mt-20 px-8 size-full flex flex-col justify-center">
              <SpotlightNewDemo />
            </div>
          )}

          {documents && documents.messages.length > 0 && (
            <PreviewMessage isLoading={isLoading} message={documents} />
          )}
          {isLoading && <ThinkingMessage />}
          <div
            ref={messagesEndRef}
            className="shrink-0 min-w-[24px] min-h-[24px]"
          />
        </div>
        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          <MultiModalInput
            stop={reset}
            messages={documents || { messages: [], role: "assitent" }}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            handleInput={handleInput}
            textAreaRef={textAreaRef}
            isLoading={isLoading}
            prompt={input}
          />
        </form>
      </div>
    </>
  );
}
