import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateProductMutation } from "@/store/productos/api";
import React, { useState } from "react";
import { toast } from "sonner";
import { ProductEntity } from "../../product.type";

export function RenderInputTable({
  producto,
}: {
  producto: Pick<ProductEntity, "id" | "stock">;
}) {
  const [onUpdateStock] = useUpdateProductMutation();
  const [stockValue, setStockValue] = useState(producto.stock);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.promise(
      new Promise<void>((resolve) => {
        setTimeout(() => {
          onUpdateStock({ id: producto.id, data: { stock: stockValue } });
          resolve();
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
    <form onSubmit={handleSubmit}>
      <Label htmlFor={`${producto.stock}-target`} className="sr-only">
        Target
      </Label>
      <Input
        min={producto.stock}
        onChange={(e) => setStockValue(Number(e.target.value))}
        className="h-8 w-14 border-transparent dark:bg-transparent text-right shadow-none hover:bg-input/40 dark:hover:bg-input/40 focus-visible:border focus-visible:bg-background "
        defaultValue={stockValue}
        id={`${producto.id}-target`}
      />
    </form>
  );
}
