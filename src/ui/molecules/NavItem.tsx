import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../shared/utils"
import { LucideIcon } from "lucide-react"

export interface NavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  label: string
  isActive?: boolean
  variant?: "horizontal" | "vertical"
}

export function NavItem({ icon: Icon, label, isActive, variant = "horizontal", className, ...props }: NavItemProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "flex items-center gap-2 transition-colors focus:outline-none",
        variant === "horizontal" 
          ? "px-4 py-2 rounded-full" 
          : "flex-col justify-center items-center w-14 h-14 rounded-2xl relative",
        isActive && variant === "horizontal" && "bg-primary/10 text-primary shadow-none",
        isActive && variant === "vertical" && "text-primary",
        !isActive && "bg-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
        className
      )}
      {...(props as any)}
    >
      {isActive && variant === "vertical" && (
        <motion.div 
          layoutId="nav-indicator"
          className="absolute inset-[6px] bg-primary/15 dark:bg-primary/25 rounded-xl block z-0"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <Icon className={cn("relative z-10", variant === "horizontal" ? "w-5 h-5" : "w-6 h-6", isActive ? "text-primary drop-shadow-sm" : "text-slate-400 dark:text-slate-500")} strokeWidth={isActive ? 2.5 : 2} />
    </motion.button>
  )
}
