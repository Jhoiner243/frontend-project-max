"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { ClientesAnalitica } from "../types/analitics.entity";

// Configuración del gráfico
const chartConfig = {
  clientes: {
    label: "Clientes",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// Función para procesar los datos
const procesarDatosClientes = (datos: ClientesAnalitica[]) => {
  const totalPedidosPorCliente = new Map<string, number>();

  datos.forEach((semana) => {
    semana.clientes.forEach((cliente) => {
      const totalActual = totalPedidosPorCliente.get(cliente.cliente) || 0;
      totalPedidosPorCliente.set(
        cliente.cliente,
        totalActual + cliente.pedidos
      );
    });
  });

  return Array.from(totalPedidosPorCliente.entries())
    .map(([cliente, pedidos]) => ({ cliente, pedidos }))
    .sort((a, b) => b.pedidos - a.pedidos);
};

export function ClientAnaliticComponent({
  clientes,
}: {
  clientes: ClientesAnalitica[];
}) {
  const datosProcesados = procesarDatosClientes(clientes);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clientes más frecuentes</CardTitle>
        <CardDescription>Total de pedidos por cliente</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            layout="vertical"
            data={datosProcesados}
            margin={{ left: 0 }}
            width={500}
            height={300}
          >
            <YAxis
              dataKey="cliente"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis type="number" hide domain={[0, "dataMax + 2"]} />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload?.[0]) {
                  return (
                    <div className="bg-background p-2 rounded-md border">
                      <p className="font-medium">
                        {payload[0].payload.cliente}
                      </p>
                      <p>Total pedidos: {payload[0].value}</p>
                      <p>
                        Promedio semanal:{" "}
                        {payload[0]?.value && clientes?.length
                          ? (
                              Number(payload[0].value) / clientes.length
                            ).toFixed(1)
                          : "N/A"}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="pedidos"
              fill="hsl(var(--chart-1))"
              radius={5}
              barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 items-center font-medium">
          <TrendingUp className="h-4 w-4 text-green-500" />
          Clientes más activos
        </div>
        <div className="text-muted-foreground">
          Basado en el total de {clientes.length} semanas analizadas
        </div>
      </CardFooter>
    </Card>
  );
}
