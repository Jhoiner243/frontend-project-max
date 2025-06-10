/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { useGetProductsQuery } from "../../../../store/productos/api";
import { ProductEntity } from "../../product.type";

interface EditDataProps {
  id: string;
  onSubmit: ({
    id,
    data,
  }: {
    id: string;
    data: Partial<ProductEntity>;
  }) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

export const EditProduct = ({ id, onSubmit, setOpen, open }: EditDataProps) => {
  const [dataEdited, setDataEdited] = useState<Partial<ProductEntity>>({});
  const { data } = useGetProductsQuery();
  // Inicializamos dataEdited con los valores que ya trae `data`

  const dataFilter = data?.filter((dato) => id === dato.id);

  // Cuando el usuario escribe en un input, modificamos solo esa propiedad.
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataEdited((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // onSubmit wrapper: preventDefault, await onSubmit, cerrar diálogo

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.promise(
      new Promise<void>((resolve) => {
        setTimeout(() => {
          onSubmit({ id: id, data: dataEdited });
          resolve();
          setOpen(false);
        }, 900);
      }),
      {
        loading: `Guardando…`,
        success: "¡Listo!",
        error: "Error al guardar",
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar</DialogTitle>
          <DialogDescription>
            Modifica los campos que desees y haz clic en “Guardar cambios”.
          </DialogDescription>
        </DialogHeader>

        {data === undefined && (
          <div className="flex p-10 justify-center items-center">
            No hay datos a editar
          </div>
        )}
        {dataFilter?.map((dato) => (
          <form onSubmit={handleSubmit} className="grid gap-4 py-2">
            <div className="grid gap-1">
              <Label htmlFor="name-1">Nombre</Label>
              <Input
                name="nombre"
                defaultValue={dato.nombre}
                value={dataEdited.nombre as string}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="address-1">Precio compra</Label>
              <Input
                type="text"
                name="precio_compra"
                defaultValue={dato.precio_compra}
                value={dataEdited?.precio_compra as number}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="email-1">Stock</Label>
              <Input
                name="stock"
                type="number"
                defaultValue={dato.stock}
                value={dataEdited.stock as number}
                onChange={handleChange}
              />
            </div>

            <DialogFooter className="mt-4 flex justify-end space-x-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Guardar cambios</Button>
            </DialogFooter>
          </form>
        ))}
      </DialogContent>
    </Dialog>
  );
};
