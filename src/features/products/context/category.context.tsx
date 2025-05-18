/* eslint-disable react-refresh/only-export-components */
import { getFetchWithCancel } from "@/hooks/use-fetch-cancel";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CategoryCreate, CategoryEntity } from "../product.type";

interface FacturaContext {
  categoryProductos: CategoryEntity[];
  onSubmitCategory: (category: CategoryEntity) => void;
}

const CategoryContext = createContext<FacturaContext | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categoryProductos, setCategoryProductos] = useState<CategoryEntity[]>(
    []
  );

  const onSubmitCategory = async (category: CategoryCreate) => {
    const response = await getFetchWithCancel("/category", "POST", category);
    return response;
  };

  const getCategoryProductos = useCallback(async () => {
    const response = await getFetchWithCancel<CategoryEntity[]>(
      "/category",
      "GET"
    );
    if (response === undefined) return [];
    setCategoryProductos(response);
  }, []);

  useEffect(() => {
    getCategoryProductos();
  }, [getCategoryProductos]);

  return (
    <CategoryContext.Provider value={{ onSubmitCategory, categoryProductos }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useFactura must be used within a FacturaProvider");
  }
  return context;
};
