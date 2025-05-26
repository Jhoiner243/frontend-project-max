import { ChartAreaInteractive } from "@/components/app-sidebar/components/chart-area";
import { SectionCards } from "@/components/app-sidebar/components/sections-card/sections-card";
import { useGetGrowtRateQuery } from "../../features/analytics/service/api";

export default function DashboardPage() {
  const { data } = useGetGrowtRateQuery();

  if (!data) return [];
  return (
    <div>
      <div className="mx-auto">
        <SectionCards resultGrowtRate={data} />
      </div>
      <div className="px-4 lg:px-6 mt-10">
        <ChartAreaInteractive />
      </div>
    </div>
  );
}
