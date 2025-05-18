/* eslint-disable react-refresh/only-export-components */
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle2Icon, ChevronDown, LoaderIcon } from "lucide-react";
import * as React from "react";
import { Badge } from "../../../../components/ui/badge";
import { usePutInvoiceMutation } from "../../service/api";
import { FacturaSeccion } from "../../types/factura.types";

export enum StatusFactura {
  Pagada = "Pagada",
  Pendiente = "Pendiente",
  Fiada = "Fiada",
  Vencida = "Vencida",
}

export type FacturaStatus = keyof typeof StatusFactura;
export function DropEstadoInvoice({
  value,
  statusI,
}: {
  value: FacturaSeccion;
  statusI: FacturaStatus;
}) {
  console.log("DROP ESTADO ID", value);
  const [position, setPosition] = React.useState<FacturaStatus>(statusI);
  const [putInvoiceStatus] = usePutInvoiceMutation();
  const status = Object.values(StatusFactura) as FacturaStatus[];

  const className = () => {
    let className = "";
    if (position === "Pagada") className += "text-green-800";
    if (position === "Pendiente") className += "text-yellow-800";
    if (position === "Vencida") className += " text-red-800";
    if (position === "Fiada") className += "text-red-800";
    return className;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          variant="outline"
          className={`${className()} flex gap-1 px-1.5  [&_svg]:size-3 hover:cursor-default`}
        >
          {position === "Pagada" ? (
            <>
              <CheckCircle2Icon
                size={10}
                className="text-green-500 dark:text-green-400"
              />{" "}
              <p>{position}</p>
            </>
          ) : position === "Pendiente" ? (
            <>
              <LoaderIcon /> <p>{position}</p>
            </>
          ) : (
            position
          )}
          <ChevronDown size={2} className="justify-items-center" />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Estado de la factura</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={(value) => setPosition(value as FacturaStatus)}
        >
          {status.map((estado) => (
            <DropdownMenuRadioItem
              onClick={() =>
                putInvoiceStatus({
                  id: value.id,
                  data: { ...value, status: estado },
                })
              }
              className={`${
                estado === "Pendiente" ? "text-yellow-100" : "text-red-300"
              } ${estado === "Pagada" && "text-green-200"}`}
              key={estado}
              value={estado}
            >
              {estado}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
