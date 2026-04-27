import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "../atoms/Button"
import { StarRating } from "../molecules/StarRating"
import { cn } from "../../shared/utils"
import { Trophy, Star, RefreshCcw, ArrowRight } from "lucide-react"

export interface QuizReportProps {
  score: number // 10 to 100
  stars: number // 0 to 5
  expGained: number
  onRetry: () => void
  onNext: () => void
  className?: string
}

export function QuizReport({ score, stars, expGained, onRetry, onNext, className }: QuizReportProps) {
  // Custom message based on score
  let message = "Coba Lagi!";
  if (score >= 80) message = "Luar Biasa!";
  else if (score >= 50) message = "Kerja Bagus!";

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn("w-full max-w-sm bg-white dark:bg-slate-800 rounded-clay-lg p-8 shadow-clay-lg border-4 border-slate-100 dark:border-slate-700 flex flex-col items-center text-center", className)}
    >
      <div className="relative w-32 h-32 mb-6">
        <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-30 animate-pulse" />
        <div className="relative w-full h-full bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center border-4 border-yellow-400 shadow-[inset_0_-8px_16px_rgba(250,204,21,0.4)]">
          <Trophy className="w-16 h-16 text-yellow-500" strokeWidth={1.5} />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{message}</h2>
      
      <div className="mb-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl w-full p-4 border border-slate-100 dark:border-slate-700 shadow-inner">
        <div className="flex justify-between items-end mb-4">
          <div className="text-slate-500 font-semibold dark:text-slate-400">Skor Kamu</div>
          <div className="text-4xl font-black text-primary drop-shadow-sm">{score}<span className="text-lg text-slate-400">/100</span></div>
        </div>
        
        <div className="flex flex-col items-center gap-2 mb-2">
          <StarRating value={stars} max={5} size="lg" />
        </div>

        {expGained > 0 && (
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-1 mt-4 px-3 py-1 bg-green-100 border-2 border-green-400 text-green-700 font-bold rounded-full text-sm shadow-sm"
          >
            <Star className="w-4 h-4 fill-green-500 text-green-500" />
            +{expGained} EXP!
          </motion.div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-3">
        <Button variant="secondary" size="lg" className="flex-1 flex gap-2" onClick={onRetry}>
          <RefreshCcw className="w-5 h-5" />
          Ulangi
        </Button>
        <Button variant="accent" size="lg" className="flex-1 flex gap-2" onClick={onNext}>
          Lanjut
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  )
}
