import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Settings, Star, Play, BookOpen, Music, Search, Target } from "lucide-react"

import { MainLayout } from "../../../ui/templates/MainLayout"
import { BentoGrid, BentoCard } from "../../../ui/organisms/BentoGrid"
import { ThemeSwitch, IconButton } from "../../../ui/atoms"
import { useSimulatorStore } from "../../../shared/store/simulator"

export function DashboardPage() {
  const navigate = useNavigate();
  const { globalState } = useSimulatorStore();

  const DashboardTopRight = () => (
    <div className="flex items-center gap-3">
      <ThemeSwitch />
      <button className="w-11 h-11 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-clay-sm border-2 border-slate-100 dark:border-slate-700 text-slate-500 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30">
        <Settings className="w-6 h-6" />
      </button>
    </div>
  );

  return (
    <MainLayout 
      activeTab="home"
      topBarProps={{
        userName: "HANIF",
        greeting: "Selamat Sore!",
        avatarSrc: "https://api.dicebear.com/7.x/notionists/svg?seed=Hanif&backgroundColor=f472b6",
        rightElement: <DashboardTopRight />
      }}
    >
      <div className="flex-1 w-full h-full pt-4 pb-6 px-4 overflow-y-auto overflow-x-hidden no-scrollbar">
        {globalState === 'loading' ? (
           <div className="flex-1 flex items-center justify-center h-full">Loading...</div>
        ) : (
          <div className="flex flex-col gap-6 w-full mx-auto pb-4">
            <BentoGrid className="w-full">
              {/* Row 1: Full Width Play Card */}
              <BentoCard 
                colSpan={2} 
                rowSpan={1} 
                colorVariant="primary" 
                className="items-start p-6 group h-40 flex flex-col justify-center"
                onClick={() => navigate('/ux-lab/learning/map')}
              >
                 <div className="flex flex-col items-start z-20 relative w-3/4">
                   <h4 className="text-2xl font-black mb-1 text-white drop-shadow-md leading-tight">Mulai Belajar!</h4>
                   <p className="opacity-90 font-bold text-sm">Lanjutkan petualangan seru.</p>
                 </div>
                 
                 <div className="absolute -top-4 -right-4 drop-shadow-xl group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300 z-10 opacity-80">
                    <div className="w-24 h-24 bg-gradient-to-tr from-yellow-300 to-orange-400 rounded-2xl border-[3px] border-white/50 flex items-center justify-center transform rotate-12">
                      <Star className="w-12 h-12 fill-white text-white drop-shadow-md" />
                    </div>
                  </div>

                 <div className="absolute -bottom-10 -right-10 opacity-20 pointer-events-none z-0">
                   <Play className="w-40 h-40 fill-white" />
                 </div>
              </BentoCard>

              {/* Row 2: Half Width Cards */}
              <BentoCard 
                colSpan={1} 
                rowSpan={1} 
                colorVariant="secondary" 
                className="items-center p-4 group flex flex-col justify-center"
                onClick={() => navigate('/ux-lab/learning/quiz')}
              >
                 <div className="z-20 relative px-2 text-center flex flex-col justify-center items-center">
                   <h4 className="text-4xl font-black mb-1 drop-shadow-md">7</h4>
                   <p className="opacity-90 font-bold leading-tight text-xs sm:text-sm">Target Selesai</p>
                 </div>
                 <div className="absolute -bottom-6 -left-6 opacity-30 group-hover:rotate-12 transition-transform pointer-events-none z-10">
                   <Target className="w-24 h-24 text-white" />
                 </div>
              </BentoCard>

              <BentoCard 
                colSpan={1} 
                rowSpan={1} 
                colorVariant="accent" 
                className="group p-4 flex flex-col"
                onClick={() => navigate('/ux-lab/fullscreen/story')}
              >
                 <div className="z-20 relative h-full flex flex-col justify-end">
                   <h4 className="text-xl font-black mb-1 drop-shadow-sm leading-tight text-amber-900">Buku Cerita</h4>
                   <p className="opacity-90 text-xs font-bold text-amber-800">Kisah seru hari ini.</p>
                 </div>
                 
                 <div className="absolute -top-2 -left-2 opacity-50 z-10">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-amber-500" />
                    </div>
                  </div>

                 <div className="absolute top-4 right-4 opacity-10 pointer-events-none z-0">
                     <BookOpen className="w-16 h-16" />
                 </div>
              </BentoCard>

              {/* Row 3: Full Width Music Card */}
              <BentoCard 
                colSpan={2} 
                rowSpan={1} 
                colorVariant="success" 
                className="group p-6 flex flex-col justify-center"
                onClick={() => navigate('/ux-lab/minigames/memory')}
              >
                 <div className="z-20 relative flex items-center justify-between w-full">
                   <div className="w-2/3">
                     <h4 className="text-2xl font-black mb-1 drop-shadow-sm">Main Memori!</h4>
                     <p className="opacity-90 font-bold text-sm">Latih ingatanmu.</p>
                   </div>
                   <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-inner-sm border-2 border-white/40 group-hover:scale-110 transition-transform flex-shrink-0">
                      <Search className="w-8 h-8 text-white drop-shadow-md" />
                   </div>
                 </div>
              </BentoCard>

              {/* Row 4: Half Width Extras */}
              <BentoCard 
                colSpan={1} 
                rowSpan={1} 
                colorVariant="default" 
                className="group p-4 bg-gradient-to-tr from-indigo-50 to-pink-50 dark:from-slate-800 dark:to-slate-700"
              >
                 <div className="z-10 relative h-full flex flex-col justify-center w-full items-center text-center">
                   <div className="w-12 h-12 mb-2 bg-white dark:bg-slate-600 rounded-full flex items-center justify-center shadow-clay-sm border-2 border-indigo-100 dark:border-slate-500 group-hover:scale-110 transition-transform">
                      <Music className="w-6 h-6 text-indigo-500" />
                   </div>
                   <h4 className="text-lg font-black mb-1 text-slate-800 dark:text-white">Musik</h4>
                 </div>
              </BentoCard>

              <BentoCard 
                colSpan={1} 
                rowSpan={1} 
                colorVariant="warning" 
                className="group p-4"
                onClick={() => navigate('/ux-lab/learning/map')}
              >
                 <div className="z-10 relative h-full flex flex-col justify-end">
                   <h4 className="text-lg font-black mb-1 drop-shadow-sm">Misi Harian</h4>
                   <p className="opacity-90 font-bold text-xs">Klaim hadiahmu.</p>
                 </div>
                 <div className="absolute top-4 right-4 opacity-20 group-hover:scale-110 transition-transform flex-shrink-0 pointer-events-none">
                    <Target className="w-12 h-12 text-white drop-shadow-md" />
                 </div>
               </BentoCard>
            </BentoGrid>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
