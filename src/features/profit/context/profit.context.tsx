/* eslint-disable react-refresh/only-export-components */
import { getFetchWithCancel } from "@/hooks/use-fetch-cancel";
import { createContext, useContext, useEffect, useState } from "react";
import { GananciasEntity } from "../types/profit.entity";

interface GananciasContext {
  profit: GananciasEntity[];
  loading: boolean;
}

const ProfitContext = createContext<GananciasContext | null>(null);

export const ProfitProvider = ({ children }: { children: React.ReactNode }) => {
  const [profit, setProfit] = useState<GananciasEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchGanancias = async () => {
    try {
      setLoading(true);
      const response = await getFetchWithCancel<GananciasEntity[]>(
        "/profit",
        "GET"
      );
      setProfit(response || []);
    } catch (error) {
      console.error("Error fetching ganancias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGanancias();
  }, []);

  return (
    <ProfitContext.Provider
      value={{
        profit,
        loading,
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
