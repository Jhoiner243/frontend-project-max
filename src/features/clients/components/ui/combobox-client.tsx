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
import { useGetClientsQuery } from "../../../../store/clients/api";

export function ComboboxClient() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { data: clients } = useGetClientsQuery();
  const { addClient } = useFactura();
  if (!clients) return [];
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] "
        >
          {value
            ? clients.clientes.find((client) => client.id === value)?.name
            : "Selecciona un cliente"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Busca un cliente..." className="h-9" />
          <CommandList>
            <CommandEmpty>No clients found.</CommandEmpty>
            <CommandGroup>
              {clients.clientes.map((cliente) => (
                <CommandItem
                  key={cliente.id}
                  value={cliente.id}
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
