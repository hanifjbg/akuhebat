import * as React from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/Avatar"
import { Progress } from "@radix-ui/react-progress"
import { Swords } from "lucide-react"
import { cn } from "../../shared/utils"

export interface PlayerStats {
  name: string
  avatarSrc?: string
  score: number
  isReady: boolean
  isCorrect?: boolean
}

export interface VersusPanelProps {
  player1: PlayerStats
  player2: PlayerStats // Can be opponent or AI
  timeRemaining?: number
  maxTime?: number
  className?: string
}

export function VersusPanel({ player1, player2, timeRemaining, maxTime = 30, className }: VersusPanelProps) {
  
  const timePercentage = timeRemaining !== undefined ? (timeRemaining / maxTime) * 100 : 100

  const renderPlayer = (player: PlayerStats, align: "left" | "right") => (
    <div className={cn("flex flex-col gap-2", align === "right" ? "items-end" : "items-start")}>
      <div className={cn("flex items-center gap-3", align === "right" ? "flex-row-reverse" : "")}>
        <div className="relative">
          <Avatar className={cn(
            "w-16 h-16 sm:w-20 sm:h-20 border-4 shadow-clay-sm",
            player.isCorrect === true ? "border-green-400 ring-4 ring-green-100" :
            player.isCorrect === false ? "border-red-400" :
            "border-white dark:border-slate-700"
          )}>
            <AvatarImage src={player.avatarSrc} />
            <AvatarFallback className="text-xl sm:text-2xl">{player.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {!player.isReady && (
            <div className="absolute inset-0 bg-slate-900/50 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white text-center leading-tight">Menunggu...</span>
            </div>
          )}
        </div>
        <div className={cn("flex flex-col", align === "right" ? "items-end" : "items-start")}>
          <span className="font-bold text-slate-800 dark:text-slate-100 sm:text-lg">{player.name}</span>
          <span className="text-2xl sm:text-4xl font-black text-primary drop-shadow-sm">{player.score}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className={cn("w-full max-w-4xl bg-white dark:bg-slate-800 rounded-clay-lg p-4 sm:p-6 shadow-clay-lg border-2 border-slate-100 dark:border-slate-700 relative overflow-hidden", className)}>
      
      {/* Background Decorative vs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none text-[200px] font-black italic text-slate-900 dark:text-white">
        VS
      </div>

      <div className="flex items-center justify-between relative z-10">
        {renderPlayer(player1, "left")}
        
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-clay-sm border-2 border-white/20">
            <Swords className="w-6 h-6" />
          </div>
          {timeRemaining !== undefined && (
            <div className="text-xl font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-clay-sm shadow-inner mt-2">
              00:{timeRemaining.toString().padStart(2, '0')}
            </div>
          )}
        </div>

        {renderPlayer(player2, "right")}
      </div>

      {/* Time Bar */}
      {timeRemaining !== undefined && (
        <div className="mt-6 w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner relative z-10 border border-slate-200 dark:border-slate-600">
          <motion.div 
            className="h-full bg-destructive"
            initial={{ width: "100%" }}
            animate={{ width: `${timePercentage}%` }}
            transition={{ ease: "linear", duration: 1 }}
          />
        </div>
      )}
    </div>
  )
}
