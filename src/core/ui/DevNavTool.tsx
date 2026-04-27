import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Beaker, Map, Shield, Moon, Sun } from 'lucide-react';
import { useSimulatorStore } from '../../shared/store/simulator';

export function DevNavTool() {
  const [isOpen, setIsOpen] = useState(false);
  const { globalState, setGlobalState, isDarkMode, toggleDarkMode } = useSimulatorStore();

  // Only render in development
  if (!import.meta.env.DEV) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] font-sans">
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
                  <a href="/ux-lab/social/friends" onClick={() => setIsOpen(false)} className="col-span-2 px-3 py-2 text-sm bg-slate-50 hover:bg-slate-100 rounded-lg">Teman Mabar</a>
                  <a href="/ux-lab/social/leaderboard" onClick={() => setIsOpen(false)} className="col-span-2 px-3 py-2 text-sm bg-slate-50 hover:bg-slate-100 rounded-lg">Papan Juara</a>
                  <a href="/ux-lab/versus/arena" onClick={() => setIsOpen(false)} className="col-span-2 px-3 py-2 text-sm bg-slate-50 hover:bg-slate-100 rounded-lg">Arena Duel</a>
                  <a href="/ux-lab/minigames/memory" onClick={() => setIsOpen(false)} className="col-span-2 px-3 py-2 text-sm bg-slate-50 hover:bg-slate-100 rounded-lg">Kartu Memori</a>
                  <a href="/ux-lab/minigames/words" onClick={() => setIsOpen(false)} className="col-span-2 px-3 py-2 text-sm bg-slate-50 hover:bg-slate-100 rounded-lg">Susun Kata</a>
                  <a href="/ux-lab/minigames/coloring" onClick={() => setIsOpen(false)} className="col-span-2 px-3 py-2 text-sm bg-slate-50 hover:bg-slate-100 rounded-lg">Mewarnai</a>
                  <a href="/ux-lab/fullscreen/story" onClick={() => setIsOpen(false)} className="col-span-2 px-3 py-2 text-sm bg-slate-50 hover:bg-slate-100 rounded-lg">Buku Cerita</a>
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
