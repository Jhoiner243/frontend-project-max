/* eslint-disable react-refresh/only-export-components */
import { getFetchWithCancel } from "@/hooks/use-fetch-cancel";
import { createContext, ReactNode, useContext, useState } from "react";
import {
  useGetProductsQuery,
  useLazyGetProductsQuery,
} from "../../../store/productos/api";
import type { ProductCreate, ProductoSeccion } from "../product.type";

interface FacturaContext {
  productos: ProductoSeccion[];
  onSubmitProductos: (factura: ProductCreate) => void;
  isLoading: boolean;
  errors: string | null;
}

const ProductoContext = createContext<FacturaContext | undefined>(undefined);

export const ProductoProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useGetProductsQuery();
  const [trigger] = useLazyGetProductsQuery();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setError] = useState<string | null>(null);

  const onSubmitProductos = async (factura: ProductCreate) => {
    try {
      setIsLoading(true);
      const response = await getFetchWithCancel("/productos", "POST", factura);

      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear producto");
    } finally {
      trigger();
      setIsLoading(false);
    }
  };

  return (
    <ProductoContext.Provider
      value={{
        productos: data ?? [],
        onSubmitProductos,
        isLoading,
        errors,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};

export const useProductosContext = () => {
  const context = useContext(ProductoContext);
  if (!context) {
    throw new Error("useProducto must be used within a ProductoProvider");
  }
  return context;
};
