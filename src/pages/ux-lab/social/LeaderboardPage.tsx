import * as React from "react"
import { motion } from "framer-motion"
import { MainLayout } from "../../../ui/templates/MainLayout"
import { LeaderboardTable } from "../../../ui/organisms/LeaderboardTable"
import { useSimulatorStore } from "../../../shared/store/simulator"
import { Spinner } from "../../../ui/atoms"
import { Trophy } from "lucide-react"

export function LeaderboardPage() {
  const { globalState } = useSimulatorStore();

  const mockEntries = [
    { id: "4", rank: 1, name: "JuaraSatu", score: 5500, avatarSrc: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=j1" },
    { id: "5", rank: 2, name: "Binta", score: 4200, avatarSrc: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=binta" },
    { id: "1", rank: 3, name: "Budi", score: 3800, avatarSrc: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=budi", isCurrentUser: true },
    { id: "2", rank: 4, name: "Siti", score: 2100, avatarSrc: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=siti" },
    { id: "3", rank: 5, name: "Rina", score: 1500, avatarSrc: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=rina" },
  ];

  return (
    <MainLayout 
      activeTab="leaderboard"
      topBarProps={{
        userName: "HANIF",
        title: "Papan Juara",
        avatarSrc: "https://api.dicebear.com/7.x/notionists/svg?seed=Hanif&backgroundColor=f472b6"
      }}
    >
      <div className="flex-1 w-full h-full flex flex-col p-4 pt-8 pb-32 bg-gradient-to-b from-yellow-50/50 to-transparent dark:from-yellow-900/10 dark:to-transparent overflow-y-auto no-scrollbar">
        
        <div className="text-center mb-8 relative pt-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-24 h-24 mx-auto bg-yellow-400 rounded-full flex items-center justify-center shadow-clay-lg border-4 border-white mb-4 relative z-10"
          >
            <Trophy className="w-12 h-12 text-white fill-white drop-shadow-sm" />
          </motion.div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Papan Juara!</h1>
          
          {/* Confetti simulation using CSS or simple shapes could go here */}
        </div>

        <div className="flex-1 flex justify-center pb-8">
          {globalState === 'loading' ? (
            <div className="flex flex-col items-center gap-4 py-12">
              <Spinner size="lg" />
              <p className="font-bold text-slate-500">Menyusun peringkat...</p>
            </div>
          ) : globalState === 'empty' ? (
             <div className="text-center py-12">
                <p className="font-bold text-slate-500">Belum ada juara minggu ini. Yuk main!</p>
              </div>
          ) : globalState === 'error' ? (
            <div className="text-center py-12 font-bold text-red-500">Gagal memuat papan juara.</div>
          ) : (
            <LeaderboardTable entries={mockEntries} />
          )}
        </div>

      </div>
    </MainLayout>
  )
}
