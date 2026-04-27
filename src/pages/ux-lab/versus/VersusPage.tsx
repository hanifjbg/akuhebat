import * as React from "react"
import { useNavigate } from "react-router-dom"
import { MainLayout } from "../../../ui/templates/MainLayout"
import { VersusPanel } from "../../../ui/organisms/VersusPanel"
import { useSimulatorStore } from "../../../shared/store/simulator"
import { Spinner } from "../../../ui/atoms"
import { Swords, X } from "lucide-react"

export function VersusPage() {
  const navigate = useNavigate();
  const { globalState } = useSimulatorStore();

  const player1 = { name: "Budi", score: 120, isReady: true, isCorrect: true, avatarSrc: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=budi" };
  const player2 = { name: "Bot Pintar", score: 80, isReady: true, isCorrect: false, avatarSrc: "https://api.dicebear.com/7.x/bottts/svg?seed=smart" };

  return (
    <MainLayout showTopBar={false} showBottomBar={false}>
      <div className="flex-1 w-full h-[100dvh] flex flex-col p-4 bg-slate-900 justify-center items-center relative overflow-hidden">
        
        {/* Fullscreen Escape Button */}
        <button 
          onClick={() => navigate('/ux-lab/learning/dashboard')}
          className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 text-white hover:bg-red-500 hover:border-red-500 transition-all focus:outline-none focus:ring-4 focus:ring-red-500/50"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="text-center mb-12 z-10">
          <h1 className="text-3xl font-black text-white flex items-center justify-center gap-3">
            <Swords className="w-8 h-8 text-red-500" />
            Arena Duel
            <Swords className="w-8 h-8 text-red-500" />
          </h1>
          <p className="font-bold text-slate-400 mt-2">Siapa yang paling cepat?</p>
        </div>

        <div className="w-full flex justify-center pb-8">
          {globalState === 'loading' ? (
            <div className="flex flex-col items-center gap-4 py-12">
              <Spinner size="lg" className="text-white" />
              <p className="font-bold text-slate-400">Mencari lawan...</p>
            </div>
          ) : globalState === 'error' ? (
            <div className="text-center py-12 font-bold text-red-500">Koneksi terputus. Batal duel!</div>
          ) : (
            <VersusPanel 
              player1={globalState === 'empty' ? { ...player1, isReady: false } : player1} 
              player2={globalState === 'empty' ? { ...player2, isReady: false } : player2} 
              timeRemaining={globalState === 'normal' ? 15 : undefined}
            />
          )}
        </div>

      </div>
    </MainLayout>
  )
}
