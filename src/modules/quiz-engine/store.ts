import { create } from 'zustand';
import { QuizQuestion, quizEngine } from './index';
import { getWordBank, seedWordBank } from '../word-bank/firestore';
import { WordBankEntry } from '../word-bank';

interface QuizSessionState {
  questions: QuizQuestion[];
  currentIndex: number;
  loading: boolean;
  error: string | null;
  score: number;
  totalCorrect: number;
  
  initializeSession: (level: number, numQuestions?: number) => Promise<void>;
  submitAnswer: (answer: string) => boolean;
  nextQuestion: () => void;
  resetSession: () => void;
}

export const useQuizSessionStore = create<QuizSessionState>((set, get) => ({
  questions: [],
  currentIndex: 0,
  loading: false,
  error: null,
  score: 0,
  totalCorrect: 0,

  initializeSession: async (level: number, numQuestions: number = 10) => {
    set({ loading: true, error: null, currentIndex: 0, score: 0, totalCorrect: 0, questions: [] });
    try {
      await seedWordBank(); // ensure words exist
      const words = await getWordBank();
      
      if (words.length === 0) {
        set({ error: "Bank kata kosong", loading: false });
        return;
      }

      // Pre-compute questions
      const generatedQuestions: QuizQuestion[] = [];
      const shuffledWords = [...words].sort(() => Math.random() - 0.5);
      
      for (let i = 0; i < numQuestions; i++) {
        // cycle through words if we want more questions than available words
        const word = shuffledWords[i % shuffledWords.length];
        
        // Randomize levels for variety, but cap at child's current level
        let targetLevel = level;
        if (level > 1 && Math.random() > 0.5) {
          targetLevel = level - 1; // Example mix of levels
        } else if (level === 1 && Math.random() > 0.8) {
          targetLevel = 2; // Introduce slightly harder questions occasionally
        }
        
        const q = quizEngine.generateQuestion(word, targetLevel > 3 ? 3 : targetLevel);
        generatedQuestions.push(q);
      }

      set({ questions: generatedQuestions, loading: false });
    } catch (e: any) {
      set({ error: e.message || "Gagal memuat kuis", loading: false });
    }
  },

  submitAnswer: (answer: string) => {
    const { questions, currentIndex, score, totalCorrect } = get();
    const q = questions[currentIndex];
    if (!q) return false;
    
    let isCorrect = false;
    if (typeof q.correctAnswer === 'string' && answer.toLowerCase() === q.correctAnswer.toLowerCase()) {
      isCorrect = true;
    } else if (Array.isArray(q.correctAnswer) && q.correctAnswer.join('').toLowerCase() === answer.toLowerCase()) {
      isCorrect = true;
    }

    if (isCorrect) {
      set({ 
        score: score + 10,
        totalCorrect: totalCorrect + 1 
      });
    }
    
    return isCorrect;
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex < questions.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    } else {
       // Transition past the last question indicates finishing
      set({ currentIndex: questions.length });
    }
  },

  resetSession: () => {
    set({ questions: [], currentIndex: 0, score: 0, totalCorrect: 0, loading: false, error: null });
  }
}));
