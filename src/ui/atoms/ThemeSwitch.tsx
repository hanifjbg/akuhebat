import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../shared/utils"
import { Sun, Moon, Cloud, Star } from "lucide-react"
import { useSimulatorStore } from "../../shared/store/simulator"

export interface ThemeSwitchProps {
  className?: string;
  isDarkMode?: boolean;
  onChange?: (isDark: boolean) => void;
}

export function ThemeSwitch({ className, isDarkMode: controlledIsDark, onChange }: ThemeSwitchProps) {
  const { toggleDarkMode, isDarkMode: storeIsDark } = useSimulatorStore();
  
  const isDark = controlledIsDark !== undefined ? controlledIsDark : storeIsDark;
  
  const handleToggle = () => {
    if (onChange) {
      onChange(!isDark);
    } else {
      toggleDarkMode();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "relative w-24 h-11 rounded-full overflow-hidden transition-colors duration-500 shadow-[inset_0_3px_6px_rgba(0,0,0,0.4)] border border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-primary/30 flex-shrink-0 cursor-pointer",
        isDark ? "bg-slate-900 border-slate-800" : "bg-sky-300 border-sky-400",
        className
      )}
      aria-label="Toggle dark mode"
    >
      {/* Background Elements - Light Mode (Clouds) */}
      <motion.div 
        className="absolute inset-0 z-0 flex items-end justify-between px-1 pb-1 opacity-100"
        animate={{ opacity: isDark ? 0 : 1, y: isDark ? 10 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex gap-1 items-end ml-10">
           <Cloud className="w-5 h-5 text-white/90 fill-white" />
           <Cloud className="w-6 h-6 text-white/80 fill-white -mb-1 -ml-2" />
        </div>
      </motion.div>

      {/* Background Elements - Dark Mode (Stars) */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{ opacity: isDark ? 1 : 0, y: isDark ? 0 : -10 }}
        transition={{ duration: 0.4 }}
      >
        <Star className="absolute top-2 left-3 w-2 h-2 text-yellow-200 fill-yellow-200" />
        <Star className="absolute bottom-2 left-6 w-1.5 h-1.5 text-yellow-100 fill-yellow-100" />
        <Star className="absolute top-4 left-9 w-2.5 h-2.5 text-yellow-200 fill-yellow-200" />
      </motion.div>

      {/* The Knob */}
      <motion.div
        className={cn(
          "absolute top-1 left-1 w-9 h-9 rounded-full flex items-center justify-center z-10 shadow-clay-sm transition-colors duration-500",
          isDark ? "bg-slate-300" : "bg-yellow-400"
        )}
        animate={{ 
          x: isDark ? 52 : 0,
          rotate: isDark ? 180 : 0
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25 
        }}
      >
        {/* Inner detail of the knob */}
        {isDark ? (
          <div className="w-7 h-7 rounded-full bg-slate-800 absolute top-0.5 right-0.5" />
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-yellow-500/20 to-transparent" />
        )}
      </motion.div>
    </button>
  );
}
