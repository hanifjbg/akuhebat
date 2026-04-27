import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MainLayout } from "../../../ui/templates/MainLayout"
import { Avatar, AvatarFallback, AvatarImage, Button } from "../../../ui/atoms"
import { Plus, Trash2 } from "lucide-react"
import { useSimulatorStore } from "../../../shared/store/simulator"
import { AddChildModal } from "../../../ui/organisms/AddChildModal"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../../ui/molecules/AlertDialog"

export function ProfilesPage() {
  const { globalState } = useSimulatorStore();
  const [isAdding, setIsAdding] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [childToDelete, setChildToDelete] = React.useState<{id: number, name: string} | null>(null);

  const mockProfiles = [
    { id: 1, name: "Budi", color: "bg-blue-400", avatar: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=budi", level: 1 },
    { id: 2, name: "Siti", color: "bg-pink-400", avatar: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=siti", level: 2 }
  ];

  const isEmpty = globalState === 'empty';

  const handleAddSave = (name: string, avatarUrl: string) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsAdding(false);
      alert(`Berhasil menambah ${name}`);
    }, 1000);
  };
  
  const handleDeleteConfirm = () => {
    if (!childToDelete) return;
    setChildToDelete(null);
    alert('Profil dihapus (mock).');
  };

  return (
    <MainLayout showTopBar={false} showBottomBar={false}>
      <div className="flex-1 w-full h-full flex flex-col items-center justify-center p-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 dark:bg-blue-900/20 blur-3xl" />
          <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-yellow-100/50 dark:bg-yellow-900/20 blur-3xl" />
          <div className="absolute -bottom-[10%] left-[20%] w-[70%] h-[70%] rounded-full bg-pink-100/50 dark:bg-pink-900/20 blur-3xl" />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center">
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-12 text-center">
            Siapa yang mau main?
          </h1>
          
          {globalState === 'loading' ? (
            <div className="flex gap-6">
              <div className="w-28 h-36 bg-slate-200 dark:bg-slate-800 rounded-clay animate-pulse" />
              <div className="w-28 h-36 bg-slate-200 dark:bg-slate-800 rounded-clay animate-pulse" />
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 max-w-lg">
              <AnimatePresence>
                {!isEmpty && mockProfiles.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    className="flex flex-col items-center gap-3 cursor-pointer group relative"
                  >
                    <div>
                      <Avatar className="w-28 h-28 border-4 border-white dark:border-slate-800 shadow-clay-md group-hover:scale-105 group-active:scale-95 transition-transform bg-blue-100 dark:bg-blue-900/30">
                        <AvatarImage src={p.avatar} />
                        <AvatarFallback className="text-3xl font-bold">{p.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="font-bold text-xl text-slate-700 dark:text-slate-200">{p.name}</span>
                    <span className="text-sm font-semibold text-orange-500 dark:text-orange-400 -mt-2">Level {p.level}</span>
                    
                    {/* Delete Button */}
                    <Button 
                      size="icon" 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                      onClick={(e) => { e.stopPropagation(); setChildToDelete({ id: p.id, name: p.name }); }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: isEmpty ? 0 : mockProfiles.length * 0.1, type: "spring" }}
                className="flex flex-col items-center gap-3 cursor-pointer group"
                onClick={() => setIsAdding(true)}
              >
                <div className="w-28 h-28 rounded-full border-4 border-white/50 dark:border-slate-600 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md flex items-center justify-center shadow-inner group-hover:scale-105 group-active:scale-95 transition-transform">
                  <Plus className="w-12 h-12 text-slate-500 font-bold" strokeWidth={3} />
                </div>
                <span className="font-bold text-xl text-slate-500 dark:text-slate-400">Tambah</span>
              </motion.div>
            </div>
          )}
        </div>

        <AddChildModal 
          isOpen={isAdding} 
          onClose={() => setIsAdding(false)} 
          onSave={handleAddSave} 
          isSaving={isSaving} 
        />
        
        <AlertDialog open={!!childToDelete} onOpenChange={(open) => !open && setChildToDelete(null)}>
          <AlertDialogContent className="rounded-[2rem]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold">Hapus Profil Anak</AlertDialogTitle>
              <AlertDialogDescription className="text-lg">
                Apakah Anda yakin ingin menghapus profil <strong>{childToDelete?.name}</strong>? Semua progres dan data akan hilang permanen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 flex-row gap-2">
              <AlertDialogCancel className="w-full rounded-xl m-0 h-12">Batal</AlertDialogCancel>
              <AlertDialogAction className="w-full rounded-xl m-0 h-12 bg-red-500 hover:bg-red-600 text-white" onClick={handleDeleteConfirm}>Ya, Hapus</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </MainLayout>
  )
}
