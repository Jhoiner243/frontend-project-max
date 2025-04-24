"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFactura } from "@/features/invoices/context/factura.context";
import { cn } from "@/lib/utils";
import { useClient } from "../../context/client-context";

export function ComboboxClient() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { clients } = useClient();
  const { addClient } = useFactura();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? clients.find(() => clients[0].name === value)?.name
            : "Select client..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search client..." className="h-9" />
          <CommandList>
            <CommandEmpty>No clients found.</CommandEmpty>
            <CommandGroup>
              {clients.map((cliente) => (
                <CommandItem
                  key={cliente.id}
                  value={cliente.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    addClient(cliente.id);
                    setOpen(false);
                  }}
                >
                  {cliente.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === cliente.email ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
