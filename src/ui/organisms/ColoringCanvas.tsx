import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "../atoms/Button"
import { Eraser, Undo, Download, Palette } from "lucide-react"
import { cn } from "../../shared/utils"

export interface ColoringCanvasProps {
  svgContent?: React.ReactNode // SVG to color
  colors: string[]
  selectedColor: string
  onSelectColor: (color: string) => void
  onClear: () => void
  onUndo: () => void
  onSave?: () => void
  className?: string
}

export function ColoringCanvas({ svgContent, colors, selectedColor, onSelectColor, onClear, onUndo, onSave, className }: ColoringCanvasProps) {
  return (
    <div className={cn("w-full max-w-4xl flex flex-col md:flex-row gap-6", className)}>
      
      {/* Canvas Area */}
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-clay-lg p-4 shadow-clay-lg border-4 border-slate-100 dark:border-slate-700 h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden relative cursor-crosshair">
        {svgContent ? (
          <div className="w-[80%] h-[80%] max-w-full max-h-full">
            {svgContent}
          </div>
        ) : (
          <div className="text-slate-400 font-bold flex flex-col items-center gap-2">
            <Palette className="w-12 h-12 opacity-50" />
            Area Mewarnai
          </div>
        )}
      </div>

      {/* Tools Panel */}
      <div className="w-full md:w-24 bg-white dark:bg-slate-800 rounded-clay-lg p-4 shadow-clay-md border-4 border-slate-100 dark:border-slate-700 flex flex-row md:flex-col items-center justify-between gap-4">
        
        {/* Colors */}
        <div className="flex flex-row md:flex-col gap-3 flex-1 overflow-x-auto md:overflow-y-auto no-scrollbar py-2 px-1">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => onSelectColor(color)}
              className={cn(
                "w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full border-4 shadow-sm transition-transform",
                selectedColor === color ? "border-slate-800 dark:border-white scale-110" : "border-white dark:border-slate-700 hover:scale-105"
              )}
              style={{ backgroundColor: color }}
              aria-label={`Pilih warna ${color}`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-row md:flex-col gap-3 border-l-2 md:border-l-0 md:border-t-2 border-slate-100 dark:border-slate-700 pl-4 md:pl-0 md:pt-4">
          <Button size="icon" variant="ghost" onClick={onUndo} title="Batal (Undo)" className="rounded-full bg-slate-50 dark:bg-slate-700">
            <Undo className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onClear} title="Hapus Semua" className="rounded-full bg-slate-50 dark:bg-slate-700">
            <Eraser className="w-5 h-5" />
          </Button>
          {onSave && (
            <Button size="icon" variant="primary" onClick={onSave} title="Simpan Karya" className="rounded-full">
              <Download className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
