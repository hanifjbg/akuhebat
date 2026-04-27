import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../shared/utils"

export interface WordBuilderProps {
  targetWord: string
  selectedLetters: (string | null)[] // null for empty slots
  availableLetters: { id: string; letter: string; isUsed: boolean }[]
  onSelectLetter: (id: string, letter: string) => void
  onRemoveLetter: (index: number) => void
  className?: string
}

export function WordBuilder({ targetWord, selectedLetters, availableLetters, onSelectLetter, onRemoveLetter, className }: WordBuilderProps) {
  
  // Ensure we have exact number of slots as target word length
  const slots = Array.from({ length: targetWord.length }).map((_, i) => selectedLetters[i] || null);

  return (
    <div className={cn("w-full max-w-2xl flex flex-col items-center gap-8 p-6 bg-slate-50/50 dark:bg-slate-800/40 rounded-clay-lg shadow-inner border border-slate-100 dark:border-slate-800", className)}>
      
      {/* Slots Area */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 p-4 rounded-2xl bg-white/80 dark:bg-slate-900/50 backdrop-blur min-h-[100px] w-full border-2 border-dashed border-slate-300 dark:border-slate-700 shadow-sm">
        <AnimatePresence>
          {slots.map((letter, index) => (
            <motion.div
              layout
              key={`slot-${index}`}
              className={cn(
                "w-14 h-16 md:w-20 md:h-24 rounded-clay flex items-center justify-center text-3xl md:text-5xl font-black border-4 transition-all drop-shadow-md",
                letter 
                  ? "bg-accent dark:bg-accent-foreground text-white dark:text-accent border-accent dark:border-accent-foreground shadow-clay-sm cursor-pointer" 
                  : "bg-white/30 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700 shadow-inner"
              )}
              onClick={() => letter && onRemoveLetter(index)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {letter}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Available Letters Rack */}
      <div className="w-full p-6 bg-primary/10 dark:bg-slate-800 rounded-clay flex flex-wrap justify-center gap-3">
        {availableLetters.map((item) => (
          <motion.button
            key={item.id}
            whileHover={!item.isUsed ? { scale: 1.1, y: -5 } : {}}
            whileTap={!item.isUsed ? { scale: 0.9 } : {}}
            disabled={item.isUsed}
            onClick={() => !item.isUsed && onSelectLetter(item.id, item.letter)}
            className={cn(
              "w-12 h-14 md:w-16 md:h-20 rounded-clay flex items-center justify-center text-2xl md:text-4xl font-black border-b-4 transition-all drop-shadow-sm",
              item.isUsed 
                ? "bg-slate-200 text-slate-400 border-slate-300 dark:bg-slate-700/50 dark:text-slate-600 dark:border-slate-800 cursor-not-allowed shadow-inner grayscale scale-95 opacity-50" 
                : "bg-white dark:bg-slate-800 text-primary dark:text-primary-foreground border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary shadow-clay-sm cursor-pointer"
            )}
          >
            {item.letter}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
