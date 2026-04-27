import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../atoms/Button"
import { ChevronLeft, ChevronRight, Volume2, Pause } from "lucide-react"
import { cn } from "../../shared/utils"

export interface StoryPage {
  id: string
  imageUrl: string
  text: string
  highlightedWordIndex?: number
}

export interface StoryBookProps {
  title: string
  pages: StoryPage[]
  currentPage: number
  isPlaying: boolean
  onNextPage: () => void
  onPrevPage: () => void
  onTogglePlay: () => void
  className?: string
}

export function StoryBook({ title, pages, currentPage, isPlaying, onNextPage, onPrevPage, onTogglePlay, className }: StoryBookProps) {
  const page = pages[currentPage];
  const isFirst = currentPage === 0;
  const isLast = currentPage === pages.length - 1;

  // Split text into words to support highlighting
  const words = page.text.split(" ");

  return (
    <div className={cn("w-full max-w-5xl bg-amber-50 dark:bg-slate-800 rounded-clay-lg p-4 md:p-8 shadow-clay-lg border-8 border-amber-200 dark:border-slate-700 flex flex-col items-center gap-6", className)}>
      
      {/* Header */}
      <div className="w-full flex items-center justify-between pb-4 border-b-4 border-amber-200/50 dark:border-slate-700/50">
        <h2 className="text-xl md:text-2xl font-bold text-amber-900 dark:text-amber-100 font-serif">{title}</h2>
        <div className="flex items-center gap-3">
          <span className="font-bold text-amber-700/50 dark:text-slate-400">Hal {currentPage + 1}/{pages.length}</span>
          <Button size="icon" variant={isPlaying ? "accent" : "default"} onClick={onTogglePlay} className="rounded-full shadow-clay-sm">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Book Layout */}
      <div className="w-full flex flex-col md:flex-row gap-8 items-center bg-white dark:bg-slate-900 p-4 md:p-8 rounded-2xl shadow-inner border-2 border-amber-100 dark:border-slate-800 relative z-0">
        
        {/* Book Spine (Decorative) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-100 dark:via-slate-800 to-transparent z-10" />

        <AnimatePresence mode="wait">
          {/* Illustration Side */}
          <motion.div
            key={`img-${page.id}`}
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            className="flex-1 w-full aspect-square max-h-[400px] bg-sky-100 dark:bg-slate-800 rounded-xl overflow-hidden border-4 border-white dark:border-slate-700 shadow-sm"
          >
            <img src={page.imageUrl} alt={`Ilustrasi halaman ${currentPage + 1}`} className="w-full h-full object-cover" />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {/* Text Side */}
          <motion.div
            key={`txt-${page.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 w-full min-h-[200px] md:min-h-[400px] flex flex-col justify-center px-4 md:px-8"
          >
            <p className="text-2xl md:text-4xl leading-relaxed text-slate-800 dark:text-slate-100 font-serif font-medium">
              {words.map((word, i) => (
                <span 
                  key={i} 
                  className={cn(
                    "inline-block mr-2 md:mr-3 transition-colors duration-300",
                    page.highlightedWordIndex === i ? "text-primary font-bold bg-primary/10 rounded-md px-1 -mx-1" : ""
                  )}
                >
                  {word}
                </span>
              ))}
            </p>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Navigation Controls */}
      <div className="w-full flex justify-between items-center mt-2">
        <Button size="lg" variant="secondary" onClick={onPrevPage} disabled={isFirst} className="w-32 flex gap-2">
          <ChevronLeft className="w-5 h-5" />
          Mundur
        </Button>
        <Button size="lg" variant="default" onClick={onNextPage} className="w-32 flex gap-2" disabled={isLast}>
          Lanjut
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

    </div>
  )
}
