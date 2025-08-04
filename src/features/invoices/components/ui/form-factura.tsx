"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductCard } from "@/features/products/components/card-products-factu";
import type React from "react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import { useGetProductsQuery } from "../../../../store/productos/api";
import { useFactura } from "../../context/factura.context";

interface FormData {
  cantidad: string;
  precio: string;
  porcentage_descuento: string;
}

export default function FormPedido() {
  const { addProducto } = useFactura();
  const { data: productos } = useGetProductsQuery();
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<FormData>({
    cantidad: "",
    precio: "",
    porcentage_descuento: "",
  });
  const { height } = useWindowSize();

  // Filtrar productos basado en el término de búsqueda
  const filteredProducts = useMemo(() => {
    if (!productos) return [];
    return productos.filter((p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, productos]);

  // Mostrar solo los primeros 10 productos filtrados
  const displayedProducts = filteredProducts.slice(0, 10);

  if (!productos) {
    return (
      <Link
        to="/productos"
        className="text-destructive rounded-full p-4 hover:bg-primary/20 transition-colors"
      >
        ¡Agrega un producto para empezar!
      </Link>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Validar que solo se ingresen números y decimales para cantidad y precio
    if (name === "cantidad" || name === "precio" || name === "descuento") {
      const isValidNumber = /^\d*\.?\d*$/.test(value) || value === "";
      if (!isValidNumber) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductSelect = (id: string) => {
    setSelected(id);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cantidad = Number.parseFloat(formData.cantidad);
    const precio = Number.parseFloat(formData.precio);
    const porcentaje = Number.parseFloat(formData.porcentage_descuento);
    if (cantidad && precio && selected && cantidad > 0 && precio > 0) {
      addProducto({
        id_producto: selected,
        precio_venta: precio,
        cantidad: cantidad,
        porcentage_descuento: porcentaje,
      });

      // Limpiar formulario
      setFormData({ cantidad: "", precio: "", porcentage_descuento: "" });
      setSelected(undefined);
    }
  };

  const selectedProduct = productos.find((p) => p.id === selected);
  const maxStock = selectedProduct?.stock || 0;

  const isFormValid =
    selected &&
    formData.cantidad &&
    formData.precio &&
    Number.parseFloat(formData.cantidad) > 0 &&
    Number.parseFloat(formData.precio) > 0 &&
    Number.parseFloat(formData.porcentage_descuento) >= 0 &&
    Number.parseFloat(formData.cantidad) <= maxStock;

  const getContainerHeight = () => {
    if (height < 800) return "auto";
    return `${Math.floor(height * 0.6)}px`;
  };

  const getInputSpacing = () => {
    return height < 800 ? "mt-2" : "mt-8";
  };

  const getButtonSpacing = () => {
    if (height < 800) return "mt-4";
    if (height > 1000) return "mt-[40%]";
    return "mt-8";
  };

  return (
    <form
      className="grid grid-cols-1 gap-4 overflow-y-auto"
      onSubmit={handleSubmit}
    >
      {/* Buscador de productos */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Selección de productos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 xl:h-full gap-2">
        {displayedProducts.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            selected={selected === producto.id}
            onClick={handleProductSelect}
          />
        ))}
      </div>

      {/* Formulario de cantidad y precio */}
      <div
        className="w-full mt-8 overflow-y-auto"
        style={{ height: getContainerHeight() }}
      >
        <div className="m-4 space-y-4">
          {/* Input Cantidad */}
          <div>
            <div className="space-y-2">
              <Label htmlFor="cantidad" className="text-sm font-medium">
                Cantidad
                {selectedProduct && (
                  <span className="text-muted-foreground ml-2">
                    (Stock disponible: {maxStock})
                  </span>
                )}
              </Label>
              <Input
                id="cantidad"
                name="cantidad"
                type="text"
                inputMode="decimal"
                placeholder="Ej: 2.5"
                value={formData.cantidad}
                onChange={handleInputChange}
                className="remove-spinner"
                disabled={!selected}
              />
              {formData.cantidad &&
                Number.parseFloat(formData.cantidad) > maxStock && (
                  <p className="text-sm text-destructive">
                    La cantidad no puede exceder el stock disponible ({maxStock}
                    )
                  </p>
                )}
            </div>
            <div></div>
          </div>

          {/* Input Precio y Descuento */}
          <div className={`space-y-4 ${getInputSpacing()}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="precio" className="text-sm font-medium">
                  Precio de venta
                </Label>
                <Input
                  id="precio"
                  name="precio"
                  type="text"
                  inputMode="decimal"
                  placeholder="Ej: 15.99"
                  value={formData.precio}
                  onChange={handleInputChange}
                  className="remove-spinner"
                  disabled={!selected}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descuento" className="text-sm font-medium">
                  Descuento (%)
                </Label>
                <Input
                  id="porcentage_descuento"
                  name="porcentage_descuento"
                  type="text"
                  inputMode="decimal"
                  placeholder="Ej: 10"
                  value={formData.porcentage_descuento}
                  onChange={handleInputChange}
                  className="remove-spinner"
                  disabled={!selected}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botón Agregar */}
        <div className={`flex justify-center ${getButtonSpacing()}`}>
          <Button
            type="submit"
            variant="outline"
            className="px-8 py-2 hover:bg-amber-200 hover:border-amber-300 transition-colors bg-transparent"
            disabled={!isFormValid}
          >
            Agregar producto
          </Button>
        </div>
      </div>
    </form>
  );
}
