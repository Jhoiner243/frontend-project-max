import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/features/products/components/card-products-factu";
import { useProductos } from "@/features/products/context/producto.context";
import { useState } from "react";
import { useFactura } from "../../context/factura.context";

export default function FormPedido() {
  const { addProducto } = useFactura();
  const { productos } = useProductos();
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

  console.log("Antes: ", selected);
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
      <div className="flex flex-1 items-center gap-3 mb-2">
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
        <div className="mb-2 mt-2">
          <Badge className="mb-1 dark:bg-transparent p-1 text-amber-100">
            Cantidad
          </Badge>
          <Input
            type="text"
            placeholder="Ingresa cantidad"
            name="cantidad"
            value={cantidad ? cantidad : ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2 mt-2">
          <Badge className="mb-1 dark:bg-transparent p-1 text-amber-100 pr-1">
            Precio
          </Badge>
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
          className="flex w-[50%] ml-[27%] transform-[-50%] mt-10  hover:bg-amber-200 hover:cursor-pointer"
          type="submit"
          disabled={!selected || !cantidad || !precio}
        >
          Agregar producto
        </Button>
      </div>
    </form>
  );
}
