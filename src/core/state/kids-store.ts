import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface KidsSessionState {
  activeChildId: string | null;
  setActiveChild: (id: string) => void;
  clearSession: () => void;
}

export const useKidsSessionStore = create<KidsSessionState>()(
  persist(
    (set) => ({
      activeChildId: null,
      setActiveChild: (id) => set({ activeChildId: id }),
      clearSession: () => set({ activeChildId: null }),
    }),
    {
      name: 'kids-session-storage',
    }
  )
);
