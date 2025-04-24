/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Button } from "@/components/ui/button";
import { useFactura } from "../../context/factura.context";

export function ToastDemo({className}: {className: string}) {
  const {onSubmitFactura} = useFactura()
  return (
    <>
      <Button variant="outline" className={className} onClick={onSubmitFactura}>
        Finalizar factura
      </Button>
    </>
  );
}
