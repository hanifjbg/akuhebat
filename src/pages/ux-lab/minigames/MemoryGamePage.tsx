import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MainLayout } from "../../../ui/templates/MainLayout"
import { MemoryBoard } from "../../../ui/organisms/MemoryBoard"
import { useSimulatorStore } from "../../../shared/store/simulator"
import { Button } from "../../../ui/atoms"
import { RefreshCcw, X } from "lucide-react"

export function MemoryGamePage() {
  const navigate = useNavigate();
  const { globalState } = useSimulatorStore();
  
  const [cards, setCards] = useState([
    { id: "1", pairId: "A", content: "🍎", isFlipped: false, isMatched: false },
    { id: "2", pairId: "B", content: "🍌", isFlipped: true, isMatched: false },
    { id: "3", pairId: "C", content: "🍇", isFlipped: false, isMatched: true },
    { id: "4", pairId: "A", content: "🍎", isFlipped: false, isMatched: false },
    { id: "5", pairId: "B", content: "🍌", isFlipped: true, isMatched: false },
    { id: "6", pairId: "C", content: "🍇", isFlipped: false, isMatched: true },
  ]);

  const handleCardClick = (id: string) => {
    setCards(cards.map(c => c.id === id ? { ...c, isFlipped: true } : c));
  };

  return (
    <MainLayout showTopBar={false} showBottomBar={false}>
      <div className="flex-1 w-full h-[100dvh] flex flex-col p-4 bg-emerald-50/50 dark:bg-slate-900/40 justify-center items-center relative overflow-hidden">
        
        {/* Fullscreen Escape Button */}
        <button 
          onClick={() => navigate('/ux-lab/learning/dashboard')}
          className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border-2 border-slate-200 text-slate-500 hover:bg-red-500 hover:border-red-500 hover:text-white transition-all focus:outline-none focus:ring-4 focus:ring-red-500/50 dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-400"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="w-full max-w-lg mb-8 flex items-center justify-between z-10">
          <h1 className="text-2xl font-black text-emerald-800 dark:text-emerald-400">Cocokkan Kartu!</h1>
          <Button size="icon" variant="outline" className="rounded-full bg-white dark:bg-slate-800 shadow-sm border-2">
            <RefreshCcw className="w-5 h-5 text-slate-500" />
          </Button>
        </div>

        <div className="w-full max-w-lg">
          {globalState === 'error' ? (
             <div className="text-center py-12 font-bold text-red-500">Error memuat game.</div>
          ) : (
            <MemoryBoard 
              cards={globalState === 'empty' ? cards.map(c => ({...c, isFlipped: false, isMatched: false})) : cards} 
              onCardClick={handleCardClick} 
              disabled={globalState === 'loading'}
            />
          )}
        </div>

      </div>
    </MainLayout>
  )
}
