import { Separator } from "@radix-ui/react-separator";
import { Receipt } from "lucide-react";
import { FacturaProvider } from "../context/factura.context";
import FormFactura from "./ui/form-factura";
import { TableFactura } from "./ui/table-factura";

export default function FacturasSecondPage() {
  return (
    <div className="flex">
      <FacturaProvider>
        {/* Left Panel - Form */}
        <div className="flex flex-1 flex-col bg-background">
          <div className="flex-1  px-8 py-6">
            <div className="space-y-8">
              <FormFactura />
            </div>
          </div>
        </div>

        {/* Vertical Separator */}
        <Separator orientation="vertical" className="h-full" />

        {/* Right Panel - Table */}
        <div className="flex w-[420px] h-[800px] flex-col bg-muted/20">
          <div className="border-b bg-background/50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                <Receipt className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Resumen del Pedido
                </h3>
                <p className="text-sm text-muted-foreground">
                  Detalles y totales
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <TableFactura />
          </div>
        </div>
      </FacturaProvider>
    </div>
  );
}
