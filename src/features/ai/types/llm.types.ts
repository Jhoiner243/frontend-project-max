export interface IPrompt {
  prompt: string;
}
export interface ToolsForLLM {
  tools: [
    {
      name: string;
      description: string;
      inputSchema: {
        type: "object";
        properties: {
          sql: { type: "string" };
        };
      };
    }
  ];
}

// Cada “mensaje” puede ser texto libre o un objeto de llamada a función
export type ChatMessage =
  | { finalText: { text: string[] } }
  | { functionCall?: funcionCall };

export interface funcionCall {
  args?: Record<string, unknown>;
  name: string;
}
// Payload final
export interface LlmResponse {
  messages: ChatMessage[];
  role: "assitent";
}
