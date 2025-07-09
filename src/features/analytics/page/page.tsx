import { ChartAreaInteractive } from "@/components/app-sidebar/components/chart-area";
import { useEffect } from "react";
import { toast } from "sonner";
import { ClientAnaliticComponent } from "../components/clientes-chart";
import { PedidosAnaliticaComponent } from "../components/pedidos-chart";
import { ProductAnaliticComponent } from "../components/productos-chart";
import {
  useGetAnaliticsClientQuery,
  useGetAnaliticsPedidosQuery,
  useGetAnaliticsProductsQuery,
} from "../service/api";

export default function AnaliticaPage() {
  const { data: pedidos } = useGetAnaliticsPedidosQuery();
  const { data: clientes } = useGetAnaliticsClientQuery();
  const { data: productos } = useGetAnaliticsProductsQuery();

  useEffect(() => {
    if (pedidos && clientes && productos) {
      if (
        pedidos.diario.length === 0 &&
        clientes.length === 0 &&
        productos.length === 0
      ) {
        toast.info("No hay datos para mostrar", {
          description: "Agrega datos para ver las estadísticas",
          style: {
            backgroundColor: "transparent",
            color: "white",
            position: "initial",
          },
        });
      }
    }
  }, [pedidos, clientes, productos]);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-6">
          <div className="bg-card rounded-xl shadow-sm">
            <PedidosAnaliticaComponent
              description="Pedidos por día"
              title="Pedidos por día"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-card rounded-xl shadow-sm">
            <ProductAnaliticComponent />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-xl shadow-sm">
            <ClientAnaliticComponent />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm">
        <ChartAreaInteractive />
      </div>
    </div>
  );
}
