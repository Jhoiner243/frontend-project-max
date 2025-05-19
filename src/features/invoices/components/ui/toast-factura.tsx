"use client";

import { Button } from "@/components/ui/button";
import { useFactura } from "../../context/factura.context";

export function ToastDemo({ className }: { className: string }) {
  const { onSubmitFactura, factura } = useFactura();
  return (
    <>
      <Button
        disabled={!factura.id_cliente}
        variant="outline"
        className={className}
        onClick={onSubmitFactura}
      >
        Finalizar factura
      </Button>
    </>
  );
}
