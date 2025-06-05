import { motion } from "framer-motion";
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};
export function Framet() {
  return (
    <div className="flex justify-center text-amber-50 text-2xl font-semibold items-center h-screen bg-black">
      <motion.ul variants={container} initial="hidden" animate="show">
        HOLAAAAAAAAA
        <motion.li variants={item}>Nada</motion.li>
        <motion.li variants={item}>Aqui</motion.li>
        <motion.li variants={item}>Que mas</motion.li>
      </motion.ul>
    </div>
  );
}
