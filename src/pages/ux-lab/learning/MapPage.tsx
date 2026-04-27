import * as React from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

import { MainLayout } from "../../../ui/templates/MainLayout"
import { LevelMap } from "../../../ui/organisms/LevelMap"
import { useSimulatorStore } from "../../../shared/store/simulator"
import { Spinner } from "../../../ui/atoms"

export function MapPage() {
  const navigate = useNavigate();
  const { globalState } = useSimulatorStore();

  const mockLevels = [
    { id: "1", number: 1, status: "completed" as const, stars: 3 },
    { id: "2", number: 2, status: "completed" as const, stars: 2 },
    { id: "3", number: 3, status: "completed" as const, stars: 3 },
    { id: "4", number: 4, status: "current" as const, stars: 0 },
    { id: "5", number: 5, status: "locked" as const, stars: 0 },
    { id: "6", number: 6, status: "locked" as const, stars: 0 },
    { id: "7", number: 7, status: "locked" as const, stars: 0 },
    { id: "8", number: 8, status: "locked" as const, stars: 0 },
    { id: "9", number: 9, status: "locked" as const, stars: 0 },
    { id: "10", number: 10, status: "locked" as const, stars: 0 },
  ];

  const MapTopRight = () => (
    <div className="flex items-center">
      <button 
        onClick={() => navigate('/ux-lab/learning/dashboard')}
        className="w-11 h-11 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-clay-sm border-2 border-slate-100 dark:border-slate-700 text-slate-500 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
    </div>
  );

  return (
    <MainLayout 
      activeTab="main"
      topBarProps={{
        userName: "HANIF",
        title: "Pulau Kata-Kata",
        avatarSrc: "https://api.dicebear.com/7.x/notionists/svg?seed=Hanif&backgroundColor=f472b6",
        rightElement: <MapTopRight />
      }}
    >
      <div className="flex-1 w-full h-full pb-32 flex flex-col pt-4 overflow-y-auto overflow-x-hidden no-scrollbar">

        <div className="flex-1 flex flex-col relative w-full h-full">
          {globalState === 'loading' ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <Spinner size="lg" />
              <p className="font-bold text-slate-500">Membuka Peta...</p>
            </div>
          ) : globalState === 'empty' ? (
            <div className="flex-1 flex items-center justify-center text-center font-bold text-slate-500">Belum ada level tersedia.</div>
          ) : globalState === 'error' ? (
            <div className="flex-1 flex items-center justify-center text-center font-bold text-red-500">Gagal memuat peta. Coba lagi!</div>
          ) : (
            <div className="w-full flex justify-center mt-8">
               <LevelMap 
                 levels={mockLevels} 
                 onSelectLevel={(l) => navigate('/ux-lab/learning/material')} 
               />
            </div>
          )}
        </div>

      </div>
    </MainLayout>
  )
}
