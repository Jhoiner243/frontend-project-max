import { ChartAreaInteractive } from "@/components/app-sidebar/components/chart-area";
import { SectionCards } from "@/components/app-sidebar/components/sections-card/sections-card";
import { useAuth } from "@clerk/clerk-react";
import { motion } from "motion/react";
import { ChartAreaSkeleton } from "../../components/app-sidebar/components/skeleton-chart";
import { useGetGrowtRateQuery } from "../../features/analytics/service/api";
import { useGetProfitQuery } from "../../store/profit/api";

export default function DashboardPage() {
  const { isSignedIn } = useAuth();
  const skip = !isSignedIn;
  const { data } = useGetGrowtRateQuery(undefined, {
    skip,
  });

  const { isLoading } = useGetProfitQuery();
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className="mx-auto"
      >
        <SectionCards resultGrowtRate={data} />
      </motion.div>
      <motion.div
        className="px-4 lg:px-6 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 2 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {isLoading && <ChartAreaSkeleton />}
        <ChartAreaInteractive />
      </motion.div>
    </div>
  );
}
