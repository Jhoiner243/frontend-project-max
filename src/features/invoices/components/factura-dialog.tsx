import { Dispatch, SetStateAction } from "react";
import { FacturaProvider } from "../context/factura.context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
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
        <DialogContent className="flex max-h-[80vh] max-w-4xl">
          <div className="flex flex-1 flex-col gap-4 pr-6">
            <DialogHeader>
              <DialogTitle>Crea un pedido nuevo</DialogTitle>
              <DialogDescription className="mb-2">
                Para crear una factura necesitas haber realizado un proceso de
                pedido
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <FormFactura />
            </div>
          </div>

          <div className="sticky top-0 h-[calc(80vh-2rem)] w-96 border-l pl-6">
            <TableFactura />
          </div>
        </DialogContent>
      </Dialog>
    </FacturaProvider>
  );
}
