import { FileText, Plus, Receipt } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import { FacturaProvider } from "../context/factura.context";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import FormFactura from "./ui/form-factura";
import { TableFactura } from "./ui/table-factura";

export default function FacturaDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <FacturaProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-h-[85vh] max-w-6xl border-0 p-0 shadow-2x">
          {/* Left Panel - Form */}
          <div className="flex flex-1 flex-col bg-background">
            <div className="border-b bg-muted/30 px-8 py-6">
              <DialogHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Plus className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-semibold tracking-tight">
                      Crear Nuevo Pedido
                    </DialogTitle>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1.5">
                    <FileText className="h-3 w-3" />
                    Proceso de pedido requerido
                  </Badge>
                </div>
              </DialogHeader>
            </div>

            <div className="flex-1  px-8 py-6">
              <div className="space-y-8">
                <FormFactura />
              </div>
            </div>
          </div>

          {/* Vertical Separator */}
          <Separator orientation="vertical" className="h-full" />

          {/* Right Panel - Table */}
          <div className="flex w-[420px] flex-col bg-muted/20">
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
        </DialogContent>
      </Dialog>
    </FacturaProvider>
  );
}
