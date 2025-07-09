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
import { useGetClientsQuery } from "../../../../store/clients/api";
import { ClientEntity } from "../../client.types";

interface EditDataProps {
  id: string;
  onSubmit: ({ id, data }: { id: string; data: Partial<ClientEntity> }) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

export const EditClient = ({ id, onSubmit, setOpen, open }: EditDataProps) => {
  const [dataEdited, setDataEdited] = useState<Partial<ClientEntity>>({});
  const { data: clients } = useGetClientsQuery();
  const data = clients?.clientes?.find((client) => client.id === id);
  // Inicializamos dataEdited con los valores que ya trae `data`

  // Cuando el usuario escribe en un input, modificamos solo esa propiedad.
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataEdited((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // onSubmit wrapper: preventDefault, await onSubmit, cerrar diálogo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Si no hay ID, no enviamos
    if (!id) return;

    try {
      onSubmit({ id: id, data: dataEdited });
      // Cerrar diálogo solo cuando la mutación haya terminado
      setOpen(false);
    } catch (err) {
      // Aquí podrías mostrar una notificación de error
      console.error("Error al guardar:", err);
    }
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
        {data !== undefined && (
          <form onSubmit={handleSubmit} className="grid gap-4 py-2">
            <div className="grid gap-1">
              <Label htmlFor="name-1">Nombre</Label>
              <Input
                name="name"
                defaultValue={data.name}
                value={dataEdited.name as string}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="address-1">Ubicación</Label>
              <Input
                type="text"
                name="address"
                defaultValue={data.address}
                value={dataEdited.address as string}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="email-1">Email</Label>
              <Input
                name="email"
                type="email"
                defaultValue={data.email}
                value={dataEdited.email as string}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="telefono-1">Teléfono</Label>
              <Input
                type="text"
                name="phone"
                defaultValue={data.phone}
                value={dataEdited.phone as string}
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
        )}
      </DialogContent>
    </Dialog>
  );
};
