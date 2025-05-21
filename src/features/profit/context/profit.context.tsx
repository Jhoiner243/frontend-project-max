/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useGetProfitQuery } from "../../../store/profit/api";
import { GananciasEntity } from "../types/profit.entity";

interface GananciasContext {
  profit: GananciasEntity[];
  loading: boolean;
}

const ProfitContext = createContext<GananciasContext | null>(null);

export const ProfitProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useGetProfitQuery();

  return (
    <ProfitContext.Provider
      value={{
        profit: data ?? [],
        loading: isLoading,
      }}
    >
      {children}
    </ProfitContext.Provider>
  );
};

export const useProfit = () => {
  const context = useContext(ProfitContext);
  if (!context) {
    throw new Error("useAnaliticsContext must be used within a ProfitProvider");
  }
  return context;
};
