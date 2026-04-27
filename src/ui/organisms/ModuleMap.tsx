import * as React from "react"
import { motion } from "framer-motion"
import { Lock, Play, BookOpen, Star, Trophy } from "lucide-react"
import { cn } from "../../shared/utils"

export interface ModuleNode {
  id: string
  title: string
  description: string
  status: "locked" | "available" | "completed"
  order: number
  icon?: string
}

interface ModuleMapProps {
  modules: ModuleNode[]
  onSelect: (mod: ModuleNode) => void
}

export function ModuleMap({ modules, onSelect }: ModuleMapProps) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto py-6">
      {modules.map((mod, idx) => (
        <motion.div
          key={mod.id}
          initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          onClick={() => mod.status !== "locked" && onSelect(mod)}
          className={cn(
            "relative group overflow-hidden rounded-clay-lg p-6 flex items-center gap-6 border-4 transition-all cursor-pointer",
            mod.status === "locked" 
              ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-80" 
              : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 shadow-clay-lg hover:shadow-clay-xl active:scale-95"
          )}
        >
          {/* Status Icon */}
          <div className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center shrink-0 shadow-inner",
            mod.status === "locked" ? "bg-slate-200 dark:bg-slate-700" : "bg-blue-100 dark:bg-blue-900/30 text-blue-500"
          )}>
            {mod.status === "locked" ? (
              <Lock className="w-10 h-10 text-slate-400" />
            ) : mod.status === "completed" ? (
               <Trophy className="w-10 h-10 text-yellow-500" />
            ) : (
               <Play className="w-10 h-10 fill-blue-500" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
               <div>
                  <span className="text-xs font-black text-blue-400 uppercase tracking-widest block mb-1">Modul {mod.order}</span>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-tight">
                    {mod.title}
                  </h3>
               </div>
               {mod.status === "completed" && (
                 <div className="bg-green-100 text-green-600 text-[10px] px-2 py-0.5 rounded-full font-black uppercase">Lulus!</div>
               )}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-bold line-clamp-1">
              {mod.description}
            </p>
          </div>

          {/* Badge indicator for next lesson */}
          {mod.status === "available" && (
             <div className="absolute top-4 right-4 animate-bounce">
                <BookOpen className="w-6 h-6 text-orange-400" />
             </div>
          )}

          {/* Locked Overlay Text */}
          {mod.status === "locked" && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100/40 backdrop-blur-[2px]">
               <div className="bg-slate-800 text-white text-[10px] px-3 py-1 rounded-full font-black flex items-center gap-1.5 shadow-lg">
                  <Lock className="w-3 h-3" /> BELUM TERBUKA
               </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
