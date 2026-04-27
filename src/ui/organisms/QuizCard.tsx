import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProgressBar } from "../atoms/ProgressBar"
import { Timer } from "../molecules/Timer"
import { QuizOption } from "../molecules/QuizOption"
import { cn } from "../../shared/utils"

export interface QuizCardProps {
  question: string
  imageUrl?: string
  options: { id: string; text: string; imageSrc?: string }[]
  selectedOptionId?: string
  correctOptionId?: string
  status: "idle" | "evaluating" | "result"
  timeLeft?: number
  onSelectOption: (id: string) => void
  className?: string
}

export function QuizCard({ 
  question, 
  imageUrl, 
  options, 
  selectedOptionId, 
  correctOptionId, 
  status, 
  timeLeft, 
  onSelectOption,
  className 
}: QuizCardProps) {
  
  const getOptionStatus = (id: string) => {
    if (status === "idle") return selectedOptionId === id ? "selected" : "idle";
    if (status === "evaluating") return selectedOptionId === id ? "selected" : "idle";
    
    // Result
    if (id === correctOptionId) return "correct";
    if (id === selectedOptionId && id !== correctOptionId) return "incorrect";
    return "idle";
  }

  return (
    <div className={cn("w-full max-w-3xl bg-white dark:bg-slate-800 rounded-clay-lg p-6 md:p-8 shadow-clay-lg border-4 border-slate-100 dark:border-slate-700 flex flex-col items-center", className)}>
      
      {/* Header Info */}
      {timeLeft !== undefined && (
        <div className="w-full flex items-center justify-end mb-4 gap-4">
          <Timer seconds={timeLeft} dangerThreshold={5} />
        </div>
      )}

      {/* Question */}
      <div className="text-center mb-6 space-y-4 flex-1 min-h-[140px] w-full flex flex-col justify-center">
        {imageUrl && (
          <div className="w-full max-w-xs aspect-video mx-auto flex-1 max-h-48 min-h-[100px] bg-slate-100 dark:bg-slate-900 rounded-clay-sm overflow-hidden border-2 border-white dark:border-slate-700 shadow-inner p-2">
            <img src={imageUrl} alt="Pertanyaan" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 leading-snug shrink-0">{question}</h2>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full mt-auto">
        <AnimatePresence>
          {options.map((opt, i) => (
            <motion.div
              key={opt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <QuizOption
                text={opt.text}
                imageSrc={opt.imageSrc}
                status={getOptionStatus(opt.id) as any}
                onClick={() => onSelectOption(opt.id)}
                disabled={status !== "idle"}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  )
}
