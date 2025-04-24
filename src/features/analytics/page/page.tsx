import { ChartAreaInteractive } from "@/components/app-sidebar/components/chart-area";
import { ClientAnaliticComponent } from "../components/clientes-chart";
import { PedidosAnaliticaComponent } from "../components/pedidos-chart";
import { ProductAnaliticComponent } from "../components/productos-chart";
import {
  AnaliticsProvider,
  useAnaliticsContext,
} from "../context/profit.context";

export default function AnaliticaPage() {
  const { AnaliticsClient } = useAnaliticsContext();
  return (
    <AnaliticsProvider>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Analíticas</h1>

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
              <ClientAnaliticComponent clientes={AnaliticsClient} />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-sm">
          <ChartAreaInteractive />
        </div>
      </div>
    </AnaliticsProvider>
  );
}
