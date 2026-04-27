import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MainLayout } from "../../../ui/templates/MainLayout"
import { WordBuilder } from "../../../ui/organisms/WordBuilder"
import { useSimulatorStore } from "../../../shared/store/simulator"
import { Button } from "../../../ui/atoms"
import { Check, X } from "lucide-react"

export function WordBuilderPage() {
  const navigate = useNavigate();
  const { globalState } = useSimulatorStore();
  
  const [selected, setSelected] = useState<(string | null)[]>(["B", "U", null, null]);
  const [available, setAvailable] = useState([
    { id: "1", letter: "K", isUsed: false },
    { id: "2", letter: "U", isUsed: true },
    { id: "3", letter: "B", isUsed: true },
    { id: "4", letter: "A", isUsed: false },
    { id: "5", letter: "S", isUsed: false },
  ]);

  return (
    <MainLayout showTopBar={false} showBottomBar={false}>
      <div className="flex-1 w-full h-[100dvh] flex flex-col p-4 bg-orange-50/50 dark:bg-slate-900/40 justify-center items-center relative overflow-hidden">
        
        {/* Fullscreen Escape Button */}
        <button 
          onClick={() => navigate('/ux-lab/learning/dashboard')}
          className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border-2 border-slate-200 text-slate-500 hover:bg-red-500 hover:border-red-500 hover:text-white transition-all focus:outline-none focus:ring-4 focus:ring-red-500/50 dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-400"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="text-center mb-8 z-10">
           <h1 className="text-3xl font-black text-orange-600 dark:text-orange-400 mb-2">Susun Kata</h1>
           <p className="font-bold text-slate-500">Benda yang dibaca</p>
        </div>

        <div className="w-full flex justify-center">
          {globalState === 'error' ? (
             <div className="text-center py-12 font-bold text-red-500">Error memuat game.</div>
          ) : (
            <WordBuilder 
              targetWord="BUKU"
              selectedLetters={globalState === 'empty' ? [null, null, null, null] : selected}
              availableLetters={globalState === 'empty' ? available.map(a => ({...a, isUsed: false})) : available}
              onSelectLetter={() => {}}
              onRemoveLetter={() => {}}
            />
          )}
        </div>

        <Button size="lg" variant="accent" className="mt-8 flex gap-2 w-full max-w-sm rounded-full shadow-clay-md h-16 text-xl">
          <Check className="w-6 h-6" /> Periksa!
        </Button>

      </div>
    </MainLayout>
  )
}
