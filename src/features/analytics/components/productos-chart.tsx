"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart } from "recharts";

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
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetAnaliticsProductsQuery } from "../service/api";
import IsLoadingComponent from "./IsLoadingComponent";

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-2))",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function ProductAnaliticComponent() {
  const { data, isLoading, isError } = useGetAnaliticsProductsQuery();

  if (isLoading) {
    return <IsLoadingComponent />;
  }

  if (isError || !data || data.length === 0) {
    return (
      <div className="p-4 text-red-500">
        No se pudieron cargar las analíticas.
      </div>
    );
  }

  // Selecciona la semana más reciente
  const latestWeek = [...data].sort((a, b) =>
    b.semana.localeCompare(a.semana)
  )[0];

  // Prepara los datos de esa semana: nombre y cantidad vendida
  const dataProduct = latestWeek.productos.map((p) => ({
    cantidad: p.cantidad,
    browser: p.producto,
    fill: chartConfig.chrome.color,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos más vendidos</CardTitle>
        <CardDescription>Semana: {latestWeek.semana}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={dataProduct}
            margin={{ top: 24, left: 24, right: 24 }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="Cantidad"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="cantidad"
              type="natural"
              stroke="var(--color-visitors)"
              strokeWidth={2}
              dot={{ fill: "var(--color-visitors)" }}
              activeDot={{ r: 6 }}
            >
              <LabelList
                position="top"
                offset={12}
                className="bg-amber-200"
                fontSize={12}
                dataKey="browser"
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tendencia al alza del 5,2% esta semana{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Top productos vendidos en la semana
        </div>
      </CardFooter>
    </Card>
  );
}
