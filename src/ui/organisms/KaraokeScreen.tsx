import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "../atoms/Button"
import { ProgressBar } from "../atoms/ProgressBar"
import { Mic, Play, Square, Settings } from "lucide-react"
import { cn } from "../../shared/utils"

export interface KaraokeScreenProps {
  songTitle: string
  currentLyricLine1: string
  currentLyricLine2: string
  highlightProgress: number // 0 to 100 for line1
  isRecording: boolean
  isPlaying: boolean
  score?: number
  onTogglePlay: () => void
  onToggleRecord: () => void
  className?: string
}

export function KaraokeScreen({ 
  songTitle, 
  currentLyricLine1, 
  currentLyricLine2, 
  highlightProgress, 
  isRecording, 
  isPlaying, 
  score,
  onTogglePlay, 
  onToggleRecord,
  className 
}: KaraokeScreenProps) {
  
  return (
    <div className={cn("w-full max-w-4xl bg-slate-900 rounded-clay-lg p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-slate-800 flex flex-col items-center gap-8 relative overflow-hidden", className)}>
      
      {/* Stage Lights / Glow */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="w-full flex justify-between items-center z-10">
        <div className="text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Mic className="w-5 h-5 text-primary" />
            {songTitle}
          </h2>
        </div>
        {score !== undefined && (
          <div className="bg-white/10 backdrop-blur border border-white/20 px-4 py-2 rounded-full flex items-center gap-2 text-white font-bold">
            Skor: <span className="text-yellow-400 text-xl">{score}</span>
          </div>
        )}
      </div>

      {/* Lyrics Display */}
      <div className="w-full flex-1 min-h-[300px] flex flex-col items-center justify-center gap-6 z-10 py-8">
        
        {/* Active Line */}
        <div className="relative text-3xl md:text-5xl font-black text-center max-w-3xl">
          <div className="text-slate-600 absolute inset-0 select-none">
            {currentLyricLine1}
          </div>
          <motion.div 
            className="text-white overflow-hidden whitespace-nowrap text-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            style={{ width: `${highlightProgress}%` }}
          >
            {currentLyricLine1}
          </motion.div>
        </div>

        {/* Next Line */}
        <div className="text-xl md:text-3xl font-bold text-slate-500 text-center max-w-3xl mt-4">
          {currentLyricLine2}
        </div>

      </div>

      {/* Controls */}
      <div className="w-full z-10 flex flex-col gap-6">
        {/* Recording visualizer simulation */}
        {isRecording && (
          <div className="flex items-center justify-center gap-1 h-8">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: ["20%", "100%", "30%"] }}
                transition={{ repeat: Infinity, duration: 0.5 + Math.random() * 0.5, ease: "easeInOut" }}
                className="w-2 bg-primary rounded-full"
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-center gap-6 p-4 bg-black/40 backdrop-blur rounded-full border border-white/10">
          <Button size="icon" variant="ghost" className="text-white hover:bg-white/10 rounded-full">
            <Settings className="w-5 h-5" />
          </Button>

          <Button 
            size="lg" 
            variant="primary" 
            className={cn("w-16 h-16 rounded-full", isPlaying && "bg-slate-700 hover:bg-slate-600 border-slate-600")}
            onClick={onTogglePlay}
          >
            {isPlaying ? <Square className="w-6 h-6" fill="currentColor" /> : <Play className="w-8 h-8 ml-1" fill="currentColor" />}
          </Button>

          <Button 
            size="lg" 
            variant={isRecording ? "destructive" : "secondary"} 
            className={cn("w-16 h-16 rounded-full border-4", isRecording ? "border-red-300 animate-pulse" : "border-slate-300")}
            onClick={onToggleRecord}
          >
            <Mic className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
