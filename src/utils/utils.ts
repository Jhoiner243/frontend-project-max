import { LlmResponse } from "../features/ai/types/llm.types";

export function formatLlmResponse(response: LlmResponse): string {
  // 2. Recorremos cada mensaje en el array
  return (
    response?.messages
      ?.map((msg) => {
        // 3. Si es texto final...
        if ("finalText" in msg) {
          if ("functionCall" in msg) return;
          // Unimos las líneas de texto y las devolvemos
          return msg.finalText.text;
        }
      })
      // 6. Unimos todos los mensajes formateados en un solo string
      .join("\n\n---\n\n") || ""
  );
}
