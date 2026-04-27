import * as React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MainLayout } from "../../../ui/templates/MainLayout"
import { useLearningStore } from "../../../modules/learning/store"
import { ChildProfile } from "../../../core/state/parent-store"
import { BookOpen, CheckCircle, Lock, PlayCircle } from "lucide-react"
import { cn } from "../../../shared/utils"

export function LessonListPage({ child }: { child: ChildProfile }) {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { modules, lessons, fetchLessons, loading } = useLearningStore();

  const activeModule = modules.find(m => m.id === moduleId);
  const moduleLessons = moduleId ? lessons[moduleId] || [] : [];

  React.useEffect(() => {
    if (moduleId) fetchLessons(moduleId);
  }, [moduleId, fetchLessons]);

  if (!activeModule) return null;

  return (
    <MainLayout 
      activeTab="play"
      bgClassName="bg-slate-50 dark:bg-slate-900"
      topBarProps={{
        title: activeModule.title,
        userName: child.name,
        avatarSrc: child.avatarUrl,
        showBackButton: true,
        onBackClick: () => navigate("/main/dashboard")
      }}
    >
      <div className="flex-1 w-full max-w-2xl mx-auto p-4 pb-32">
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 mb-6 shadow-clay-sm border-2 border-slate-100 dark:border-slate-700">
           <div className="flex items-center gap-4">
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shadow-clay-sm text-white", activeModule.color)}>
                 <BookOpen className="w-8 h-8" />
              </div>
              <div>
                 <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase leading-none mb-1">{activeModule.title}</h2>
                 <p className="text-sm font-bold text-slate-400">{moduleLessons.length} Pelajaran Seru</p>
              </div>
           </div>
        </div>

        <div className="flex flex-col gap-4">
           {moduleLessons.map((les, idx) => {
             const isCompleted = child.completedLessonIds?.includes(les.id);
             const isLocked = idx > 0 && !child.completedLessonIds?.includes(moduleLessons[idx - 1].id);

             return (
                <div 
                  key={les.id}
                  onClick={() => !isLocked && navigate(`/main/learning/lesson/${les.id}`)}
                  className={cn(
                    "group p-4 pr-6 rounded-[2rem] flex items-center gap-5 border-3 transition-all relative overflow-hidden",
                    isLocked 
                     ? "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 opacity-60 cursor-not-allowed" 
                     : isCompleted 
                       ? "bg-green-50/50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30 cursor-pointer"
                       : "bg-white dark:bg-slate-800 border-white dark:border-slate-700 shadow-clay-sm cursor-pointer hover:border-primary/50"
                  )}
                >
                  <div className={cn(
                     "w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-clay-sm relative z-10",
                     isCompleted ? "bg-green-500 text-white" : isLocked ? "bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600" : "bg-white dark:bg-slate-700 text-slate-800 dark:text-white border-2 border-slate-100 dark:border-slate-600"
                  )}>
                    {isCompleted ? <CheckCircle className="w-8 h-8" /> : isLocked ? <Lock className="w-6 h-6" /> : idx + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">LEVEL {idx + 1}</div>
                     <h4 className="text-lg font-black text-slate-800 dark:text-white leading-tight">{les.title}</h4>
                  </div>

                  {!isLocked && (
                     <div className={cn(
                       "w-10 h-10 rounded-full flex items-center justify-center shadow-clay-sm transition-all group-hover:scale-110",
                       isCompleted ? "bg-green-100 text-green-600" : "bg-primary text-white"
                     )}>
                        <PlayCircle className="w-6 h-6 ml-0.5" />
                     </div>
                  )}
                  
                  {isCompleted && (
                     <div className="absolute -top-4 -right-4 opacity-10 rotate-12">
                        <CheckCircle className="w-20 h-20 text-green-500" />
                     </div>
                  )}
                </div>
             )
           })}
        </div>
      </div>
    </MainLayout>
  )
}
