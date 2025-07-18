"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductCard } from "@/features/products/components/card-products-factu";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import { useGetProductsQuery } from "../../../../store/productos/api";
import { useFactura } from "../../context/factura.context";

interface FormData {
  cantidad: string;
  precio: string;
}

export default function FormPedido() {
  const { addProducto } = useFactura();
  const { data: productos } = useGetProductsQuery();
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState<FormData>({
    cantidad: "",
    precio: "",
  });
  const { height } = useWindowSize();

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

    // Validar que solo se ingresen números y decimales
    if (name === "cantidad" || name === "precio") {
      // Permitir números decimales (incluyendo punto decimal)
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

    if (cantidad && precio && selected && cantidad > 0 && precio > 0) {
      addProducto({
        id_producto: selected,
        precio_venta: precio,
        cantidad: cantidad,
      });

      // Limpiar formulario
      setFormData({ cantidad: "", precio: "" });
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
    <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
      {/* Selección de productos */}
      <div className="flex flex-1 items-center gap-3 overflow-x-auto pb-2">
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            selected={selected === producto.id}
            onClick={handleProductSelect}
          />
        ))}
      </div>

      {/* Formulario de cantidad y precio */}
      <div className="w-full" style={{ height: getContainerHeight() }}>
        <div className="m-4 space-y-4">
          {/* Input Cantidad */}
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
                  La cantidad no puede exceder el stock disponible ({maxStock})
                </p>
              )}
          </div>

          {/* Input Precio */}
          <div className={`space-y-2 ${getInputSpacing()}`}>
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
