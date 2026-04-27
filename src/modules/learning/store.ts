import { create } from 'zustand';
import { LearningModule, Lesson, getModules, getLessons, seedLearningData } from './firestore';
import { useKidsSessionStore } from '../../core/state/kids-store';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../core/firebase';
import { useParentAuthStore } from '../../core/state/parent-store';

interface LearningState {
  modules: LearningModule[];
  lessons: Record<string, Lesson[]>;
  loading: boolean;
  error: string | null;
  
  initialize: () => Promise<void>;
  fetchLessons: (moduleId: string) => Promise<void>;
  fetchLessonContent: (lessonId: string) => Promise<Lesson | null>;
  completeLesson: (lessonId: string) => Promise<void>;
}

export const useLearningStore = create<LearningState>((set, get) => ({
  modules: [],
  lessons: {},
  loading: false,
  error: null,

  initialize: async () => {
    set({ loading: true, error: null });
    try {
      await seedLearningData();
      const modules = await getModules();
      set({ modules, loading: false });
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  },

  fetchLessons: async (moduleId: string) => {
    if (get().lessons[moduleId]) return;
    try {
      const lessons = await getLessons(moduleId);
      set((state) => ({
        lessons: { ...state.lessons, [moduleId]: lessons }
      }));
    } catch (e: any) {
      set({ error: e.message });
    }
  },

  fetchLessonContent: async (lessonId: string) => {
    // We search across all loaded lessons
    const allLessons = Object.values(get().lessons).flat();
    let lesson = allLessons.find(l => l.id === lessonId);
    
    if (!lesson) {
       // Deep fetch if not in state
       for (const mod of get().modules) {
          const modLessons = await getLessons(mod.id);
          const found = modLessons.find(l => l.id === lessonId);
          if (found) {
             lesson = found;
             break;
          }
       }
    }
    return lesson || null;
  },

  completeLesson: async (lessonId: string) => {
    const { activeChildId } = useKidsSessionStore.getState();
    const { firebaseUser } = useParentAuthStore.getState();
    
    if (!activeChildId || !firebaseUser) return;

    try {
      const childRef = doc(db, `parents/${firebaseUser.uid}/children`, activeChildId);
      await updateDoc(childRef, {
        completedLessonIds: arrayUnion(lessonId)
      });
      
      // Update local state is handled by the subscription in kids-store usually, 
      // but we might want to trigger a refresh or local update.
    } catch (e: any) {
      console.error("Failed to complete lesson", e);
    }
  }
}));
