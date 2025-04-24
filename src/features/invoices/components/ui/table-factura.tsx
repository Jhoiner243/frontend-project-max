import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProductos } from "@/features/products/context/producto.context";
import { Trash2 } from "lucide-react";
import { useFactura } from "../../context/factura.context";
import { ToastDemo } from "./toast-factura";

export function TableFactura() {
  const { factura, deleteProduct, clearInvoice } = useFactura();
  const { productos } = useProductos();

  return (
    <>
      <div>
        <Button
          variant="outline"
          className="p-1 cursor-pointer  text-red-400 "
          onClick={() => clearInvoice()}
        >
          Clear
        </Button>
      </div>
      <Table className="mt-7">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Producto</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead className="text-red-400 text-right">Eliminar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {factura.detalles.map((detalle) => {
            const product = productos.find((p) => p.id === detalle.id_producto);
            return (
              <TableRow key={detalle.id_producto}>
                <TableCell className="font-medium">
                  {product?.nombre || "Producto no encontrado"}
                </TableCell>
                <TableCell>{detalle.cantidad}</TableCell>
                <TableCell>
                  ${detalle.cantidad * detalle.precio_venta}
                </TableCell>
                <TableCell className="justify-items-center rounded-ss-lg hover:bg-red-400 w-0.5 ">
                  <button
                    className="items-center px-5"
                    onClick={() => deleteProduct(detalle.id_producto)}
                  >
                    <Trash2 className="h-4 w-4" color="red" />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">${factura.total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex gap-4 m-4 ml-[35%]  mt-10">
        <ToastDemo className="p-2 items-start" />
      </div>
    </>
  );
}
