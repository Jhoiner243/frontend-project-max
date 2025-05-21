/* eslint-disable @typescript-eslint/no-unused-vars */
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import { Button } from "../../../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { formatLlmResponse } from "../../../utils/utils";
import { LlmResponse } from "../types/llm.types";

export function MessageActions({
  message,
  isLoading,
}: {
  message: LlmResponse;
  isLoading: boolean;
}) {
  const [_, copyToClipboard] = useCopyToClipboard();
  const response = formatLlmResponse(message);
  if (isLoading) return null;
  return (
    <TooltipProvider>
      <div className="flex flex-row gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="py-1 px-2 h-fit text-muted-foreground"
              variant="outline"
              onClick={async () => {
                await copyToClipboard(response);
                toast.success("Copied to clipboard!");
              }}
            >
              <CopyIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
