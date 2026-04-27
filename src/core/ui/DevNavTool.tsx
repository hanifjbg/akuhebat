import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Beaker, Map, Shield, Moon, Sun, FastForward, Unlock } from 'lucide-react';
import { useSimulatorStore } from '../../shared/store/simulator';
import { useQuizSessionStore } from '../../modules/quiz-engine/store';
import { useKidsSessionStore } from '../state/kids-store';
import { useParentAuthStore } from '../state/parent-store';
import { updateChildProfile } from '../../modules/auth/kids-profiles';

export function DevNavTool() {
  const [isOpen, setIsOpen] = useState(false);
  const { globalState, setGlobalState, isDarkMode, toggleDarkMode } = useSimulatorStore();

  const handleBypassQuiz = () => {
     // artificially set score to max and current index to end
     const store = useQuizSessionStore.getState();
     if (store.questions.length > 0) {
       useQuizSessionStore.setState({ 
         currentIndex: store.questions.length,
         score: 100 
       });
     } else {
        alert("Sesi Kuis belum dimulai.");
     }
  };

  const handleLevelUp = () => {
    // Add 1000 EXP to test gamification level up
    import("../../core/event-bus").then(({ eventBus, EVENTS }) => {
       eventBus.emit(EVENTS.QUIZ_COMPLETED, { score: 1000, totalQuestions: 1 });
       alert("1000 EXP Disimulasikan! Cek Profil.");
    });
  };

  const handleUnlockMap = async () => {
     const { activeChildId } = useKidsSessionStore.getState();
     const { firebaseUser } = useParentAuthStore.getState();
     
     if (!activeChildId || !firebaseUser) {
        alert("Pilih profil anak dulu dari halaman Home");
        return;
     }

     try {
       await updateChildProfile(firebaseUser.uid, activeChildId, { level: 5 });
       alert("Map Terbuka! Level di set ke 5.");
     } catch (e) {
       alert("Gagal membuka map");
     }
  };

  return (
    <div className="fixed bottom-24 right-4 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 bg-white/90 backdrop-blur-md rounded-2xl shadow-clay-lg border border-white/50 p-4 text-slate-800"
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Beaker className="w-5 h-5 text-primary" /> UX-Lab Panel
              </h3>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-100 rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                 <h4 className="text-sm font-semibold mb-2 text-slate-500">QA Actions (Anywhere)</h4>
                 <div className="grid grid-cols-2 gap-2 mb-4">
                   <button onClick={handleBypassQuiz} className="px-3 py-2 text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg flex flex-col items-center gap-1 font-bold">
                     <FastForward className="w-4 h-4" /> Bypass Kuis
                   </button>
                   <button onClick={handleLevelUp} className="px-3 py-2 text-sm bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-lg flex flex-col items-center gap-1 font-bold">
                     <Sun className="w-4 h-4" /> +1000 EXP
                   </button>
                   <button onClick={handleUnlockMap} className="col-span-2 px-3 py-2 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg flex items-center justify-center gap-2 font-bold">
                     <Unlock className="w-4 h-4" /> Unlock All Map Levels
                   </button>
                 </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2 text-slate-500">Navigation</h4>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto no-scrollbar pr-2 pb-2">
                  <a href="/main" onClick={() => setIsOpen(false)} className="px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-2">
                    <Map className="w-4 h-4" /> /main
                  </a>
                  <a href="/admin" onClick={() => setIsOpen(false)} className="px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-2">
                    <Shield className="w-4 h-4" /> /admin
                  </a>
                  <a href="/ux-lab" onClick={() => setIsOpen(false)} className="col-span-2 px-3 py-2 text-sm bg-primary/10 text-primary hover:bg-primary/20 rounded-lg flex items-center gap-2 font-medium">
                    <Beaker className="w-4 h-4" /> Components Index
                  </a>
                  
                  <div className="col-span-2 mt-2 font-semibold text-xs text-slate-400">PAGES</div>
                  <a href="/ux-lab/auth/login" onClick={() => setIsOpen(false)} className="col-span-2 px-3 py-2 text-sm bg-slate-50 hover:bg-slate-100 rounded-lg">Login / Parental Gate</a>
                  <a href="/ux-lab/auth/profiles" onClick={() => setIsOpen(false)} className="col-span-2 px-3 py-2 text-sm bg-slate-50 hover:bg-slate-100 rounded-lg">Pilih Anak</a>
                  <a href="/ux-lab/learning/dashboard" onClick={() => setIsOpen(false)} className="col-span-2 px-3 py-2 text-sm bg-slate-50 hover:bg-slate-100 rounded-lg font-bold text-primary">Home Dashboard</a>
                  <a href="/ux-lab/learning/map" onClick={() => setIsOpen(false)} className="col-span-2 px-3 py-2 text-sm bg-slate-50 hover:bg-slate-100 rounded-lg">Peta Level</a>
                  <a href="/ux-lab/learning/quiz" onClick={() => setIsOpen(false)} className="col-span-2 px-3 py-2 text-sm bg-slate-50 hover:bg-slate-100 rounded-lg">Layar Kuis</a>
                  <a href="/ux-lab/admin/dashboard" onClick={() => setIsOpen(false)} className="col-span-2 px-3 py-2 text-sm bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg font-bold">Admin/Parent Dashboard</a>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2 text-slate-500">Theme & Global State</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  <button
                    onClick={toggleDarkMode}
                    className="px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-2 bg-slate-800 text-white shadow-clay-sm hover:shadow-clay-md"
                  >
                    {isDarkMode ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(['normal', 'loading', 'error', 'empty'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setGlobalState(s)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full capitalize transition-colors ${
                        globalState === s 
                          ? 'bg-slate-800 text-white shadow-clay-pressed' 
                          : 'bg-white shadow-clay-sm hover:shadow-clay-md border border-slate-100 text-slate-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-clay-md hover:shadow-clay-lg transition-shadow border-2 border-white text-slate-800"
      >
        <Settings className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
    </div>
  );
}
