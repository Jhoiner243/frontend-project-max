/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Copy, Database, ExternalLink, TableIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface CallToolResultProps {
  result: string;
}

export const CallToolResult = ({ result }: CallToolResultProps) => {
  const tablas = Array.isArray(result) ? result : [];
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    if (tablas.length <= 5) {
      setExpanded(tablas.map((_, i) => `Tabla-${i}`));
    } else {
      setExpanded([]);
    }
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between bg-[#1E1E1E] text-white px-4 py-2">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium">Tablas Disponibles</span>
          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
            {tablas.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className="bg-white">
        {tablas.length > 0 ? (
          <Accordion
            type="multiple"
            value={expanded}
            onValueChange={setExpanded}
            className="w-full"
          >
            {tablas.map((tabla, index) => (
              <AccordionItem
                key={index}
                value={`tabla-${index}`}
                className="border-b border-gray-200"
              >
                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-center gap-2 text-left">
                    <TableIcon className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-gray-900">
                      {tabla.name || tabla.table_name || "Sin nombre"}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 bg-gray-50">
                  <div className="text-sm text-gray-700">
                    <p className="mb-2">
                      <span className="font-medium">Descripción:</span>{" "}
                      {tabla.description || "Sin descripción disponible"}
                    </p>
                    {tabla.schema && (
                      <p className="mb-2">
                        <span className="font-medium">Esquema:</span>{" "}
                        {tabla.name}
                      </p>
                    )}
                    {tabla.rows && (
                      <p>
                        <span className="font-medium">Filas:</span> {tabla.uri}
                      </p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : null}
      </div>
    </div>
  );
};
