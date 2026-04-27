import * as React from "react"
import { motion } from "framer-motion"
import { Star, Lock, Check, Sparkles } from "lucide-react"
import { cn } from "../../shared/utils"

export interface Level {
  id: string
  number: number
  status: "locked" | "current" | "completed"
  stars: number // 0 to 3
}

export interface LevelMapProps {
  levels: Level[]
  onSelectLevel: (level: Level) => void
  className?: string
}

export function LevelMap({ levels, onSelectLevel, className }: LevelMapProps) {
  // Let's create an adventurous vertical scroll map.
  return (
    <div className={cn("relative w-full max-w-sm mx-auto min-h-full py-12 flex flex-col items-center", className)}>
      
      {/* Background connecting SVG Path */}
      <div className="absolute inset-0 w-full flex justify-center z-0 pointer-events-none opacity-40">
        <svg viewBox="0 0 100 800" preserveAspectRatio="none" className="w-[150px] h-full stroke-slate-300 dark:stroke-slate-700 stroke-[4] fill-none stroke-dasharray-[12_12]">
          <path d="M 50,0 Q 100,100 50,200 T 50,400 T 50,600 T 50,800" />
        </svg>
      </div>
      
      <div className="flex flex-col-reverse items-center justify-end w-full gap-8 relative z-10 pb-[20dvh]">
        {/* We reverse the array so level 1 is at the bottom, level N is at the top */}
        {[...levels].map((lvl, idx) => {
          // idx goes from 0 (was level 1) upwards.
          // Sine wave for zigzag
          const isLeft = idx % 2 === 0;
          const translateX = isLeft ? -40 : 40;
          
          return (
            <motion.div
              key={lvl.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative flex flex-col items-center justify-center p-2 cursor-pointer w-32"
              style={{ transform: `translateX(${translateX}px)` }}
              onClick={() => {
                if (lvl.status !== "locked") onSelectLevel(lvl)
              }}
            >
              <div className="relative">
                {/* Level Node Button */}
                <motion.div
                  whileHover={lvl.status !== "locked" ? { scale: 1.05 } : {}}
                  whileTap={lvl.status !== "locked" ? { scale: 0.95 } : {}}
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center shadow-clay-md border-[5px] transition-all relative z-10",
                    lvl.status === "completed" ? "bg-gradient-to-tr from-green-300 to-green-400 border-green-100 shadow-[0_8px_0_0_#16a34a,inset_0_4px_8px_rgba(255,255,255,0.8)]" :
                    lvl.status === "current" ? "bg-gradient-to-tr from-yellow-300 to-orange-400 border-white shadow-[0_8px_0_0_#ea580c,inset_0_4px_8px_rgba(255,255,255,0.8)] animate-pulse-slow" :
                    "bg-slate-200 border-slate-300 opacity-90 cursor-not-allowed dark:bg-slate-800 dark:border-slate-700 shadow-[0_6px_0_0_#94a3b8]"
                  )}
                  style={lvl.status !== "locked" ? { 
                    transform: 'translateY(-4px)'
                  } : {}}
                >
                  {lvl.status === "completed" ? (
                    <Check className="w-10 h-10 text-white drop-shadow-md" strokeWidth={4} />
                  ) : lvl.status === "locked" ? (
                    <Lock className="w-8 h-8 text-slate-400/80 dark:text-slate-500" strokeWidth={3} />
                  ) : (
                    <span className="text-4xl font-black font-sans text-white drop-shadow-md">{lvl.number}</span>
                  )}
                </motion.div>

                {lvl.status === "current" && (
                   <motion.div 
                     animate={{ rotate: 360 }} 
                     transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                     className="absolute -top-4 -right-4 text-yellow-400 z-20 drop-shadow-xl"
                   >
                     <Sparkles className="w-8 h-8 fill-yellow-400" />
                   </motion.div>
                )}
              </div>

              {/* Stars for completed levels */}
              {lvl.status !== "locked" && (
                <div className="absolute -bottom-4 flex gap-0.5 bg-white/90 dark:bg-slate-800/90 px-3 py-1.5 rounded-full shadow-clay-sm border-2 border-slate-100 dark:border-slate-700 z-30 transform -translate-y-1">
                  {[1, 2, 3].map(starNum => (
                    <Star 
                      key={starNum} 
                      className={cn(
                        "w-4 h-4 transition-all duration-500", 
                        starNum <= lvl.stars 
                          ? "fill-yellow-400 text-yellow-500 drop-shadow-sm scale-110" 
                          : "fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-600 scale-90"
                      )} 
                      strokeWidth={2}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
      
    </div>
  )
}
