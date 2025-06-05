/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { LlmResponse } from "../types/llm.types";
import CallToolRequestSchemaResult from "./request-schema";

export function CallTools({ tools }: { tools: LlmResponse }) {
  // Extraemos solo los mensajes que contienen una llamada a función
  const functionCalls = tools.messages.filter(
    (msg) => "functionCall" in msg && msg.functionCall?.name
  ) as Array<{
    functionCall: { name: string; args?: any };
  }>;

  // Mapeamos cada llamada a {name, args}
  const calls = functionCalls.map((msg) => ({
    name: msg.functionCall.name,
    args: msg.functionCall.args ?? {},
  }));

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div className="flex flex-col gap-10">
          {calls.map((call, idx) => {
            // Decide qué componente renderizar según el nombre de la herramienta
            switch (call.name) {
              case "call_tool_request_schema":
                return (
                  <CallToolRequestSchemaResult
                    name={call.name}
                    key={idx}
                    result={call.args?.request}
                  />
                );
              case "read_resource_schema":
                return (
                  <CallToolRequestSchemaResult
                    name={call.name}
                    key={idx}
                    result={call.args?.uri}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      </motion.div>
    </div>
  );
}
