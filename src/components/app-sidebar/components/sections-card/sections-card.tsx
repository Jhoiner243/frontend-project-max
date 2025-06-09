"use client";

import type { IResultRate } from "@/features/analytics/types/analitics.entity";
import "../../app.css";
import { DashboardCard } from "./dashboard-card";

interface DataForSeccionCard {
  resultGrowtRate: IResultRate | undefined;
}

export function SectionCards({ resultGrowtRate }: DataForSeccionCard) {
  const cardsData = [
    {
      title: "Total ventas",
      value: 1250.0,
      percentage: 12.5,
      description: "Tendencias al alza este mes",
      subtitle: "Visitantes de los últimos 6 meses",
      type: "currency" as const,
    },
    {
      title: "Nuevos clientes",
      value: 1234,
      percentage: -20,
      description: "Bajó un 20% este período",
      subtitle: "La adquisición necesita atención.",
      type: "number" as const,
    },
    {
      title: "Cuentas activas",
      value: 45678,
      percentage: 12.5,
      description: "Fuerte retención de usuarios",
      subtitle: "El compromiso supera los objetivos",
      type: "number" as const,
    },
  ];

  // Ensure resultGrowtRate has valid data
  const validGrowthRate = {
    porcentaje:
      typeof resultGrowtRate?.porcentaje === "number"
        ? resultGrowtRate.porcentaje
        : 0,
    fechaAnterior: resultGrowtRate?.fechaAnterior || "N/A",
    fechaActual: resultGrowtRate?.fechaActual || "N/A",
  };

  return (
    <div className="*:data-[slot=card]:shadow-xs  @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 lg:px-6 ">
      {/* Static cards with predefined data */}
      {cardsData.map((card, index) => (
        <DashboardCard
          key={index}
          title={card.title}
          value={card.value}
          percentage={card.percentage}
          description={card.description}
          subtitle={card.subtitle}
          type={card.type}
        />
      ))}

      {/* Dynamic growth rate card */}
      <DashboardCard
        title="Índice de crecimiento"
        value={validGrowthRate.porcentaje}
        percentage={validGrowthRate.porcentaje}
        description={`Rendimiento constante ${validGrowthRate.fechaActual}`}
        subtitle="Cumple con las proyecciones de crecimiento"
        type="percentage"
      />
    </div>
  );
}
