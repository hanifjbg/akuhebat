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
      topBarProps={{
        userName: child.name,
        avatarSrc: child.avatarUrl,
        showBackButton: true,
        onBack: () => navigate("/main/dashboard")
      }}
    >
      <div className="flex-1 w-full h-full relative overflow-hidden bg-sky-200 dark:bg-slate-900">
        <LevelMap 
          currentLevel={child.level}
          onSelectLevel={(levelId) => {
             // Just navigating to global quiz for now
             navigate(`/main/quiz`);
          }} 
        />
      </div>
    </MainLayout>
  )
}
