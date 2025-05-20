"use client";

import { motion } from "framer-motion";

export function SpotlightNewDemo() {
  return (
    <div className=" w-full rounded-md antialiased ">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 10, y: 30 }}
          animate={{ opacity: 1, y: 1 }}
          className="text-2xl font-semibold"
          style={{ opacity: 1, transform: "translateY(1px)" }}
        >
          Hello there!
        </motion.h1>
        <motion.p
          initial={{ opacity: 1, y: 30 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 30, y: 30 }}
          animate={{ opacity: 1, y: 2 }}
          className="text-2xl text-zinc-500"
          style={{ opacity: 1, transform: "none" }}
        >
          How can I help you today?
        </motion.p>
      </div>
    </div>
  );
}
