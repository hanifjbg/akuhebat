import * as React from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/Avatar"
import { Badge } from "../atoms/Badge"
import { ProgressBar } from "../atoms/ProgressBar"
import { Button } from "../atoms/Button"
import { CardHeader } from "../molecules/CardHeader"
import { User, Settings, Star } from "lucide-react"
import { cn } from "../../shared/utils"

export interface ProfileCardProps {
  userName: string
  avatarSrc?: string
  level: number
  exp: number
  nextLevelExp: number
  totalStars: number
  joinDate?: string
  onEditProfile?: () => void
  onSettings?: () => void
  className?: string
}

export function ProfileCard({ userName, avatarSrc, level, exp, nextLevelExp, totalStars, joinDate, onEditProfile, onSettings, className }: ProfileCardProps) {
  const expPercentage = Math.min(100, Math.round((exp / nextLevelExp) * 100));

  return (
    <div className={cn("w-full max-w-sm bg-white dark:bg-slate-800 rounded-clay-lg shadow-clay-lg border-2 border-slate-100 dark:border-slate-700 overflow-hidden", className)}>
      <CardHeader 
        title="Profil Anak" 
        icon={<User />} 
        action={
          onSettings && (
            <Button variant="ghost" size="icon" onClick={onSettings} className="rounded-full">
              <Settings className="w-5 h-5" />
            </Button>
          )
        }
      />
      
      <div className="p-6 flex flex-col items-center">
        <div className="relative mb-4 group cursor-pointer" onClick={onEditProfile}>
          <Avatar className="w-24 h-24 border-4 border-white dark:border-slate-700 shadow-clay-sm transition-transform group-hover:scale-105">
            <AvatarImage src={avatarSrc} />
            <AvatarFallback className="text-3xl">{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold font-sans tracking-wide">
            UBAH
          </div>
          <Badge variant="accent" className="absolute -bottom-2 translate-x-1/2 right-1/2 text-sm px-3 shadow-sm border-2 border-white dark:border-slate-800">
            Lv. {level}
          </Badge>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-2">{userName}</h2>
        {joinDate && <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Bergabung sejak {joinDate}</p>}

        <div className="w-full mt-8 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-inner flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-500" />
              </div>
              <div className="text-slate-600 dark:text-slate-300 font-semibold text-sm">Total Bintang</div>
            </div>
            <div className="text-xl font-black text-slate-800 dark:text-slate-100">
              {totalStars.toLocaleString()}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-inner">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-slate-600 dark:text-slate-300">Level {level}</span>
              <span className="text-slate-600 dark:text-slate-300">{exp} / {nextLevelExp} XP</span>
            </div>
            <ProgressBar progress={expPercentage} color="accent" className="h-3" />
            <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-3 font-medium">Bermain lagi untuk naik level!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
