"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@clerk/clerk-react";
import { format } from "date-fns";
import { useGetProfitQuery } from "../../../store/profit/api";
import { ChartAreaSkeleton } from "./skeleton-chart";

const chartConfig = {
  ganancia_total: {
    label: "Ganancias",
    color: "oklch(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const { isSignedIn } = useAuth();
  const skip = !isSignedIn;
  const {
    data: profit,
    isLoading,
    isFetching,
  } = useGetProfitQuery(undefined, { skip });

  const [timeRange, setTimeRange] = React.useState<
    "Diario" | "semanal" | "mensual" | "anual"
  >("Diario");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("Diario");
    }
  }, [isMobile]);
  if (!profit) return null;

  if (isLoading || isFetching) return <ChartAreaSkeleton />;

  const filteredData = profit
    .filter((item) => item.tipo_periodo === timeRange)
    .map((item) => ({
      ...item,
      fecha: item.createdAt, // Usar fecha_fin como punto de referencia
    }));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    switch (timeRange) {
      case "Diario":
        return format(date, "dd/MM");
      case "semanal": {
        // Get the week number of the year
        const weekNumber = Math.ceil(
          ((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) /
            86400000 +
            new Date(date.getFullYear(), 0, 1).getDay() +
            1) /
            7
        );
        return `Sem ${weekNumber}`;
      }
      case "mensual":
        return format(date, "MMM");
      case "anual":
        return format(date, "yyyy");
      default:
        return format(date, "dd/MM/yyyy");
    }
  };

  return (
    <>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardTitle>Ganancias totales</CardTitle>
          <CardDescription>
            Evolución de las ganancias en el periodo seleccionado
          </CardDescription>
          <div className="absolute right-4 top-4">
            <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={(
                value: "semanal" | "mensual" | "anual" | "Diario"
              ) => setTimeRange(value)}
              variant="outline"
              className="@[767px]/card:flex hidden"
            >
              <ToggleGroupItem value="Diario" className="h-8 px-2.5">
                Diario
              </ToggleGroupItem>
              <ToggleGroupItem value="semanal" className="h-8 px-2.5">
                Semanal
              </ToggleGroupItem>
              <ToggleGroupItem value="mensual" className="h-8 px-2.5">
                Mensual
              </ToggleGroupItem>
              <ToggleGroupItem value="anual" className="h-8 px-2.5">
                Anual
              </ToggleGroupItem>
            </ToggleGroup>
            <Select
              value={timeRange}
              onValueChange={(
                value: "Diario" | "semanal" | "mensual" | "anual"
              ) => setTimeRange(value)}
            >
              <SelectTrigger
                className="@[767px]/card:hidden flex w-40"
                aria-label="Seleccionar periodo"
              >
                <SelectValue placeholder="Seleccionar periodo" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="Diario" className="rounded-lg">
                  Diario
                </SelectItem>
                <SelectItem value="semanal" className="rounded-lg">
                  Semanal
                </SelectItem>
                <SelectItem value="mensual" className="rounded-lg">
                  Mensual
                </SelectItem>
                <SelectItem value="anual" className="rounded-lg">
                  Anual
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="4%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="fecha"
                tick={{ fontSize: 12 }}
                tickFormatter={formatDate}
              />
              <YAxis
                tickFormatter={(value: number) =>
                  new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    maximumFractionDigits: 0,
                  }).format(value)
                }
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => formatDate(value as string)}
                    formatter={(value) => [
                      new Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                      }).format((value as number) || 0),
                    ]}
                  />
                }
              />
              <Area
                dataKey="ganancia_total"
                type="monotone"
                fill="url(#fillProfit)"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
