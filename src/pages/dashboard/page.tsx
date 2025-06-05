import { ChartAreaInteractive } from "@/components/app-sidebar/components/chart-area";
import { SectionCards } from "@/components/app-sidebar/components/sections-card/sections-card";
import { useAuth } from "@clerk/clerk-react";
import { motion } from "motion/react";
import { useGetGrowtRateQuery } from "../../features/analytics/service/api";

export default function DashboardPage() {
  const { isSignedIn } = useAuth();
  const skip = !isSignedIn;
  const { data } = useGetGrowtRateQuery(undefined, { skip });
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
        <ChartAreaInteractive />
      </motion.div>
    </div>
  );
}
