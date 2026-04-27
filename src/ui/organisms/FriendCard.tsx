import * as React from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/Avatar"
import { Button } from "../atoms/Button"
import { Swords, Plus, Trash2 } from "lucide-react"
import { cn } from "../../shared/utils"

export interface FriendCardProps {
  friendId: string
  name: string
  avatarSrc?: string
  level: number
  status: "online" | "offline" | "playing"
  relation: "friend" | "pending" | "stranger"
  onChallenge?: () => void
  onAddFriend?: () => void
  onRemoveFriend?: () => void
  className?: string
}

export function FriendCard({ name, avatarSrc, level, status, relation, onChallenge, onAddFriend, onRemoveFriend, className }: FriendCardProps) {
  
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-slate-300 dark:bg-slate-600",
    playing: "bg-accent animate-pulse"
  }

  const statusText = {
    online: "Tersedia",
    offline: "Tidur",
    playing: "Sedang Main"
  }

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={cn("bg-white dark:bg-slate-800 rounded-clay p-4 flex items-center justify-between gap-4 border-4 border-slate-100 dark:border-slate-700 shadow-clay-sm", className)}
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="w-14 h-14 border-2 border-white dark:border-slate-600 shadow-sm">
            <AvatarImage src={avatarSrc} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className={cn("absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800", statusColors[status])} />
        </div>
        
        <div>
          <h3 className="font-bold text-slate-800 dark:text-slate-100">{name}</h3>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
            <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full text-slate-700 dark:text-slate-300">Lv.{level}</span>
            <span className="flex items-center gap-1">
              <span className={cn("w-1.5 h-1.5 rounded-full", statusColors[status])} />
              {statusText[status]}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {relation === "stranger" && onAddFriend && (
          <Button size="icon" variant="primary" onClick={onAddFriend} className="rounded-full shadow-clay-sm">
            <Plus className="w-4 h-4" />
          </Button>
        )}
        
        {relation === "friend" && (
          <>
            {status !== "offline" && onChallenge && (
              <Button size="sm" variant="accent" onClick={onChallenge} className="shadow-clay-sm gap-1 hidden sm:flex font-bold">
                <Swords className="w-4 h-4" />
                Tantang!
              </Button>
            )}
            {status !== "offline" && onChallenge && (
              <Button size="icon" variant="accent" onClick={onChallenge} className="shadow-clay-sm sm:hidden rounded-full font-bold">
                <Swords className="w-4 h-4" />
              </Button>
            )}
            
            {onRemoveFriend && (
              <Button size="icon" variant="ghost" onClick={onRemoveFriend} className="rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 hover:text-red-600 dark:text-red-400">
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}
