import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MainLayout } from "../../../ui/templates/MainLayout"
import { ColoringCanvas } from "../../../ui/organisms/ColoringCanvas"
import { useSimulatorStore } from "../../../shared/store/simulator"
import { X } from "lucide-react"

export function ColoringPage() {
  const navigate = useNavigate();
  const { globalState } = useSimulatorStore();
  const [color, setColor] = useState("#ef4444");

  const colors = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", 
    "#22c55e", "#06b6d4", "#3b82f6", "#6366f1", "#a855f7", 
    "#ec4899", "#52525b"
  ];

  return (
    <MainLayout showTopBar={false} showBottomBar={false}>
      <div className="flex-1 w-full h-[100dvh] flex flex-col p-4 bg-yellow-50/50 dark:bg-slate-900/40 items-center justify-center relative overflow-hidden">
        
        {/* Fullscreen Escape Button */}
        <button 
          onClick={() => navigate('/ux-lab/learning/dashboard')}
          className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border-2 border-slate-200 text-slate-500 hover:bg-red-500 hover:border-red-500 hover:text-white transition-all focus:outline-none focus:ring-4 focus:ring-red-500/50 dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-400"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="w-full max-w-4xl text-center mb-6 z-10">
           <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Ayo Mewarnai!</h1>
        </div>

        <div className="w-full flex justify-center">
          {globalState === 'error' ? (
             <div className="text-center py-12 font-bold text-red-500">Error memuat gambar.</div>
          ) : (
            <ColoringCanvas 
              colors={colors}
              selectedColor={color}
              onSelectColor={setColor}
              onClear={() => {}}
              onUndo={() => {}}
              onSave={() => {}}
              svgContent={<div className="w-full h-full border-4 border-dashed border-slate-300 rounded-3xl flex items-center justify-center font-bold text-slate-400">Area Apple SVG</div>}
            />
          )}
        </div>

      </div>
    </MainLayout>
  )
}
