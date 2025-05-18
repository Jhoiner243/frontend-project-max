import { AccordionItem } from "@radix-ui/react-accordion";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "../../../components/ui/accordion";

export default function ReadResourceArg({ result }: { result: string }) {
  const [expanded, setExpanded] = useState<string[]>([]);
  return (
    <div className="flex items-center w-full">
      <Accordion type="multiple" value={expanded} onValueChange={setExpanded}>
        {result && (
          <div>
            <AccordionItem value={result}>
              <AccordionTrigger className="px-4 py-3 text-cyan-800">
                uri
              </AccordionTrigger>
              <AccordionContent className="bg-transparent">
                {result}
              </AccordionContent>
            </AccordionItem>
          </div>
        )}
      </Accordion>
    </div>
  );
}
