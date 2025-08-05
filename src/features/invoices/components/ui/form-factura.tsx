"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductCard } from "@/features/products/components/card-products-factu";
import { useDebounce } from "@uidotdev/usehooks";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import { VITE_API_URL } from "../../../../config/config";
import { useGetProductsQuery } from "../../../../store/productos/api";
import { useUpdateParam } from "../../../../utils/update-search-param";
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
  const debouncedTerm = useDebounce(searchTerm, 300);
  const { updateSearchParams } = useUpdateParam();
  const [formData, setFormData] = useState<FormData>({
    cantidad: "",
    precio: "",
    porcentage_descuento: "",
  });
  const { height } = useWindowSize();
  const [productsState, setProductState] = useState(productos || []);

  // Update URL query param as user types
  useEffect(() => {
    updateSearchParams({ query: searchTerm });
  }, [searchTerm, updateSearchParams]);

  // Fetch products when debouncedTerm changes
  useEffect(() => {
    async function fetchProductos() {
      if (!debouncedTerm.trim()) {
        setProductState(productos || []);
        return;
      }
      try {
        const response = await fetch(
          `${VITE_API_URL}/productos-debounced?query=${encodeURIComponent(
            debouncedTerm
          )}`,
          { credentials: "include" }
        );
        if (!response.ok) throw new Error("Error en la API");
        const data = await response.json();
        setProductState(data);
      } catch (error) {
        console.error("Error buscando productos:", error);
        setProductState([]);
      }
    }
    fetchProductos();
  }, [debouncedTerm, productos]);

  // Filtrar productos basado en término actual
  const filteredProducts = useMemo(() => {
    return (productsState || []).filter((p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, productsState]);

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
    if (["cantidad", "precio", "porcentage_descuento"].includes(name)) {
      const isValidNumber = /^\d*\.?\d*$/.test(value) || value === "";
      if (!isValidNumber) return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "cantidad") setSearchTerm(searchTerm); // maintain
  };

  const handleProductSelect = (id: string) => setSelected(id);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cantidad = parseFloat(formData.cantidad);
    const precio = parseFloat(formData.precio);
    const porcentaje = parseFloat(formData.porcentage_descuento);
    if (cantidad > 0 && precio > 0 && selected) {
      addProducto({
        id_producto: selected,
        precio_venta: precio,
        cantidad,
        porcentage_descuento: porcentaje,
      });
      setFormData({ cantidad: "", precio: "", porcentage_descuento: "" });
      setSelected(undefined);
      setSearchTerm("");
    }
  };

  const selectedProduct = productos.find((p) => p.id === selected);
  const maxStock = selectedProduct?.stock || 0;

  const isFormValid =
    !!selected &&
    parseFloat(formData.cantidad) > 0 &&
    parseFloat(formData.precio) > 0 &&
    parseFloat(formData.porcentage_descuento) >= 0 &&
    parseFloat(formData.cantidad) <= maxStock;

  const getContainerHeight = () =>
    height < 800 ? "auto" : `${Math.floor(height * 0.6)}px`;
  const getInputSpacing = () => (height < 800 ? "mt-2" : "mt-8");
  const getButtonSpacing = () =>
    height < 800 ? "mt-4" : height > 1000 ? "mt-[40%]" : "mt-8";

  return (
    <form
      className="grid grid-cols-1 gap-4 overflow-y-auto"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 ">
        {displayedProducts.map((producto, index) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            selected={selected === producto.id}
            onClick={handleProductSelect}
            animationDelay={`${index * 0.07}s`}
          />
        ))}
      </div>
      <div
        className="w-full mt-8 overflow-y-auto"
        style={{ height: getContainerHeight() }}
      >
        <div className="m-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cantidad" className="text-sm font-medium">
              Cantidad
              {selectedProduct && (
                <span className="text-muted-foreground ml-2">
                  (Stock: {maxStock})
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
            {formData.cantidad && parseFloat(formData.cantidad) > maxStock && (
              <p className="text-sm text-destructive">
                Cantidad excede el stock ({maxStock})
              </p>
            )}
          </div>
          <div className={getInputSpacing()}>
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
                <Label
                  htmlFor="porcentage_descuento"
                  className="text-sm font-medium"
                >
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
        <div className={`flex justify-center ${getButtonSpacing()}`}>
          <Button
            type="submit"
            variant="outline"
            className="px-8 py-2 hover:bg-amber-200 hover:border-amber-300 transition-colors"
            disabled={!isFormValid}
          >
            Agregar producto
          </Button>
        </div>
      </div>
    </form>
  );
}
