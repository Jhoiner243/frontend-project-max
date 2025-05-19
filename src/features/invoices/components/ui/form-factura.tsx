import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/features/products/components/card-products-factu";
import { useProductosContext } from "@/features/products/context/producto.context";
import { useState } from "react";
import { Label } from "../../../../components/ui/label";
import { useFactura } from "../../context/factura.context";

export default function FormPedido() {
  const { addProducto } = useFactura();
  const { productos } = useProductosContext();
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [cantidad, setCantidad] = useState<number | undefined>(undefined);
  const [precio, setPrecio] = useState<number | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    switch (name) {
      case "cantidad":
        setCantidad(numericValue);
        break;
      case "precio":
        setPrecio(numericValue);
        break;
      default:
        console.warn(`Campo no reconocido: ${name}`);
    }
  };

  const handleSelect = (id: string) => {
    setSelected(id);
  };

  const handleAgregar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cantidad && precio && selected) {
      addProducto({
        id_producto: selected,
        precio_venta: precio,
        cantidad: cantidad,
      });
    }
    setCantidad(0);
    setSelected(undefined);
    setPrecio(0);
  };

  return (
    <form className="grid grid-cols-1" onSubmit={handleAgregar}>
      <div className="flex flex-1 items-center gap-3 ">
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            selected={selected === producto.id}
            onClick={handleSelect}
          />
        ))}
      </div>
      <div className="w-auto">
        <div className="m-4">
          <Label className="mb-1 dark:bg-transparent p-1">Cantidad</Label>
          <Input
            className="hover:cursor-pointer"
            min={1}
            max={productos.reduce((acc, producto) => {
              const stock =
                typeof producto.stock === "number" ? producto.stock : 0;
              if (selected === producto.id) {
                return producto.stock;
              }
              return stock > acc ? stock : acc;
            }, 0)}
            type="number"
            placeholder="Ingresa cantidad"
            name="cantidad"
            value={cantidad ? cantidad : ""}
            onChange={handleChange}
          />

          <Label className="mt-4 dark:bg-transparent p-1">Precio</Label>
          <Input
            type="text"
            name="precio"
            placeholder="Ingresa precio venta"
            value={precio ? precio : ""}
            onChange={handleChange}
          />
        </div>
        <Button
          variant="outline"
          className="flex mx-auto mt-[50%]  hover:bg-amber-200 hover:cursor-pointer"
          type="submit"
          disabled={!selected || !cantidad || !precio}
        >
          Agregar producto
        </Button>
      </div>
    </form>
  );
}
