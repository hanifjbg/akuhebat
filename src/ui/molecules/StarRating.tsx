import * as React from "react"
import { Star } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "../../shared/utils"

export interface StarRatingProps {
  max?: number
  value: number
  onChange?: (value: number) => void
  size?: "sm" | "md" | "lg"
  className?: string
}

export function StarRating({ max = 5, value, onChange, size = "md", className }: StarRatingProps) {
  
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }).map((_, i) => {
        const isFilled = i < value;
        return (
          <motion.div
            key={i}
            whileHover={onChange ? { scale: 1.1, rotate: [-5, 5, 0] } : {}}
            whileTap={onChange ? { scale: 0.9 } : {}}
            onClick={() => onChange?.(i + 1)}
            className={cn("cursor-pointer drop-shadow-sm", !onChange && "cursor-default")}
          >
            <Star 
              className={cn(
                sizeClasses[size],
                isFilled ? "fill-accent text-accent" : "fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700",
                "transition-colors duration-300"
              )} 
            />
          </motion.div>
        )
      })}
    </div>
  )
}
