import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, Lock, MessageCircle, ShoppingCart } from "lucide-react";
import { useEffect, useRef } from "react";

export function PedidosProximamente() {
  // Datos simulados de pedidos para crear la silueta
  const pedidosSimulados = [
    {
      id: "#001",
      cliente: "María González",
      items: ["Pizza Margherita", "Coca Cola", "Papas Fritas"],
      total: "$25.50",
      estado: "Pendiente",
      telefono: "+1234567890",
    },
    {
      id: "#002",
      cliente: "Carlos Rodríguez",
      items: ["Hamburguesa Clásica", "Agua", "Ensalada"],
      total: "$18.75",
      estado: "En preparación",
      telefono: "+1234567891",
    },
    {
      id: "#003",
      cliente: "Ana Martínez",
      items: ["Tacos x3", "Refresco", "Guacamole"],
      total: "$22.00",
      estado: "Listo",
      telefono: "+1234567892",
    },
  ];

  const refInterView = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (refInterView.current) {
      refInterView.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Contenido desenfocado - Lista de pedidos */}
      <div className="blur-[8px]  opacity-30 pointer-events-none select-none">
        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <ShoppingCart className="h-6 w-6" />
              Gestión de Pedidos
            </h2>
            <Badge variant="secondary">3 pedidos activos</Badge>
          </div>
          <div
            ref={refInterView}
            className="absolute h-screen justify-center"
          />

          {pedidosSimulados.map((pedido) => (
            <Card key={pedido.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{pedido.id}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{pedido.cliente}</h3>
                      <p className="text-sm text-muted-foreground">
                        Pedido {pedido.id}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      pedido.estado === "Listo" ? "default" : "secondary"
                    }
                    className="gap-1"
                  >
                    <Clock className="h-3 w-3" />
                    {pedido.estado}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Artículos:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {pedido.items.map((item, index) => (
                        <li key={index} className="flex justify-between">
                          <span>• {item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between  border-t">
                    <div className="text-lg font-semibold">{pedido.total}</div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Ver detalles
                      </Button>
                      <Button size="sm" className="gap-2">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Overlay "Próximamente" */}
      <div className="absolute  inset-0 flex items-center justify-center  ">
        <Card className="w-full max-w-md mx-4 border-2 border-dashed border-primary/30">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Próximamente</h3>
            <p className="text-muted-foreground mb-4">
              Sistema completo de gestión de pedidos con integración directa a
              WhatsApp
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                <span>Gestión de pedidos en tiempo real</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>Integración automática con WhatsApp</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Seguimiento de estados</span>
              </div>
            </div>
            <Badge variant="outline" className="mt-4">
              Disponible Q2 2025
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
