import * as React from "react"
import { motion } from "framer-motion"
import { Volume2 } from "lucide-react"
import { cn } from "../../shared/utils"

export interface WordCardProps extends React.HTMLAttributes<HTMLDivElement> {
  word: string
  imageUrl?: string
  phonetics?: string
  onPlayAudio?: () => void
}

export function WordCard({ word, imageUrl, phonetics, onPlayAudio, className, ...props }: WordCardProps) {
  return (
    <div className={cn("bg-white dark:bg-slate-800 rounded-clay p-6 w-full flex flex-col items-center justify-center gap-4 text-center border-4 border-slate-100 dark:border-slate-700 shadow-clay-md", className)} {...props}>
      {imageUrl && (
        <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-50 dark:bg-slate-700 border-4 border-white dark:border-slate-600 shadow-inner p-2 mb-2">
          <img src={imageUrl} alt={word} className="w-full h-full object-contain drop-shadow-md" />
        </div>
      )}
      
      <div>
        <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest drop-shadow-sm">{word}</h2>
        {phonetics && <p className="text-lg text-slate-500 dark:text-slate-400 mt-1 font-medium">{phonetics}</p>}
      </div>

      {onPlayAudio && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPlayAudio}
          className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center shadow-clay-sm mt-4 border-2 border-white/20 hover:shadow-clay-md focus:outline-none focus:ring-4 focus:ring-secondary/30"
          aria-label={`Dengarkan kata ${word}`}
        >
          <Volume2 className="w-8 h-8" />
        </motion.button>
      )}
    </div>
  )
}
