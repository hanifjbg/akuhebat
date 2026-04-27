import { motion } from "framer-motion"
import { cn } from "../../shared/utils"

export interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: "primary" | "white" | "current"
  className?: string
}

export function Spinner({ size = "md", color = "primary", className }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4"
  }

  const colorClasses = {
    primary: "border-primary/30 border-t-primary",
    white: "border-white/30 border-t-white",
    current: "border-current/30 border-t-current"
  }

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={cn(
        "rounded-full",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    />
  )
}
