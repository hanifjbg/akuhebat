import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/Avatar"
import { Trophy, Star, Medal } from "lucide-react"
import { cn } from "../../shared/utils"

export interface LeaderboardEntry {
  id: string
  rank: number
  name: string
  avatarSrc?: string
  score: number
  isCurrentUser?: boolean
}

export interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
  title?: string
  className?: string
}

export function LeaderboardTable({ entries, title = "Papan Juara", className }: LeaderboardTableProps) {
  
  const getRankStyle = (rank: number) => {
    switch(rank) {
      case 1: return "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-400"
      case 2: return "bg-slate-100 dark:bg-slate-700/50 border-slate-300"
      case 3: return "bg-orange-100 dark:bg-orange-900/30 border-orange-300"
      default: return "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700"
    }
  }

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-500 max-w-[20px]" />
      case 2: return <Medal className="w-5 h-5 text-slate-400 fill-slate-300 max-w-[20px]" />
      case 3: return <Medal className="w-5 h-5 text-orange-400 fill-orange-300 max-w-[20px]" />
      default: return <span className="font-bold text-slate-400 w-5 text-center">{rank}</span>
    }
  }

  return (
    <div className={cn("w-full max-w-md bg-white dark:bg-slate-800 rounded-clay-lg p-6 shadow-clay-lg border-2 border-slate-100 dark:border-slate-700", className)}>
      <h2 className="text-xl font-bold flex items-center justify-center gap-2 mb-6 text-slate-800 dark:text-slate-100">
        <Trophy className="w-6 h-6 text-yellow-500 fill-yellow-500" />
        {title}
      </h2>

      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {entries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "flex items-center gap-4 p-3 rounded-clay-sm border-2 shadow-sm transition-transform hover:scale-[1.02]",
                getRankStyle(entry.rank),
                entry.isCurrentUser ? "shadow-clay-md border-primary ring-2 ring-primary ring-offset-1" : ""
              )}
            >
              <div className="flex items-center justify-center w-8">
                {getRankIcon(entry.rank)}
              </div>
              
              <Avatar className="w-10 h-10 border-2 border-white dark:border-slate-600 shadow-sm">
                <AvatarImage src={entry.avatarSrc} />
                <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 font-bold text-slate-800 dark:text-slate-100 truncate">
                {entry.name}
                {entry.isCurrentUser && <span className="text-xs text-primary ml-2 uppercase">(Kamu)</span>}
              </div>

              <div className="flex items-center gap-1 bg-white/50 dark:bg-slate-900/50 px-3 py-1 rounded-full font-bold text-sm">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                {entry.score.toLocaleString()}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
