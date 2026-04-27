import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChildProfile {
  id: string;
  name: string;
  avatarUrl: string;
  level: number;
  exp: number;
  stars: number;
}

interface ParentAuthState {
  isAuthenticated: boolean;
  pin: string | null;
  children: ChildProfile[];
  login: (pin: string) => void;
  logout: () => void;
  addChild: (child: Omit<ChildProfile, 'id'>) => void;
}

export const useParentAuthStore = create<ParentAuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      pin: null, // Should be verified securely, but simple for now
      children: [
        { id: '1', name: 'Aaa', avatarUrl: 'https://i.pravatar.cc/150?u=aaa', level: 1, exp: 80, stars: 5 },
      ],
      login: (pin) => set({ isAuthenticated: true, pin }),
      logout: () => set({ isAuthenticated: false, pin: null }),
      addChild: (child) => set((state) => ({ 
        children: [...state.children, { ...child, id: Math.random().toString(36).substring(7) }] 
      })),
    }),
    {
      name: 'parent-auth-storage',
    }
  )
);
