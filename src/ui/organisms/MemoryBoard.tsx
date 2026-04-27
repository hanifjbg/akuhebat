import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../shared/utils"
import { Eye, HelpCircle } from "lucide-react"

export interface MemoryCard {
  id: string
  pairId: string
  content: string | React.ReactNode
  isFlipped: boolean
  isMatched: boolean
}

export interface MemoryBoardProps {
  cards: MemoryCard[]
  onCardClick: (id: string) => void
  disabled?: boolean
  className?: string
}

export function MemoryBoard({ cards, onCardClick, disabled, className }: MemoryBoardProps) {
  return (
    <div className={cn("grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4", className)}>
      {cards.map((card) => (
        <div key={card.id} className="relative aspect-square perspective-1000">
          <motion.button
            onClick={() => {
              if (!disabled && !card.isFlipped && !card.isMatched) {
                onCardClick(card.id)
              }
            }}
            disabled={disabled || card.isFlipped || card.isMatched}
            animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            className="w-full h-full relative preserve-3d"
          >
            {/* Front (Hidden state) */}
            <div className={cn(
              "absolute inset-0 backface-hidden rounded-clay flex items-center justify-center border-4 shadow-clay-sm",
              "bg-primary text-white border-primary-foreground hover:bg-primary/90"
            )}>
              <HelpCircle className="w-1/3 h-1/3 opacity-50" />
            </div>

            {/* Back (Revealed state) */}
            <div 
              className={cn(
                "absolute inset-0 backface-hidden rounded-clay flex items-center justify-center border-4 rotate-y-180",
                card.isMatched 
                  ? "bg-green-100 border-green-400 shadow-[inset_0_-8px_16px_rgba(34,197,94,0.2)]" 
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-clay-inner"
              )}
            >
              <div className="text-3xl sm:text-4xl font-bold p-2 text-center drop-shadow-sm flex items-center justify-center h-full w-full">
                {card.content}
              </div>
              
              {card.isMatched && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 pointer-events-none rounded-clay border-4 border-green-500 animate-pulse"
                />
              )}
            </div>
          </motion.button>
        </div>
      ))}
    </div>
  )
}
