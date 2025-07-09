/* eslint-disable react-refresh/only-export-components */
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle2Icon,
  ChevronDown,
  LoaderIcon,
  TableOfContents,
} from "lucide-react";
import * as React from "react";
import { Badge } from "../../../../components/ui/badge";
import { usePutInvoiceMutation } from "../../service/api-facturas-update";
import type { FacturaSeccion } from "../../types/factura.types";

export enum StatusFactura {
  Pagada = "Pagada",
  Pendiente = "Pendiente",
  Fiada = "Fiada",
  Vencida = "Vencida",
}

export type FacturaStatus = keyof typeof StatusFactura;

// Configuración de estilos para cada estado con soporte dark mode
const STATUS_STYLES = {
  Pagada: {
    badge:
      "text-green-800 border-green-300 bg-green-50 dark:text-green-300 dark:border-green-700 dark:bg-green-950/50",
    item: "text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-950/50 focus:bg-green-50 dark:focus:bg-green-950/50",
    icon: CheckCircle2Icon,
    iconClass: "text-green-600 dark:text-green-400",
  },
  Pendiente: {
    badge:
      "text-yellow-800 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:border-yellow-700 dark:bg-yellow-950/50",
    item: "text-yellow-700 dark:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-950/50 focus:bg-yellow-50 dark:focus:bg-yellow-950/50",
    icon: LoaderIcon,
    iconClass: "text-yellow-600 dark:text-yellow-400",
  },
  Fiada: {
    badge:
      "text-blue-800 border-blue-300 bg-blue-50 dark:text-blue-300 dark:border-blue-700 dark:bg-blue-950/50",
    item: "text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 focus:bg-blue-50 dark:focus:bg-blue-950/50",
    icon: TableOfContents,
    iconClass: "text-blue-600 dark:text-blue-400",
  },
  Vencida: {
    badge:
      "text-red-800 border-red-300 bg-red-50 dark:text-red-300 dark:border-red-700 dark:bg-red-950/50",
    item: "text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/50 focus:bg-red-50 dark:focus:bg-red-950/50",
    icon: null,
    iconClass: "text-red-600 dark:text-red-400",
  },
} as const;

export function DropEstadoInvoice({
  value,
  statusI,
}: {
  value: FacturaSeccion;
  statusI: FacturaStatus;
}) {
  const [position, setPosition] = React.useState<FacturaStatus>(statusI);
  const [putInvoiceStatus] = usePutInvoiceMutation();
  const status = Object.values(StatusFactura) as FacturaStatus[];

  const currentStyle = STATUS_STYLES[position];
  const IconComponent = currentStyle.icon;

  const handleStatusChange = React.useCallback(
    (newStatus: FacturaStatus) => {
      setPosition(newStatus);
      putInvoiceStatus({
        id: value.idFactura.toString(),
        data: { ...value, status: newStatus },
      });
    },
    [value, putInvoiceStatus]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          variant="outline"
          className={`${currentStyle.badge} flex items-center gap-1.5 px-2 py-1 hover:cursor-pointer w-[120px] transition-colors duration-200`}
        >
          {IconComponent && (
            <IconComponent
              size={12}
              className={`flex-shrink-0 ${currentStyle.iconClass}`}
            />
          )}
          <span className="text-xs font-medium truncate">{position}</span>
          <ChevronDown
            size={12}
            className="flex-shrink-0 opacity-60 dark:opacity-50"
          />
        </Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={(value) => handleStatusChange(value as FacturaStatus)}
        >
          {status.map((estado) => {
            const itemStyle = STATUS_STYLES[estado];
            const ItemIcon = itemStyle.icon;

            return (
              <DropdownMenuRadioItem
                key={estado}
                value={estado}
                className={`${itemStyle.item} cursor-pointer transition-colors duration-150`}
              >
                <div className="flex items-center gap-2">
                  {ItemIcon && (
                    <ItemIcon size={14} className={itemStyle.iconClass} />
                  )}
                  <span>{estado}</span>
                </div>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
