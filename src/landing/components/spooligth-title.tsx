import { motion } from "framer-motion";

export function SpotlightPreview() {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-6xl lg:text-9xl xl:text-[8rem] font-bold mb-8 leading-none mt-[100px] ml-[6%] tracking-tight "
      >
        <span className=" bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
          Fill
        </span>
        <span className="bg-gradient-to-r from-white/40 via-gray-400 to-white/40 bg-clip-text text-transparent ml-4">
          Step
        </span>
      </motion.h1>
    </div>
  );
}
