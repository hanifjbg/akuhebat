import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../shared/utils"

export interface BentoCardProps {
  className?: string;
  children: React.ReactNode;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  colorVariant?: 'default' | 'primary' | 'secondary' | 'accent' | 'warning' | 'success';
  onClick?: () => void;
}

export function BentoCard({ 
  className, 
  children, 
  colSpan = 1, 
  rowSpan = 1, 
  colorVariant = 'default',
  onClick
}: BentoCardProps) {
  
  const baseClasses = "relative rounded-[2rem] transition-transform duration-300 w-full";
  
  const heightClasses = {
    row: {
      1: "min-h-[140px] sm:min-h-[160px]",
      2: "min-h-[300px] sm:min-h-[340px]",
    }
  };

  const colorClasses = {
    default: "bg-white dark:bg-slate-800 border-[3px] border-white dark:border-slate-700 shadow-clay-md",
    primary: "bg-primary text-white border-[3px] border-pink-300 dark:border-pink-700 shadow-clay-md",
    secondary: "bg-secondary text-white border-[3px] border-blue-300 dark:border-blue-700 shadow-clay-md",
    accent: "bg-accent text-amber-900 border-[3px] border-yellow-200 dark:border-yellow-600 shadow-clay-md",
    warning: "bg-orange-400 text-white border-[3px] border-orange-300 dark:border-orange-600 shadow-clay-md",
    success: "bg-green-400 text-white border-[3px] border-green-300 dark:border-green-700 shadow-clay-md",
  };

  const spanClasses = {
    col: {
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-2 sm:col-span-3",
    },
    row: {
      1: "row-span-1",
      2: "row-span-2",
    }
  };

  const Component = onClick ? motion.button : motion.div;
  const interactiveProps = onClick ? {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98, y: 4 },
    onClick
  } : {};

  return (
    <div className={cn(
      "relative z-10 w-full", 
      spanClasses.col[colSpan],
      spanClasses.row[rowSpan],
      heightClasses.row[rowSpan],
      onClick ? "cursor-pointer" : ""
    )}>
       <Component
         className={cn(
           baseClasses,
           "h-full flex flex-col overflow-hidden",
           colorClasses[colorVariant],
           onClick ? "text-left focus:outline-none focus:ring-4 focus:ring-primary/30" : "",
           className
         )}
         {...interactiveProps}
       >
         {children}
       </Component>
    </div>
  )
}

export function BentoGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-4 sm:gap-6", className)}>
      {children}
    </div>
  )
}
