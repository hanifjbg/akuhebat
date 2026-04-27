import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProgressBar } from "../atoms/ProgressBar"
import { cn } from "../../shared/utils"

export type ArrowDirection = "up" | "down" | "left" | "right" | "clap"

export interface DanceScreenProps {
  currentMove: ArrowDirection
  nextMove?: ArrowDirection
  beatPulse: boolean // Toggle to create rhythmic pulsing
  isActive: boolean
  className?: string
}

export function DanceScreen({ currentMove, nextMove, beatPulse, isActive, className }: DanceScreenProps) {
  
  const moveConfig = {
    up: { icon: "⬆️", color: "bg-blue-500", text: "ATAS!" },
    down: { icon: "⬇️", color: "bg-purple-500", text: "BAWAH!" },
    left: { icon: "⬅️", color: "bg-yellow-400", text: "KIRI!" },
    right: { icon: "➡️", color: "bg-green-500", text: "KANAN!" },
    clap: { icon: "👏", color: "bg-accent", text: "TEPUK!" }
  }

  const current = moveConfig[currentMove];

  return (
    <div className={cn("w-full max-w-sm aspect-[3/4] bg-slate-900 rounded-clay-lg p-4 shadow-clay-lg border-8 border-slate-800 flex flex-col overflow-hidden relative", className)}>
      
      {/* Disco Floor Grid */}
      <div className="absolute inset-0 z-0 grid grid-cols-4 grid-rows-6 opacity-20">
        {[...Array(24)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ 
              opacity: isActive ? [0.2, 0.8, 0.2] : 0.2,
              backgroundColor: isActive ? ["#3b82f6", "#eab308", "#22c55e", "#ec4899"][i % 4] : "#ffffff"
            }}
            transition={{ repeat: Infinity, duration: 1 + Math.random(), delay: Math.random() }}
            className="border border-white/10"
          />
        ))}
      </div>

      {/* Main Display Area */}
      <div className="flex-1 relative z-10 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentMove + Date.now()} // Force re-render for animation on same move
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{ 
              scale: beatPulse ? 1.2 : 1, 
              y: 0, 
              opacity: 1,
              rotate: currentMove === 'left' ? -10 : currentMove === 'right' ? 10 : 0
            }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn("w-40 h-40 rounded-3xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] border-4 border-white/20 mb-8", current.color)}
          >
            <span className="text-6xl filter drop-shadow-md">{current.icon}</span>
          </motion.div>
        </AnimatePresence>

        <motion.h2 
          key={`text-${currentMove}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, scale: beatPulse ? 1.1 : 1 }}
          className="text-4xl font-black text-white italic tracking-wider drop-shadow-lg"
        >
          {current.text}
        </motion.h2>
      </div>

      {/* Next Move Preview */}
      <div className="relative z-10 bg-black/40 rounded-2xl p-4 border border-white/10 backdrop-blur flex items-center justify-between">
        <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">Berikutnya</span>
        {nextMove ? (
          <div className="flex items-center gap-2">
            <span className="text-2xl">{moveConfig[nextMove].icon}</span>
            <span className="text-white font-bold">{moveConfig[nextMove].text}</span>
          </div>
        ) : (
          <span className="text-slate-500 font-bold">-</span>
        )}
      </div>
    </div>
  )
}
