import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../shared/utils"

export interface PuzzlePiece {
  id: string
  currentPosition: number
  correctPosition: number
  imageUrl?: string // if it's a picture puzzle
  text?: string // if it's a letter/number puzzle
}

export interface PuzzleBoardProps {
  pieces: PuzzlePiece[]
  columns?: number
  onMovePiece: (pieceId: string) => void
  disabled?: boolean
  className?: string
}

export function PuzzleBoard({ pieces, columns = 3, onMovePiece, disabled, className }: PuzzleBoardProps) {
  
  // Arrange pieces based on currentPosition
  const sortedPieces = [...pieces].sort((a, b) => a.currentPosition - b.currentPosition)

  return (
    <div 
      className={cn("bg-slate-200 dark:bg-slate-800 p-2 sm:p-4 rounded-clay border-4 border-slate-300 dark:border-slate-700 shadow-inner max-w-lg w-full aspect-square", className)}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: '4px'
      }}
    >
      {sortedPieces.map((piece) => {
        // Is this the empty slot? (Represented by a specific piece ID, e.g., 'empty')
        const isEmpty = piece.id === 'empty'

        return (
          <motion.div
            layout
            key={piece.id}
            onClick={() => !disabled && !isEmpty && onMovePiece(piece.id)}
            className={cn(
              "w-full h-full rounded-md flex items-center justify-center overflow-hidden",
              isEmpty 
                ? "bg-transparent shadow-none border-0" 
                : "bg-white dark:bg-slate-700 shadow-clay-sm border-2 border-slate-100 dark:border-slate-600 cursor-pointer hover:scale-[0.98] transition-transform",
              piece.currentPosition === piece.correctPosition && !isEmpty 
                ? "ring-2 ring-green-400 ring-inset" 
                : ""
            )}
          >
            {!isEmpty && piece.imageUrl && (
              <img src={piece.imageUrl} alt="Puzzle part" className="w-full h-full object-cover" />
            )}
            {!isEmpty && piece.text && (
              <span className="text-3xl sm:text-5xl font-bold text-slate-700 dark:text-slate-200">{piece.text}</span>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
