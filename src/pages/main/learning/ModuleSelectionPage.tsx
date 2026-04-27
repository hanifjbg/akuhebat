import * as React from "react"
import { useNavigate } from "react-router-dom"
import { MainLayout } from "../../../ui/templates/MainLayout"
import { ModuleMap, ModuleNode } from "../../../ui/organisms/ModuleMap"
import { useLearningStore } from "../../../modules/learning/store"
import { ChildProfile } from "../../../core/state/parent-store"
import { useKidsSessionStore } from "../../../core/state/kids-store"

export function ModuleSelectionPage({ child }: { child: ChildProfile }) {
  const navigate = useNavigate();
  const { modules, loading, initialize, error } = useLearningStore();
  const { activeChildId } = useKidsSessionStore();

  React.useEffect(() => {
    initialize();
  }, [initialize]);

  const moduleNodes: ModuleNode[] = modules.map(m => {
     let status: "locked" | "available" | "completed" = "locked";
     
     // Logic for status
     const isUnlocked = child.unlockedModuleIds?.includes(m.id) || m.order === 1; // First module always open
     const isCompleted = (child.completedLessonIds?.length ?? 0) > 0; // Simplified for now
     
     if (isUnlocked) status = "available";
     if (child.level < m.requiredLevel) status = "locked"; // Explicit level check
     
     return {
       id: m.id,
       title: m.title,
       description: m.description,
       order: m.order,
       status,
       icon: m.icon
     };
  });

  return (
    <MainLayout 
      activeTab="play"
      bgClassName="bg-slate-50 dark:bg-slate-900"
      topBarProps={{
        title: "Arena Belajar",
        userName: child.name,
        avatarSrc: child.avatarUrl,
        showBackButton: true,
        onBackClick: () => navigate("/main/dashboard")
      }}
    >
      <div className="flex-1 w-full max-w-4xl mx-auto p-4 pb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
             <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="font-black text-slate-400">Membuka Tas Sekolah...</p>
          </div>
        ) : error ? (
           <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
              <p className="text-red-500 font-bold">{error}</p>
              <button 
                onClick={() => initialize()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold"
              >
                Coba Lagi
              </button>
           </div>
        ) : modules.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
             <span className="text-6xl">🏜️</span>
             <p className="font-black text-slate-400">Wah, Arena Belajar masih kosong!</p>
             <button 
               onClick={() => initialize()}
               className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold"
             >
               Muat Ulang
             </button>
          </div>
        ) : (
          <ModuleMap 
            modules={moduleNodes}
            onSelect={(mod) => navigate(`/main/learning/module/${mod.id}`)}
          />
        )}
      </div>
    </MainLayout>
  )
}
