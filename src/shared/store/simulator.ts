import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AppState = 'normal' | 'loading' | 'error' | 'empty';

interface SimulatorState {
  globalState: AppState;
  setGlobalState: (state: AppState) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useSimulatorStore = create<SimulatorState>()(
  persist(
    (set) => ({
      globalState: 'normal',
      setGlobalState: (state) => set({ globalState: state }),
      isDarkMode: false,
      toggleDarkMode: () => set((state) => {
        const next = !state.isDarkMode;
        if (next) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { isDarkMode: next };
      }),
    }),
    {
      name: 'aku-hebat-simulator-storage',
      partialize: (state) => ({ isDarkMode: state.isDarkMode }),
    }
  )
);
