import * as React from "react"
import { motion } from "framer-motion"
import { MainLayout } from "../../../ui/templates/MainLayout"
import { LeaderboardTable } from "../../../ui/organisms/LeaderboardTable"
import { Trophy } from "lucide-react"

export function LeaderboardPage({ child }: { child: any }) {

  // Replace with real leaderboard fetching in the future
  const mockEntries = [
    { id: child.id, rank: 1, name: child.name, score: child.exp, avatarSrc: child.avatar, isCurrentUser: true },
    { id: "5", rank: 2, name: "Binta", score: 4200, avatarSrc: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=binta" },
    { id: "2", rank: 3, name: "Siti", score: 2100, avatarSrc: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=siti" },
  ].sort((a,b) => b.score - a.score).map((v, i) => ({ ...v, rank: i+1 }));

  return (
    <MainLayout 
      activeTab="leaderboard"
      bgClassName="bg-gradient-to-b from-yellow-50/50 to-transparent dark:from-yellow-900/10 dark:to-transparent"
      topBarProps={{
        userName: child.name,
        title: "Papan Juara",
        avatarSrc: child.avatar || "https://api.dicebear.com/7.x/notionists/svg?seed="+child.name,
        stars: child.stars,
        level: child.level
      }}
    >
      <div className="flex-1 w-full flex flex-col p-4 pt-8 pb-32">
        
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
        </div>

        <div className="flex-1 flex justify-center pb-8">
           <LeaderboardTable entries={mockEntries} />
        </div>

      </div>
    </MainLayout>
  )
}
