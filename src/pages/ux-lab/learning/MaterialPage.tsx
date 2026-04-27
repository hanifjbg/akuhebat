import * as React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, ChevronLeft, Volume2 } from "lucide-react"

import { MainLayout } from "../../../ui/templates/MainLayout"
import { WordCard } from "../../../ui/molecules/WordCard"
import { useSimulatorStore } from "../../../shared/store/simulator"
import { Spinner, ProgressBar } from "../../../ui/atoms"

export function MaterialPage() {
  const navigate = useNavigate();
  const { globalState } = useSimulatorStore();
  
  const [index, setIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const materials = [
    { id: "1", word: "Apel", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=apple", phonetics: "a-pel" },
    { id: "2", word: "Pisang", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=banana", phonetics: "pi-sang" },
    { id: "3", word: "Jeruk", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=orange", phonetics: "je-ruk" },
  ];

  const currentMaterial = materials[index];

  const handlePlayAudio = () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    // Simulate audio playing delay
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 1500);
  };

  const handeNext = () => {
    if (index < materials.length - 1) {
      setIndex(i => i + 1);
    } else {
      navigate('/ux-lab/learning/quiz');
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(i => i - 1);
    }
  };

  const progress = ((index + 1) / materials.length) * 100;

  return (
    <MainLayout showTopBar={false} showBottomBar={false}>
      <div className="flex-1 w-full h-[100dvh] flex flex-col items-center relative overflow-hidden bg-transparent justify-center">

        {/* Header Overlay */}
        <div className="absolute top-6 left-4 right-4 sm:left-6 sm:right-6 flex items-center gap-3 sm:gap-4 z-50">
          <div className="shrink-0 font-bold justify-center items-center flex rounded-full w-12 h-12 bg-white/80 text-slate-800 backdrop-blur-md shadow-sm border-2 border-slate-200 dark:bg-slate-800/80 dark:border-slate-700 dark:text-slate-200">
            {index + 1}/{materials.length}
          </div>
          
          <div className="flex-1 drop-shadow-sm">
             <ProgressBar value={progress} size="md" colorVariant="primary" />
          </div>

          <button 
            onClick={() => navigate('/ux-lab/learning/dashboard')}
            className="shrink-0 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border-2 border-slate-200 text-slate-500 hover:bg-red-50 hover:border-red-500 hover:text-red-500 transition-all focus:outline-none dark:bg-slate-800/80 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-red-500/20"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex w-full flex-col max-w-xl mx-auto h-full px-4 overflow-y-auto no-scrollbar">
          {globalState === 'loading' && (
             <div className="flex flex-col items-center gap-4 m-auto">
              <Spinner size="lg" />
              <p className="font-bold text-slate-500">Menyiapkan Materi...</p>
            </div>
          )}

          {globalState === 'error' && (
             <div className="flex flex-col items-center gap-4 m-auto">
              <p className="font-bold text-red-500 animate-bounce">Yah, materinya gagal dimuat.</p>
            </div>
          )}

          {(globalState === 'normal' || globalState === 'empty') && (
            <div className="w-full flex flex-col flex-1 min-h-[400px] justify-between h-full pt-20 pb-8 relative z-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMaterial.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="w-full flex-1 flex flex-col justify-center min-h-[140px]"
                >
                  <WordCard
                    word={currentMaterial.word}
                    imageUrl={currentMaterial.imageUrl}
                    phonetics={currentMaterial.phonetics}
                    onPlayAudio={handlePlayAudio}
                    className="w-full flex-1 sm:max-h-80"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="w-full flex items-center justify-between gap-2 sm:gap-4 shrink-0 pt-6">
                <button
                  onClick={handlePrev}
                  disabled={index === 0}
                  className={`w-14 h-14 rounded-full py-4 flex items-center justify-center shadow-clay-sm transition-all duration-300 ${index === 0 ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border-2 border-slate-300 dark:border-slate-700 cursor-not-allowed' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95'}`}
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                
                <button
                  onClick={handlePlayAudio}
                  className={`flex-1 rounded-full flex py-4 items-center justify-center gap-2 font-bold text-lg h-14 shadow-clay-md transition-all duration-300 ${isPlayingAudio ? 'bg-amber-400 text-white scale-95' : 'bg-yellow-400 text-yellow-900 border-b-4 border-yellow-500 hover:scale-[1.02] active:scale-95'}`}
                >
                  <Volume2 className={`w-7 h-7 sm:mr-2 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
                  <span className="hidden sm:inline">{isPlayingAudio ? "Mendengarkan..." : "Dengarkan"}</span>
                </button>

                <button
                  onClick={handeNext}
                  className="w-14 h-14 py-4 rounded-full flex items-center justify-center bg-primary text-white shadow-clay-md border-b-4 border-primary-hover hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </MainLayout>
  )
}
