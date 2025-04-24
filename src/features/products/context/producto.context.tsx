/* eslint-disable react-refresh/only-export-components */
import { getFetchWithCancel } from "@/hooks/use-fetch-cancel";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ProductCreate, ProductoSeccion } from "../product.type";

interface FacturaContext {
  productos: ProductoSeccion[];
  onSubmitProductos: (factura: ProductCreate) => void;
  isLoading: boolean;
  errors: string | null;
}

const ProductoContext = createContext<FacturaContext | undefined>(undefined);

export const ProductoProvider = ({ children }: { children: ReactNode }) => {
  const [productos, setProductos] = useState<ProductoSeccion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setError] = useState<string | null>(null);

  const getProductos = async () => {
    setIsLoading(true);
    try {
      const data = await getFetchWithCancel<ProductoSeccion[]>(
        "/productos",
        "GET"
      );
      if (data) setProductos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetch productos");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitProductos = async (factura: ProductCreate) => {
    try {
      setIsLoading(true);
      const response = await getFetchWithCancel("/productos", "POST", factura);

      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear producto");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <ProductoContext.Provider
      value={{
        productos,
        onSubmitProductos,
        isLoading,
        errors,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};

export const useProductos = () => {
  const context = useContext(ProductoContext);
  if (!context) {
    throw new Error("useProducto must be used within a ProductoProvider");
  }
  return context;
};
