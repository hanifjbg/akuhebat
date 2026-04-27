import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from 'firebase/auth';

export interface ChildProfile {
  id: string;
  parentId: string;
  name: string;
  avatarUrl: string;
  level: number;
  exp: number;
  stars: number;
  unlockedModuleIds?: string[];
  completedLessonIds?: string[];
  createdAt: number;
}

interface ParentAuthState {
  isAuthenticated: boolean;
  pin: string | null;
  firebaseUser: User | null;
  children: ChildProfile[];
  setFirebaseUser: (user: User | null) => void;
  loginPin: (pin: string) => void;
  logout: () => void;
  setChildren: (children: ChildProfile[]) => void;
}

export const useParentAuthStore = create<ParentAuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      pin: null,
      firebaseUser: null,
      children: [],
      setFirebaseUser: (user) => set({ firebaseUser: user }),
      loginPin: (pin) => set({ isAuthenticated: true, pin }),
      logout: () => set({ isAuthenticated: false, pin: null, firebaseUser: null, children: [] }),
      setChildren: (children) => set({ children }),
    }),
    {
      name: 'parent-auth-storage',
      partialize: (state) => ({ pin: state.pin, isAuthenticated: state.isAuthenticated }), // Only persist pin/auth state
    }
  )
);
