"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
import { useGetAnaliticsPedidosQuery } from "../service/api";
import IsLoadingComponent from "./IsLoadingComponent";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function PedidosAnaliticaComponent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { data: AnaliticsPedidos, isLoading } = useGetAnaliticsPedidosQuery();
  if (isLoading) return <IsLoadingComponent />;

  if (AnaliticsPedidos?.diario === undefined) return [];
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (AnaliticsPedidos.diario.length <= 7) {
      return `${date.toISOString().slice(5, 10)}`;
    }
    return `${date.toISOString().slice(8, 10)}`;
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={AnaliticsPedidos.diario} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="periodo"
              tickFormatter={formatDate}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) =>
                active && payload?.length ? (
                  <div className="bg-background p-2 border rounded">
                    <p>{payload[0].payload.periodo.slice(5, 10)}</p>
                    <p>Pedidos: {payload[0].value}</p>
                  </div>
                ) : null
              }
            />
            <Bar dataKey="pedidos" fill="var(--color-desktop)" radius={8}>
              <LabelList
                dataKey="pedidos"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tendencia al alza del 5,2% este mes <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando el total de visitantes de los últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  );
}
