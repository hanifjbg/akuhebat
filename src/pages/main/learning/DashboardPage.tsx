import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Settings, Star, Play, BookOpen, Music, Search, Target } from "lucide-react"

import { MainLayout } from "../../../ui/templates/MainLayout"
import { BentoGrid, BentoCard } from "../../../ui/organisms/BentoGrid"
import { ThemeSwitch } from "../../../ui/atoms"
import { ChildProfile } from "../../../core/state/parent-store"

export function DashboardPage({ child }: { child: ChildProfile }) {
  const navigate = useNavigate();

  const DashboardTopRight = () => (
    <div className="flex items-center gap-3">
      <ThemeSwitch />
      <button 
        onClick={() => navigate('/main/settings')}
        className="w-11 h-11 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-clay-sm border-2 border-slate-100 dark:border-slate-700 text-slate-500 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        <Settings className="w-6 h-6" />
      </button>
    </div>
  );

  return (
    <MainLayout 
      activeTab="home"
      topBarProps={{
        userName: child.name,
        greeting: "Selamat Bermain!",
        avatarSrc: child.avatarUrl,
        rightElement: <DashboardTopRight />
      }}
    >
      <div className="flex-1 w-full h-full pt-4 pb-6 px-4 overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className="flex flex-col gap-6 w-full mx-auto pb-4">
          <BentoGrid className="w-full">
            {/* Row 1: Full Width Play Card */}
            <BentoCard 
              colSpan={2} 
              rowSpan={1} 
              colorVariant="primary" 
              className="items-start p-6 group h-40 flex flex-col justify-center"
              onClick={() => navigate('/main/map')}
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
              onClick={() => navigate('/main/quiz')}
            >
               <div className="z-20 relative px-2 text-center flex flex-col justify-center items-center">
                 <h4 className="text-4xl font-black mb-1 drop-shadow-md">{child.level}</h4>
                 <p className="opacity-90 font-bold leading-tight text-xs sm:text-sm">Level Kamu</p>
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
              // onClick={() => navigate('/main/story')}
            >
               <div className="z-20 relative h-full flex flex-col justify-end">
                 <h4 className="text-xl font-black mb-1 drop-shadow-sm leading-tight text-amber-900">Buku Cerita</h4>
                 <p className="opacity-90 text-xs font-bold text-amber-800">Segera hadir.</p>
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
          </BentoGrid>
        </div>
      </div>
    </MainLayout>
  )
}
