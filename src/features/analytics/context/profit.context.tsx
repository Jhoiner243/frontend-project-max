/* eslint-disable react-refresh/only-export-components */
import { getFetchWithCancel } from "@/hooks/use-fetch-cancel";
import { createContext, useContext, useEffect, useState } from "react";
import {
  ClientesAnalitica,
  PedidosAnalitica,
  ProductosAnalitica,
} from "../types/analitics.entity";

interface GananciasContext {
  loading: boolean;
  AnaliticsClient: ClientesAnalitica[];
  AnaliticsProducts: ProductosAnalitica[];
  AnaliticsPedidos: PedidosAnalitica[];
}

const AnaliticsContext = createContext<GananciasContext | null>(null);

export const AnaliticsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [AnaliticsClient, setAnaliticsClient] = useState<ClientesAnalitica[]>(
    []
  );
  const [AnaliticsProducts, setAnaliticsProducts] = useState<
    ProductosAnalitica[]
  >([]);
  const [AnaliticsPedidos, setAnaliticsPedidos] = useState<PedidosAnalitica[]>(
    []
  );

  const fetchAnaliticsProducts = async () => {
    try {
      setLoading(true);
      const response = await getFetchWithCancel<{
        productos: ProductosAnalitica[];
      }>("/analitics/productos", "GET");
      if (response === undefined) return;
      setAnaliticsProducts(response.productos);
    } catch (error) {
      console.error("Error fetching analiticas productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnaliticsPedidos = async () => {
    try {
      setLoading(true);
      const response = await getFetchWithCancel<{ diario: PedidosAnalitica[] }>(
        "/analitics/pedidos",
        "GET"
      );
      if (response?.diario) {
        setAnaliticsPedidos(response.diario);
      }
    } catch (error) {
      console.error("Error fetching analiticas pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnaliticsClient = async () => {
    try {
      setLoading(true);
      const response = await getFetchWithCancel<ClientesAnalitica[]>(
        "/analitics/clientes",
        "GET"
      );
      if (response) {
        // Procesar datos para aplanar la estructura
        const clientesData = response.map((week) => ({
          semana: week.semana,
          clientes: week.clientes.map((client) => ({
            cliente: client.cliente,
            pedidos: client.pedidos,
          })),
        }));
        setAnaliticsClient(clientesData);
      }
    } catch (error) {
      console.error("Error fetching analiticas clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnaliticsProducts();
    fetchAnaliticsPedidos();
    fetchAnaliticsClient();
  }, []);

  return (
    <AnaliticsContext.Provider
      value={{
        loading,
        AnaliticsClient,
        AnaliticsProducts,
        AnaliticsPedidos,
      }}
    >
      {children}
    </AnaliticsContext.Provider>
  );
};

export const useAnaliticsContext = () => {
  const context = useContext(AnaliticsContext);
  if (!context) {
    throw new Error("useAnaliticsContext must be used within a ProfitProvider");
  }
  return context;
};
