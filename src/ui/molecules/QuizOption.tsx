import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../shared/utils"
import { Check } from "lucide-react"

export interface QuizOptionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  imageSrc?: string
  status?: "idle" | "selected" | "correct" | "incorrect"
}

export function QuizOption({ text, imageSrc, status = "idle", className, ...props }: QuizOptionProps) {
  
  const statusClasses = {
    idle: "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:shadow-clay-md hover:border-primary/50",
    selected: "bg-primary/10 border-primary text-primary shadow-clay-pressed relative",
    correct: "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-400 shadow-clay-pressed",
    incorrect: "bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-400 shadow-clay-pressed"
  }

  return (
    <motion.button
      whileHover={status === "idle" ? { scale: 1.02, y: -2 } : {}}
      whileTap={status === "idle" ? { scale: 0.98 } : {}}
      className={cn(
        "w-full rounded-clay p-4 flex flex-col items-center justify-center gap-3 border-4 shadow-clay-sm transition-all duration-300 min-h-[80px] sm:min-h-[100px]",
        statusClasses[status],
        className
      )}
      disabled={status !== "idle"}
      {...(props as any)}
    >
      {imageSrc && (
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden shadow-inner flex items-center justify-center p-2 mb-2 border-2 border-white dark:border-slate-600">
          <img src={imageSrc} alt={text} className="w-full h-full object-contain drop-shadow-md" />
        </div>
      )}
      <span className="font-bold text-xl drop-shadow-sm">{text}</span>
      
      {status === 'selected' && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center animate-bounce">
          <Check className="w-4 h-4 text-white" strokeWidth={3} />
        </div>
      )}
    </motion.button>
  )
}
