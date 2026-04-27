import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "../atoms/Button"
import { RefreshCcw, Check } from "lucide-react"
import { cn } from "../../shared/utils"

export interface TracingCanvasProps {
  targetChar: string
  progress: number // 0 to 100 percentage of tracing completion
  onReset: () => void
  onComplete?: () => void
  className?: string
}

export function TracingCanvas({ targetChar, progress, onReset, onComplete, className }: TracingCanvasProps) {
  const isComplete = progress >= 100;

  return (
    <div className={cn("w-full max-w-lg bg-white dark:bg-slate-800 rounded-clay-lg p-6 shadow-clay-lg border-4 border-slate-100 dark:border-slate-700 flex flex-col items-center gap-6", className)}>
      
      <div className="w-full flex justify-between items-center px-2">
        <div className="bg-slate-100 dark:bg-slate-700 px-4 py-1.5 rounded-full shadow-inner font-bold text-slate-500 dark:text-slate-300">
          Ikuti Garis!
        </div>
        <Button size="icon" variant="ghost" onClick={onReset} className="rounded-full bg-slate-50 dark:bg-slate-700">
          <RefreshCcw className="w-5 h-5" />
        </Button>
      </div>

      <div className="relative w-full aspect-square max-w-[300px] border-4 border-dashed border-slate-300 dark:border-slate-600 rounded-clay bg-slate-50 dark:bg-slate-900 flex items-center justify-center overflow-hidden cursor-crosshair">
        
        {/* Background Guide Letter */}
        <div className="absolute inset-0 flex items-center justify-center text-[250px] font-bold text-slate-200 dark:text-slate-700 select-none opacity-50">
          {targetChar}
        </div>

        {/* Progress simulation (In real app, this would be actual canvas drawing) */}
        <div className="absolute inset-0 flex items-center justify-center text-[250px] font-bold text-primary select-none pointer-events-none" style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}>
          {targetChar}
        </div>

        {isComplete && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 bg-green-500/20 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-4 text-green-600 dark:text-green-400 font-bold"
          >
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center shadow-clay-sm animate-bounce">
              <Check className="w-10 h-10" strokeWidth={4} />
            </div>
            Sempurna!
          </motion.div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner border border-slate-200 dark:border-slate-600">
        <motion.div 
          className="h-full bg-primary"
          style={{ width: `${progress}%` }}
        />
      </div>

      {isComplete && onComplete && (
        <Button variant="accent" size="lg" className="w-full" onClick={onComplete}>
          Lanjut
        </Button>
      )}
    </div>
  )
}
