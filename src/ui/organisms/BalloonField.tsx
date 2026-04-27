import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../shared/utils"

export interface Balloon {
  id: string
  text: string
  color: "red" | "blue" | "green" | "yellow" | "purple"
  x: number // 0 to 100 percentage
  speed: number // seconds to float up
  isTarget?: boolean
}

export interface BalloonFieldProps {
  balloons: Balloon[]
  onPop: (balloon: Balloon) => void
  disabled?: boolean
  className?: string
}

export function BalloonField({ balloons, onPop, disabled, className }: BalloonFieldProps) {
  
  const colors = {
    red: "bg-red-500 before:bg-red-400 after:border-b-red-600",
    blue: "bg-blue-500 before:bg-blue-400 after:border-b-blue-600",
    green: "bg-green-500 before:bg-green-400 after:border-b-green-600",
    yellow: "bg-yellow-400 before:bg-yellow-300 after:border-b-yellow-500",
    purple: "bg-purple-500 before:bg-purple-400 after:border-b-purple-600",
  }

  return (
    <div className={cn("relative w-full h-[500px] overflow-hidden bg-sky-100 dark:bg-slate-900 rounded-clay-lg border-4 border-slate-200 dark:border-slate-800 shadow-inner", className)}>
      {/* Background clouds could go here */}
      
      <AnimatePresence>
        {balloons.map((b) => (
          <motion.div
            key={b.id}
            initial={{ y: 550, x: `${b.x}%` }}
            animate={{ 
              y: -150, 
              x: [`${b.x}%`, `${b.x - 5}%`, `${b.x + 5}%`, `${b.x}%`] 
            }}
            transition={{ 
              y: { duration: b.speed, ease: "linear" },
              x: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            exit={{ scale: 1.5, opacity: 0, transition: { duration: 0.2 } }}
            className="absolute bottom-0 left-0"
            onClick={() => !disabled && onPop(b)}
          >
            <div className="relative cursor-pointer group hover:scale-110 transition-transform">
              {/* Balloon Body */}
              <div className={cn(
                "w-20 h-24 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.2)] flex items-center justify-center p-2 text-center",
                // Highlight reflective spot
                "before:content-[''] before:absolute before:w-4 before:h-8 before:rounded-[50%] before:top-2 before:left-3 before:-rotate-45 before:opacity-60",
                // Knot at bottom
                "after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:border-l-[6px] after:border-r-[6px] after:border-b-[10px] after:border-l-transparent after:border-r-transparent",
                colors[b.color]
              )}>
                <span className="font-bold text-white text-xl drop-shadow-md z-10">{b.text}</span>
              </div>
              {/* String */}
              <div className="absolute top-24 left-1/2 w-0.5 h-16 bg-white/50 -translate-x-1/2" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
