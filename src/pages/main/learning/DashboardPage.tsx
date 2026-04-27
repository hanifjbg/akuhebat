import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Settings, Play, Target, BookOpen, Search, Star, Sparkles } from "lucide-react"

import { MainLayout } from "../../../ui/templates/MainLayout"
import { ThemeSwitch } from "../../../ui/atoms"
import { ChildProfile } from "../../../core/state/parent-store"
import { useLearningStore } from "../../../modules/learning/store"
import { cn } from "../../../shared/utils"

export function DashboardPage({ child }: { child: ChildProfile }) {
  const navigate = useNavigate();
  const { modules, initialize } = useLearningStore();

  React.useEffect(() => {
    initialize();
  }, [initialize]);

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
      bgClassName="bg-slate-50 dark:bg-slate-900"
      topBarProps={{
        title: "Pilih Modul",
        userName: child.name,
        greeting: "Selamat Bermain!",
        avatarSrc: child.avatarUrl,
        rightElement: <DashboardTopRight />
      }}
    >
      <div className="flex-1 w-full max-w-2xl mx-auto pt-4 pb-32 px-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2 mb-2">
             <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight flex items-center gap-2 drop-shadow-sm">
                <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400" />
                Modul Pintar
             </h2>
             <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {modules.length} Tersedia
             </div>
          </div>

          {modules.map((mod) => (
            <div 
              key={mod.id}
              className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-5 shadow-clay-md border-3 border-transparent hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden"
              onClick={() => navigate(`/main/learning/module/${mod.id}`)}
            >
               {/* Progress indicator background */}
               <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none group-hover:scale-125 transition-transform">
                  <Star className={cn("w-full h-full", mod.color?.replace('bg-', 'text-') || 'text-slate-400')} />
               </div>

               <div className="flex items-center gap-5 relative z-10">
                  <div className={cn(
                    "w-20 h-20 rounded-[1.75rem] shadow-clay-sm flex items-center justify-center border-4 border-white/20",
                    mod.color
                  )}>
                     {mod.icon === 'A' ? (
                        <span className="text-4xl font-black text-white drop-shadow-md">A</span>
                     ) : mod.icon === 'vocal' ? (
                        <div className="flex flex-col items-center">
                           <span className="text-2xl font-black text-white leading-none">B</span>
                           <span className="text-2xl font-black text-white leading-none">A</span>
                        </div>
                     ) : (
                        <Star className="w-10 h-10 fill-white text-white drop-shadow-md" />
                     )}
                  </div>

                  <div className="flex-1 min-w-0">
                     <h3 className="text-xl font-black text-slate-800 dark:text-white leading-tight mb-1">{mod.title}</h3>
                     <p className="text-xs font-bold text-slate-400 leading-tight line-clamp-2">{mod.description}</p>
                     
                     <div className="mt-3 flex items-center gap-3">
                        <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden border border-slate-50 dark:border-slate-700">
                           <div className={cn("h-full rounded-full transition-all w-[30%]", mod.color)} />
                        </div>
                        <span className="text-[10px] font-black text-slate-400">30%</span>
                     </div>
                  </div>

                  <div className="flex-shrink-0">
                     <button className={cn(
                       "w-14 h-14 rounded-full shadow-clay-sm flex items-center justify-center border-3 border-white/20 group-hover:scale-110 transition-transform",
                       mod.color
                     )}>
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                     </button>
                  </div>
               </div>
            </div>
          ))}

          {/* Quick Actions / Minigames links */}
          <div className="grid grid-cols-2 gap-4 mt-6">
             <div 
               onClick={() => navigate('/main/quiz')}
               className="bg-amber-100/80 dark:bg-amber-900/40 p-5 rounded-[2.5rem] border-2 border-amber-200 dark:border-amber-800/50 flex flex-col gap-2 cursor-pointer hover:scale-[1.02] transition-all shadow-sm group"
             >
                <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-clay-sm border border-amber-50 dark:border-amber-900/20 group-hover:scale-110 transition-transform">
                   <Target className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                   <h4 className="font-black text-amber-900 dark:text-amber-200 text-lg leading-tight uppercase tracking-tight">Quiz Harian</h4>
                   <p className="text-[10px] font-black text-amber-700/60 dark:text-amber-400/60 uppercase tracking-widest">Latih Dirimu</p>
                </div>
             </div>

             <div 
               className="bg-indigo-100/80 dark:bg-indigo-900/40 p-5 rounded-[2.5rem] border-2 border-indigo-200 dark:border-indigo-800/50 flex flex-col gap-2 cursor-pointer hover:scale-[1.02] transition-all shadow-sm group"
             >
                <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-clay-sm border border-indigo-50 dark:border-indigo-900/20 group-hover:scale-110 transition-transform">
                   <Search className="w-6 h-6 text-indigo-500" />
                </div>
                <div>
                   <h4 className="font-black text-indigo-900 dark:text-indigo-200 text-lg leading-tight uppercase tracking-tight">Mini Game</h4>
                   <p className="text-[10px] font-black text-indigo-700/60 dark:text-indigo-400/60 uppercase tracking-widest">Ayo Main!</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
