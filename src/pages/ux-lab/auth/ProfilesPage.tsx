import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MainLayout } from "../../../ui/templates/MainLayout"
import { Avatar, AvatarFallback, AvatarImage, Button } from "../../../ui/atoms"
import { Plus } from "lucide-react"
import { useSimulatorStore } from "../../../shared/store/simulator"

export function ProfilesPage() {
  const { globalState } = useSimulatorStore();

  const mockProfiles = [
    { id: 1, name: "Budi", color: "bg-blue-400", avatar: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=budi" },
    { id: 2, name: "Siti", color: "bg-pink-400", avatar: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=siti" }
  ];

  const isEmpty = globalState === 'empty';

  return (
    <MainLayout showTopBar={false} showBottomBar={false}>
      <div className="flex-1 w-full h-full flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-12 text-center">
          Siapa yang mau main?
        </h1>
        
        {globalState === 'loading' ? (
          <div className="flex gap-6">
            <div className="w-28 h-36 bg-slate-200 dark:bg-slate-800 rounded-clay animate-pulse" />
            <div className="w-28 h-36 bg-slate-200 dark:bg-slate-800 rounded-clay animate-pulse" />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6 max-w-sm">
            <AnimatePresence>
              {!isEmpty && mockProfiles.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="flex flex-col items-center gap-3 cursor-pointer group"
                >
                  <Avatar className="w-28 h-28 border-4 border-white dark:border-slate-800 shadow-clay-md group-hover:scale-105 group-active:scale-95 transition-transform">
                    <AvatarImage src={p.avatar} />
                    <AvatarFallback className="text-3xl font-bold">{p.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-bold text-xl text-slate-700 dark:text-slate-200">{p.name}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: isEmpty ? 0 : mockProfiles.length * 0.1, type: "spring" }}
              className="flex flex-col items-center gap-3 cursor-pointer group"
            >
              <div className="w-28 h-28 rounded-full border-4 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 flex items-center justify-center shadow-inner group-hover:scale-105 group-active:scale-95 transition-transform">
                <Plus className="w-12 h-12 text-slate-400" strokeWidth={3} />
              </div>
              <span className="font-bold text-xl text-slate-500 dark:text-slate-400">Tambah</span>
            </motion.div>
          </div>
        )}

      </div>
    </MainLayout>
  )
}
