import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../shared/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/Avatar"
import { Badge } from "../atoms/Badge"
import { Star } from "lucide-react"

export interface TopBarProps {
  userName?: string
  avatarSrc?: string
  stars?: number
  level?: number
  greeting?: string
  title?: string
  onAvatarClick?: () => void
  onStarsClick?: () => void
  className?: string
  rightElement?: React.ReactNode
}

function getDynamicGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return "Selamat Pagi,";
  if (hour < 15) return "Selamat Siang,";
  if (hour < 18) return "Selamat Sore,";
  return "Selamat Malam,";
}

export function TopBar({ userName = "Si Anak Hebat!", avatarSrc, stars = 0, level = 1, greeting, title, onAvatarClick, onStarsClick, className, rightElement }: TopBarProps) {
  const [currentGreeting, setCurrentGreeting] = React.useState(greeting || getDynamicGreeting());

  React.useEffect(() => {
    if (!greeting) {
      setCurrentGreeting(getDynamicGreeting());
    }
  }, [greeting]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-32 z-30 pointer-events-none backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]" />
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md h-16 px-3 flex items-center justify-between z-40 transition-all duration-300",
          className
        )}
      >
      <div className="flex items-center gap-3 w-1/4">
        <button onClick={onAvatarClick} className="relative group focus:outline-none shrink-0">
          <Avatar className="w-12 h-12 border-2 border-white dark:border-slate-700 shadow-clay-sm transition-transform group-hover:scale-105 group-active:scale-95">
            <AvatarImage src={avatarSrc} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <Badge className="absolute -bottom-2 -right-2 font-bold shadow-sm" variant="accent">
            Lv{level}
          </Badge>
        </button>
        {!title && (
          <div className="flex flex-col">
            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 drop-shadow-sm">{currentGreeting}</p>
            <h2 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100 drop-shadow-md leading-tight">{userName}</h2>
          </div>
        )}
      </div>

      {title && (
        <div className="absolute left-1/2 -translate-x-1/2 w-1/2 text-center pointer-events-none">
          <h2 className="font-black text-lg text-slate-800 dark:text-slate-100 drop-shadow-md leading-tight truncate">{title}</h2>
        </div>
      )}

      <div className="flex justify-end w-1/4">
      {rightElement ? (
         rightElement
      ) : (
         <button onClick={onStarsClick} className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border-2 border-yellow-400 text-yellow-700 dark:text-yellow-400 font-bold shadow-clay-sm hover:shadow-clay-md transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
          <span className="text-lg">{stars.toLocaleString()}</span>
        </button>
      )}
      </div>
    </motion.header>
    </>
  )
}
