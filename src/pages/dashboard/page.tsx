import { ChartAreaInteractive } from "@/components/app-sidebar/components/chart-area";
import { SectionCards } from "@/components/app-sidebar/components/sections-card/sections-card";
import { useAuth } from "@clerk/clerk-react";
import { useGetGrowtRateQuery } from "../../features/analytics/service/api";

export default function DashboardPage() {
  const { isSignedIn } = useAuth();
  const skip = !isSignedIn;
  const { data } = useGetGrowtRateQuery(undefined, { skip });
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
