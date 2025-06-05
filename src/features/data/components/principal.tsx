import { motion } from "motion/react";
import { PedidosProximamente } from "../components/proximamente";

export default function ProximamentePage() {
  return (
    <main className="min-h-screen  ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="container mx-auto px-4"
      >
        <PedidosProximamente />
      </motion.div>
    </main>
  );
}
