import * as React from "react"
import { motion } from "framer-motion"
import { NavItem } from "../molecules/NavItem"
import { cn } from "../../shared/utils"
import { Home, Play, User, Trophy, Settings } from "lucide-react"

export interface BottomBarProps {
  activeTab: "home" | "play" | "profile" | "leaderboard" | "settings"
  onTabChange: (tab: any) => void
  className?: string
}

export function BottomBar({ activeTab, onTabChange, className }: BottomBarProps) {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-40 z-30 pointer-events-none backdrop-blur-md [mask-image:linear-gradient(to_top,black_40%,transparent_100%)]" />
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md h-[72px] px-2 sm:px-4 flex items-center justify-around z-40 transition-all duration-300",
          "bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-full shadow-clay-lg border-4 border-white dark:border-slate-700",
          className
        )}
      >
      <div className="flex items-center justify-between w-full h-full px-2">
        <NavItem
          icon={Home}
          label="Beranda"
          variant="vertical"
          isActive={activeTab === "home"}
          onClick={() => onTabChange("home")}
          className="flex-1 max-w-[72px]"
        />
        <NavItem
          icon={Play}
          label="Main"
          variant="vertical"
          isActive={activeTab === "play"}
          onClick={() => onTabChange("play")}
          className="flex-1 max-w-[72px]"
        />
        <NavItem
          icon={Trophy}
          label="Piala"
          variant="vertical"
          isActive={activeTab === "leaderboard"}
          onClick={() => onTabChange("leaderboard")}
          className="flex-1 max-w-[72px]"
        />
        <NavItem
          icon={User}
          label="Profil"
          variant="vertical"
          isActive={activeTab === "profile"}
          onClick={() => onTabChange("profile")}
          className="flex-1 max-w-[72px]"
        />
        <NavItem
          icon={Settings}
          label="Atur"
          variant="vertical"
          isActive={activeTab === "settings"}
          onClick={() => onTabChange("settings")}
          className="flex-1 max-w-[72px]"
        />
      </div>
    </motion.nav>
    </>
  )
}
