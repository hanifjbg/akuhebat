import * as React from "react"
import { useNavigate } from "react-router-dom"
import { MainLayout } from "../../../ui/templates/MainLayout"
import { LevelMap } from "../../../ui/organisms/LevelMap"
import { ChildProfile } from "../../../core/state/parent-store"

export function MapPage({ child }: { child: ChildProfile }) {
  const navigate = useNavigate();

  return (
    <MainLayout 
      activeTab="play"
      bgClassName="bg-sky-200 dark:bg-slate-900"
      topBarProps={{
        title: "Peta Misi",
        userName: child.name,
        avatarSrc: child.avatarUrl,
        showBackButton: true,
        onBackClick: () => navigate("/main/dashboard")
      }}
    >
      <div className="flex-1 w-full relative pb-32 pt-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-white/40 dark:bg-slate-800/20 blur-3xl" />
          <div className="absolute top-[40%] -right-[20%] w-[50%] h-[50%] rounded-full bg-white/50 dark:bg-slate-800/30 blur-3xl" />
          <div className="absolute bottom-[10%] left-[20%] w-[60%] h-[60%] rounded-full bg-white/40 dark:bg-slate-800/20 blur-3xl" />
        </div>

        <div className="relative z-10 w-full h-full">
          <LevelMap 
            levels={[
              { id: "lvl-1", number: 1, status: child.level > 1 ? "completed" : child.level === 1 ? "current" : "locked", stars: 3 },
              { id: "lvl-2", number: 2, status: child.level > 2 ? "completed" : child.level === 2 ? "current" : "locked", stars: child.level > 2 ? 3 : 0 },
              { id: "lvl-3", number: 3, status: child.level > 3 ? "completed" : child.level === 3 ? "current" : "locked", stars: 0 },
              { id: "lvl-4", number: 4, status: child.level > 4 ? "completed" : child.level === 4 ? "current" : "locked", stars: 0 },
              { id: "lvl-5", number: 5, status: child.level > 5 ? "completed" : child.level === 5 ? "current" : "locked", stars: 0 },
            ]}
            onSelectLevel={(levelObj) => {
               navigate(`/main/quiz`);
            }} 
          />
        </div>
      </div>
    </MainLayout>
  )
}
