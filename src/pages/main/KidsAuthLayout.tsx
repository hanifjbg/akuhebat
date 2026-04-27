import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useParentAuthStore } from '../../core/state/parent-store';
import { useKidsSessionStore } from '../../core/state/kids-store';
import { loginWithGoogle, loginAnonymously } from '../../modules/auth/index';
import { createChildProfile, deleteChildProfile } from '../../modules/auth/kids-profiles';
import { Button } from '../../ui/atoms/Button';
import { Divider } from '../../ui/atoms/Divider';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/atoms/Avatar';
import { MainLayout } from '../../ui/templates/MainLayout';
import { AddChildModal } from '../../ui/organisms/AddChildModal';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../ui/molecules/AlertDialog';
import { Rocket, Gamepad2, Plus, Trash2 } from 'lucide-react';

export function KidsAuthLayout() {
  const { firebaseUser, children } = useParentAuthStore();
  
  if (!firebaseUser) {
    return <LoginScreen />;
  }
  
  return <SelectChildScreen childrenList={children} parentId={firebaseUser.uid} />;
}

function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    setLoading(true);
    await loginWithGoogle();
    setLoading(false);
  };
  
  return (
    <MainLayout showTopBar={false} showBottomBar={false}>
      <div className="flex-1 w-full h-full flex flex-col items-center justify-center p-6 pb-20 relative">
        
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 dark:bg-blue-900/20 blur-3xl" />
          <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-yellow-100/50 dark:bg-yellow-900/20 blur-3xl" />
          <div className="absolute -bottom-[10%] left-[20%] w-[70%] h-[70%] rounded-full bg-pink-100/50 dark:bg-pink-900/20 blur-3xl" />
        </div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="w-full max-w-sm mt-16 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(212,196,175,0.6)] dark:shadow-none border-[6px] border-white/50 dark:border-slate-700/50 p-8 pt-16 relative z-10 flex flex-col items-center"
        >
          {/* OVERLAPPING / BREAKOUT LOGO */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 flex items-center justify-center z-20">
             <img src="/logo.webp" alt="Aku Hebat Logo" className="w-full h-full object-contain filter drop-shadow-xl hover:scale-105 transition-transform duration-300" />
          </div>

          <div className="text-center mb-8 w-full mt-8">
            <p className="font-bold text-lg text-slate-500 dark:text-slate-400">Siap untuk belajar & bermain?</p>
          </div>

          <div className="space-y-4 w-full">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full rounded-2xl h-14 text-lg border-2 shadow-clay-sm bg-white/80 backdrop-blur" 
              isLoading={loading}
              onClick={handleLogin}
            >
              <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Masuk dengan Google
            </Button>
          </div>

          <div className="relative my-6 w-full flex items-center justify-center">
            <Divider className="absolute inset-x-0 w-full top-1/2 -translate-y-1/2" />
            <span className="bg-white/90 dark:bg-slate-800/90 relative px-4 text-sm font-bold text-slate-400">ATAU</span>
          </div>

          <Button 
            variant="outline" 
            size="lg" 
            className="w-full rounded-2xl h-14 text-lg border-2 bg-white/80 backdrop-blur"
            isLoading={loading}
            onClick={async () => {
              setLoading(true);
              await loginAnonymously();
              setLoading(false);
            }}
          >
            <Gamepad2 className="w-6 h-6 mr-2 text-slate-500" />
            Main sebagai Tamu
          </Button>
        </motion.div>
      </div>
    </MainLayout>
  );
}

function SelectChildScreen({ childrenList, parentId }: { childrenList: any[], parentId: string }) {
  const { setActiveChild } = useKidsSessionStore();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [childToDelete, setChildToDelete] = useState<{id: string, name: string} | null>(null);

  const handleSelect = (id: string) => {
    setActiveChild(id);
    navigate('/main/dashboard');
  };

  const handleAddSave = async (name: string, avatarUrl: string) => {
    setIsSaving(true);
    await createChildProfile(parentId, {
      name,
      avatarUrl,
      level: 1,
      exp: 0,
      stars: 0
    });
    setIsSaving(false);
    setIsAdding(false);
  };
  
  const handleDeleteConfirm = async () => {
    if (!childToDelete) return;
    await deleteChildProfile(parentId, childToDelete.id);
    setChildToDelete(null);
  };

  const isEmpty = childrenList.length === 0;

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
          
          <div className="flex flex-wrap justify-center gap-6 max-w-lg">
            <AnimatePresence>
              {!isEmpty && childrenList.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="flex flex-col items-center gap-3 cursor-pointer group relative"
                >
                  <div onClick={() => handleSelect(p.id)}>
                    <Avatar className="w-28 h-28 border-4 border-white dark:border-slate-800 shadow-clay-md group-hover:scale-105 group-active:scale-95 transition-transform bg-blue-100 dark:bg-blue-900/30">
                      <AvatarImage src={p.avatarUrl} />
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
              transition={{ delay: isEmpty ? 0 : childrenList.length * 0.1, type: "spring" }}
              className="flex flex-col items-center gap-3 cursor-pointer group"
              onClick={() => setIsAdding(true)}
            >
              <div className="w-28 h-28 rounded-full border-4 border-white/50 dark:border-slate-600 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md flex items-center justify-center shadow-inner group-hover:scale-105 group-active:scale-95 transition-transform">
                <Plus className="w-12 h-12 text-slate-500 font-bold" strokeWidth={3} />
              </div>
              <span className="font-bold text-xl text-slate-500 dark:text-slate-400">Tambah</span>
            </motion.div>
          </div>
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
  );
}

