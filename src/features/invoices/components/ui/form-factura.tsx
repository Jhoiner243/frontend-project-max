import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/features/products/components/card-products-factu";
import { useProductosContext } from "@/features/products/context/producto.context";
import { useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { Label } from "../../../../components/ui/label";
import { useFactura } from "../../context/factura.context";

export default function FormPedido() {
  const { addProducto } = useFactura();
  const { productos } = useProductosContext();
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [cantidad, setCantidad] = useState<number | undefined>(undefined);
  const [precio, setPrecio] = useState<number | undefined>(undefined);
  const { height } = useWindowSize();

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
  const max = productos.reduce((acc, producto) => {
    const stock = typeof producto.stock === "number" ? producto.stock : 0;
    if (selected === producto.id) {
      return producto.stock;
    }
    return stock > acc ? stock : acc;
  }, 0);

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
      <div
        className="w-auto"
        style={{
          // Usa el 60% de la altura de la ventana, por ej.
          height: `${Math.floor(height * 0.6)}px`,
        }}
      >
        <div className={`m-4 mt-[7%] ${height < 800 ? "mt-0" : "h-[40vh]"}`}>
          <Label className="mb-1 dark:bg-transparent p-1">Cantidad</Label>
          <Input
            className={`
              dark:border-0
              /* Siempre quita el spinner en Firefox */
              -moz-appearance-textfield
      
              /* Para WebKit, ocultar en hover y focus */
              hover:[&::-webkit-inner-spin-button]:appearance-none 
              hover:[&::-webkit-outer-spin-button]:appearance-none
              focus:[&::-webkit-inner-spin-button]:appearance-none 
              focus:[&::-webkit-outer-spin-button]:appearance-none
      
              /* Para que no salga por defecto en WebKit cuando no haya hover */
              [&::-webkit-inner-spin-button]:appearance-auto 
              [&::-webkit-outer-spin-button]:appearance-auto
            `}
            min={1}
            max={max}
            type="number"
            placeholder="Ingresa cantidad"
            name="cantidad"
            value={cantidad ? cantidad : ""}
            onChange={handleChange}
          />

          <Label
            className={`mt-8 dark:bg-transparent p-1 mb-1 ${
              height < 800 && "mt-0"
            }`}
          >
            Precio
          </Label>
          <Input
            className={`dark:border-0 ${height < 800 && "mt-0"}`}
            type="text"
            name="precio"
            placeholder="Ingresa precio venta"
            value={precio ? precio : ""}
            onChange={handleChange}
          />
        </div>
        <Button
          variant="outline"
          className={`flex mx-auto  ${
            (height < 800 && "mt-0") || (height > 1000 && "mt-[40%]")
          } hover:bg-amber-200 hover:cursor-pointer `}
          disabled={!selected || !cantidad || !precio}
        >
          Agregar producto
        </Button>
      </div>
    </form>
  );
}
