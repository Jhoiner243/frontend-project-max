import { LlmResponse } from "../features/ai/types/llm.types";

export function formatLlmResponse(response: LlmResponse): string {
  // 2. Recorremos cada mensaje en el array
  return response?.messages
    ?.map((msg) => {
      // 3. Si es texto final...
      if ("finalText" in msg) {
        if ("functionCall" in msg) return;
        // Unimos las líneas de texto y las devolvemos
        if (msg.finalText.text) {
          return msg.finalText.text;
        }
      }
    })
    .filter((text): text is string[] => text !== undefined) // Filter out undefined values
    .join(" "); // Join the array into a single string
}

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
