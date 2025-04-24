import { ComboboxClient } from "@/features/clients/components/ui/combobox-client";
import { ClientsProvider } from "@/features/clients/context/client-context";
import { ProductoProvider } from "@/features/products/context/producto.context";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { FacturaProvider } from "../context/factura.context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import FormFactura from "./ui/form-factura";
import { TableFactura } from "./ui/table-factura";

export default function FacturaDialog() {
  const [open, setOpen] = useState(false);
  return (
    <ProductoProvider>
      <ClientsProvider>
        <FacturaProvider>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='flex flex-1 h-2 w-3 items-center gap-x-3 rounded-lg bg-white p-4 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:outline-white/10 dark:hover:bg-slate-700"'>
              {<PlusCircleIcon className="h-5 w-5" />} Crear pedido{" "}
            </DialogTrigger>
            <DialogContent className="flex max-h-[80vh] max-w-4xl">
              <div className="flex flex-1 flex-col gap-4 pr-6">
                <DialogHeader>
                  <DialogTitle>Crea un pedido nuevo</DialogTitle>
                  <DialogDescription className="mb-2">
                    Para crear una factura necesitas haber realizado un proceso
                    de pedido
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  <ComboboxClient />
                  <FormFactura />
                </div>
              </div>

              <div className="sticky top-0 h-[calc(80vh-2rem)] w-96 border-l pl-6">
                <TableFactura />
              </div>
            </DialogContent>
          </Dialog>
        </FacturaProvider>
      </ClientsProvider>
    </ProductoProvider>
  );
}
