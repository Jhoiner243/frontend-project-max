"use client";

import { motion } from "framer-motion";

export function SpotlightNewDemo() {
  return (
    <div className=" w-full rounded-md antialiased ">
      <div className="mx-auto w-3xl justify-item-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 10, y: 30 }}
          animate={{ opacity: 1, y: 1 }}
          className="text-4xl md:text-3xl font-semibold text-left bg-clip-text  "
        >
          Hello there!
        </motion.h1>
        <motion.p
          initial={{ opacity: 1, y: 30 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 30, y: 30 }}
          animate={{ opacity: 1, y: 2 }}
          className="md:text-2xl bg-gradient-to-b from-neutral-400 to-neutral-700 bg-clip-text text-transparent font-semibold text-left"
        >
          How can I help you today?
        </motion.p>
      </div>
    </div>
  );
}
