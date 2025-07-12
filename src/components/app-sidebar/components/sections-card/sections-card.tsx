"use client";

import type { IResultRate } from "@/features/analytics/types/analitics.entity";
import { useAuth, useOrganization } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useGetClientsQuery } from "../../../../store/clients/api";
import { useGetProfitQuery } from "../../../../store/profit/api";
import "../../app.css";
import { DashboardCard } from "./dashboard-card";

interface DataForSeccionCard {
  resultGrowtRate: IResultRate | undefined;
}

interface DataForSeccion {
  totalProfit: number;
  members: number;
  totalClients: number;
}

export function SectionCards({ resultGrowtRate }: DataForSeccionCard) {
  const { data: clients } = useGetClientsQuery();
  const { organization } = useOrganization();
  const { data: profit } = useGetProfitQuery();
  const { isSignedIn } = useAuth();
  const [data, setData] = useState<DataForSeccion>({
    totalProfit: 0,
    members: 0,
    totalClients: 0,
  });

  useEffect(() => {
    if (!isSignedIn || !profit || !organization || !clients) return;

    const dateActual = new Date();
    const lastProfit = profit[0];

    const isSameDay =
      new Date(lastProfit.createdAt).toDateString() ===
      dateActual.toDateString();

    const totalProfit = isSameDay ? lastProfit.ganancia_total : 0;

    const members = organization.membersCount;
    const totalClients = clients.clientes.length;

    setData({
      totalProfit,
      members,
      totalClients,
    });
  }, [clients, profit, organization, isSignedIn]);

  const cardsData = [
    {
      title: "Total ventas",
      value: data.totalProfit ?? 0,
      percentage: 12.5,
      description: "Tendencias al alza este mes",
      subtitle: "Visitantes de los últimos 6 meses",
      type: "currency" as const,
    },
    {
      title: "Nuevos clientes",
      value: data.totalClients,
      percentage: -2,
      description: "Bajó un 2% este período de 6 meses",
      subtitle: "La adquisición necesita atención.",
      type: "number" as const,
    },
    {
      title: "Cuentas activas",
      value: data.members,
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
