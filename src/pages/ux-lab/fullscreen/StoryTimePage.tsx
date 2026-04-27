import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MainLayout } from "../../../ui/templates/MainLayout"
import { StoryBook } from "../../../ui/organisms/StoryBook"
import { useSimulatorStore } from "../../../shared/store/simulator"
import { X } from "lucide-react"

export function StoryTimePage() {
  const navigate = useNavigate();
  const { globalState } = useSimulatorStore();
  
  const [page, setPage] = useState(0);
  const [playing, setPlaying] = useState(false);

  const mockPages = [
    { 
      id: "1", 
      imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=p1", 
      text: "Pada suatu hari, ada seekor kelinci kecil bernama Boni.",
      highlightedWordIndex: playing ? 4 : undefined
    },
    { 
      id: "2", 
      imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=p2", 
      text: "Boni sangat suka melompat-lompat di padang rumput.",
    }
  ];

  return (
    <MainLayout showTopBar={false} showBottomBar={false} className="max-w-none">
      <div className="flex-1 w-full h-[100dvh] flex flex-col p-4 md:p-8 bg-amber-900 justify-center items-center relative overflow-hidden">
        
        {/* Fullscreen Escape Button */}
        <button 
          onClick={() => navigate('/ux-lab/learning/dashboard')}
          className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 text-white hover:bg-red-500 hover:border-red-500 transition-all focus:outline-none focus:ring-4 focus:ring-red-500/50"
        >
          <X className="w-8 h-8" />
        </button>

        {globalState === 'error' ? (
             <div className="text-center py-12 font-bold text-red-500 bg-white p-8 rounded-2xl z-10">Buku cerita tidak bisa dibuka.</div>
        ) : (
          <div className="w-full max-w-5xl h-full max-h-[800px] flex items-center justify-center z-10">
            <StoryBook 
              title="Kelinci Kecil Boni"
              pages={globalState === 'empty' ? [] : mockPages}
              currentPage={page}
              isPlaying={playing}
              onNextPage={() => setPage(1)}
              onPrevPage={() => setPage(0)}
              onTogglePlay={() => setPlaying(!playing)}
            />
          </div>
        )}

        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/20 rounded-full blur-[80px] pointer-events-none" />

      </div>
    </MainLayout>
  )
}
