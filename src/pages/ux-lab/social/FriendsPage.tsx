import * as React from "react"
import { motion } from "framer-motion"
import { MainLayout } from "../../../ui/templates/MainLayout"
import { FriendCard } from "../../../ui/organisms/FriendCard"
import { useSimulatorStore } from "../../../shared/store/simulator"
import { Spinner, Button, Input } from "../../../ui/atoms"
import { SearchBar, Tabs, TabsList, TabsTrigger, TabsContent } from "../../../ui/molecules"
import { Users, UserPlus } from "lucide-react"

export function FriendsPage() {
  const { globalState } = useSimulatorStore();

  const mockFriends = [
    { id: "1", name: "Rina", level: 5, status: "online" as const, relation: "friend" as const, avatar: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=rina" },
    { id: "2", name: "Dito", level: 4, status: "playing" as const, relation: "friend" as const, avatar: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=dito" },
    { id: "3", name: "Siti", level: 6, status: "offline" as const, relation: "friend" as const, avatar: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=siti" },
  ];

  return (
    <MainLayout 
      activeTab="profile"
      topBarProps={{
        userName: "HANIF",
        title: "Teman Mabar",
        avatarSrc: "https://api.dicebear.com/7.x/notionists/svg?seed=Hanif&backgroundColor=f472b6"
      }}
    >
      <div className="flex-1 w-full h-full flex flex-col p-4 pt-8 pb-32 overflow-y-auto no-scrollbar">
        
        <div className="flex items-center justify-between mb-6 pt-4">
          <Button variant="outline" className="rounded-full shadow-clay-sm w-full font-bold flex items-center justify-center gap-2 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200">
            <UserPlus className="w-5 h-5 text-primary" />
            Tambah Teman Baru
          </Button>
        </div>

        <SearchBar 
          placeholder="Cari teman..." 
          onSearch={() => {}} 
          className="mb-8"
        />

        <Tabs defaultValue="friends" className="w-full">
          <TabsList className="w-full mb-6 max-w-[300px] mx-auto grid grid-cols-2">
            <TabsTrigger value="friends">Daftar Teman</TabsTrigger>
            <TabsTrigger value="requests">Permintaan (1)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="friends" className="space-y-4">
            {globalState === 'loading' ? (
              <div className="flex flex-col items-center gap-4 py-12">
                <Spinner size="lg" />
                <p className="font-bold text-slate-500">Mencari teman...</p>
              </div>
            ) : globalState === 'empty' ? (
              <div className="text-center py-12 border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-clay-lg">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="font-bold text-slate-500 mb-4">Kamu belum punya teman nih!</p>
                <Button variant="primary">Tambah Teman</Button>
              </div>
            ) : globalState === 'error' ? (
              <div className="text-center py-12 font-bold text-red-500">Gagal memuat daftar teman.</div>
            ) : (
              mockFriends.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <FriendCard
                    friendId={f.id}
                    name={f.name}
                    level={f.level}
                    status={f.status}
                    relation={f.relation}
                    avatarSrc={f.avatar}
                    onChallenge={() => {}}
                    onRemoveFriend={() => {}}
                  />
                </motion.div>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="requests">
             <div className="text-center py-12 border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-clay-lg">
                <p className="font-bold text-slate-500">Belum ada permintaan pertemanan.</p>
              </div>
          </TabsContent>
        </Tabs>

      </div>
    </MainLayout>
  )
}
