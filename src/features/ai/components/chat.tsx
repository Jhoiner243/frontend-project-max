"use client";

import { Sparkles, User } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocalStorage } from "usehooks-ts";
import { Separator } from "../../../components/ui/separator";
import { cn } from "../../../lib/utils";
import type { RootState } from "../../../store";
import { Markdown } from "./markdown";

interface ChatMessage {
  type: "user" | "ai";
  content: string;
}

export default function Chat({ respuesta }: { respuesta: string }) {
  // 1. Read messages from Redux state
  const chatMessages = useSelector((state: RootState) => state.ai.chatUser);
  const responseMessages = useSelector(
    (state: RootState) => state.ai.responseChat
  );

  // 2. Sync with localStorage using a single conversation array
  const [conversation, setConversation] = useLocalStorage<ChatMessage[]>(
    "conversation",
    []
  );

  useEffect(() => {
    // Only update if we have new messages or a new response
    if (chatMessages.length > 0 || respuesta) {
      // Build the complete conversation history
      const newConversation: ChatMessage[] = [];

      // Add all user messages and existing AI responses
      for (
        let i = 0;
        i < Math.max(chatMessages.length, responseMessages.length);
        i++
      ) {
        if (i < chatMessages.length) {
          newConversation.push({ type: "user", content: chatMessages[i] });
        }
        if (i < responseMessages.length) {
          newConversation.push({ type: "ai", content: responseMessages[i] });
        }
      }

      // Add the latest response if it's not already included
      if (
        respuesta &&
        (responseMessages.length === 0 ||
          respuesta !== responseMessages[responseMessages.length - 1])
      ) {
        newConversation.push({ type: "ai", content: respuesta });
      }

      // Update localStorage with the complete conversation
      setConversation(newConversation);
    }
  }, [chatMessages, responseMessages, respuesta, setConversation]);

  // 3. Determine what to display - use Redux state if available, otherwise use localStorage
  const conversationToRender =
    chatMessages.length > 0 || responseMessages.length > 0
      ? buildConversationFromRedux(chatMessages, responseMessages, respuesta)
      : conversation;

  return (
    <div className="space-y-8 py-4 w-full  mx-auto">
      {conversationToRender.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">No messages yet. Start a conversation!</p>
        </div>
      ) : (
        conversationToRender.map((message, idx) => (
          <div
            key={idx}
            className={cn(
              "transition-all duration-200 ease-in-out",
              idx === conversationToRender.length - 1 ? "animate-fadeIn" : ""
            )}
          >
            {message.type === "user" && (
              <div className="flex items-start gap-3 mb-6">
                <div className="rounded-full border-1 p-2 flex-shrink-0 shadow-sm">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-muted-foreground mb-1">
                    You
                  </div>
                  <div className="bg-muted rounded-lg p-4 shadow-sm">
                    <p className="whitespace-pre-wrap text-foreground">
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            )}{" "}
            {message.type === "ai" && (
              <div className="flex items-start gap-3 mb-6">
                <div className=" text-white rounded-full border-1 p-2 flex-shrink-0 shadow-sm">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-muted-foreground mb-1">
                    Assistant
                  </div>
                  <div className="bg-card rounded-lg p-4 shadow-sm border border-border">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <Markdown>{message.content}</Markdown>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {idx < conversationToRender.length - 1 && (
              <div className="py-2">
                <Separator className="my-2 opacity-30" />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

// Helper function to build conversation from Redux state
function buildConversationFromRedux(
  userMessages: string[],
  aiResponses: string[],
  latestResponse: string
): ChatMessage[] {
  const conversation: ChatMessage[] = [];

  // Add all messages in alternating order
  for (let i = 0; i < Math.max(userMessages.length, aiResponses.length); i++) {
    if (i < userMessages.length) {
      conversation.push({ type: "user", content: userMessages[i] });
    }
    if (i < aiResponses.length) {
      conversation.push({ type: "ai", content: aiResponses[i] });
    }
  }

  // Add the latest response if it's not already included
  if (
    latestResponse &&
    (aiResponses.length === 0 ||
      latestResponse !== aiResponses[aiResponses.length - 1])
  ) {
    conversation.push({ type: "ai", content: latestResponse });
  }

  return conversation;
}
