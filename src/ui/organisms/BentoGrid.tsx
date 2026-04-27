import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../shared/utils"

import { Lock } from "lucide-react"

export interface BentoCardProps {
  className?: string;
  children: React.ReactNode;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  colorVariant?: 'default' | 'primary' | 'secondary' | 'accent' | 'warning' | 'success';
  onClick?: () => void;
  overlapElement?: React.ReactNode;
  isLocked?: boolean;
}

export function BentoCard({ 
  className, 
  children, 
  colSpan = 1, 
  rowSpan = 1, 
  colorVariant = 'default',
  onClick,
  isLocked
}: BentoCardProps) {
  
  const baseClasses = "relative rounded-[2rem] transition-all duration-300 w-full";
  
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

  const Component = (onClick && !isLocked) ? motion.button : motion.div;
  const interactiveProps = (onClick && !isLocked) ? {
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
      (onClick && !isLocked) ? "cursor-pointer" : ""
    )}>
       <Component
         className={cn(
           baseClasses,
           "h-full flex flex-col overflow-hidden",
           colorClasses[colorVariant],
           (onClick && !isLocked) ? "text-left focus:outline-none focus:ring-4 focus:ring-primary/30" : "",
           isLocked && "opacity-60 saturate-50 grayscale-[30%]",
           className
         )}
         {...interactiveProps}
       >
         {children}

         {isLocked && (
           <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] flex items-center justify-center z-50">
              <div className="bg-slate-800/80 text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg scale-90 sm:scale-100">
                <Lock className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">Locked</span>
              </div>
           </div>
         )}
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
