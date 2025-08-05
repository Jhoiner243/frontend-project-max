import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { memo } from "react";
import { ProductEntity } from "../product.type";

// Componente memoizado para mejor rendimiento
export const ProductCard = memo(
  ({
    producto,
    selected,
    onClick,
    animationDelay,
  }: {
    animationDelay: string;
    producto: ProductEntity;
    selected: boolean;
    onClick: (id: string) => void;
  }) => {
    // Función de ayuda para el indicador de stock
    const getStockIndicatorClass = (stock: number) =>
      stock <= 10 ? "bg-red-500" : "bg-sky-500";
    if (producto.stock === 0) return;

    const cardVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
    };
    const delay = Number.parseFloat(animationDelay || "0s");
    return (
      <motion.div
        initial="hidden" // Set initial state
        animate="visible" // Animate to visible state
        variants={cardVariants} // Apply variants
        transition={{ duration: 0.2, delay: delay, ease: "easeIn" }} // Apply transition with delay
        style={{ animationDelay: animationDelay }}
      >
        <Card
          role="button"
          tabIndex={0}
          onClick={() => onClick(producto.id)}
          onKeyDown={(e) => e.key === "Enter" && onClick(producto.id)}
          className={cn(
            "w-[90px] h-[69px] cursor-pointer mb-6 mt-4 bg-transparent",
            selected && "ring-2 ring-primary "
          )}
        >
          <CardContent className="pr-1 pl-1 px-4 text-center">
            <CardTitle className="text-sm  truncate ">
              {producto.nombre}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 text-xs pl-2">
              <span>{producto.stock}</span>
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  getStockIndicatorClass(producto.stock)
                )}
              />
            </CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);
