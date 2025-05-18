"use client";

import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { useState } from "react";

interface CallToolRequestSchemaResultProps {
  result: string;
  name: string;
}

export default function CallToolRequestSchemaResult({
  result,
  name,
}: CallToolRequestSchemaResultProps) {
  // Handle different result formats

  const [expanded, setExpanded] = useState<string[]>([]);

  return (
    <motion.div
      initial={{ opacity: 10, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="rounded-lg overflow-hidden border border-b-gray-400 bg-transparent mb">
        {/* Content */}
        <div className="">
          {result.length > 0 ? (
            <>
              <Accordion
                type="multiple"
                value={expanded}
                onValueChange={setExpanded}
                className="w-full"
              >
                {result && (
                  <div>
                    <AccordionItem
                      value={`value-${result}`}
                      className=" bg-transparent"
                    >
                      <AccordionTrigger className="px-4 py-3 text-cyan-800">
                        {name === "call_tool_request_schema" ? "query" : "uri"}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3 bg-gray-400 text-black">
                        {result}
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                )}
              </Accordion>
            </>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No se devolvieron resultados
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
