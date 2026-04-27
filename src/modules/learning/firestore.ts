import { collection, getDocs, doc, setDoc, query, orderBy, getDoc } from 'firebase/firestore';
import { db } from '../../core/firebase';

export type InteractionType = 'grid' | 'syllable_drag' | 'sentence_build';

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  order: number;
  requiredLevel: number;
  icon: string;
  color: string;
  type: InteractionType;
}

export interface LessonItem {
  text: string;
  phonetics?: string;
  imageUrl?: string;
  audioUrl?: string;
  syllables?: string[]; // For syllable_drag
  words?: string[];     // For sentence_build
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  order: number;
  content: string; 
  isFree?: boolean;
  items: LessonItem[];
}

export async function seedLearningData() {
  const modulesRef = collection(db, 'learning-modules');
  const existing = await getDocs(modulesRef);
  
  // We overwrite to ensure strict alignment with the 3 modules if requested, 
  // but for safety we check first. Since you said "Hapus", I will overwrite.
  
  const modules: LearningModule[] = [
    { 
      id: 'mod-abjad', 
      title: 'Mengenal Huruf', 
      description: 'A sampai Z dengan cara yang menyenangkan', 
      order: 1, 
      requiredLevel: 1, 
      icon: 'A', 
      color: 'bg-purple-500',
      type: 'grid' 
    },
    { 
      id: 'mod-vokal', 
      title: 'Huruf Vokal', 
      description: 'Belajar menggabungkan konsonan dan vokal', 
      order: 2, 
      requiredLevel: 1, 
      icon: 'vocal', 
      color: 'bg-orange-400',
      type: 'syllable_drag' 
    },
    { 
      id: 'mod-kalimat', 
      title: 'Merakit Kalimat', 
      description: 'Menyusun suku kata menjadi kalimat', 
      order: 3, 
      requiredLevel: 1, 
      icon: 'star', 
      color: 'bg-green-400',
      type: 'sentence_build' 
    },
  ];

  for (const mod of modules) {
    await setDoc(doc(db, 'learning-modules', mod.id), mod);
    
    // Seed sample lessons for each
    if (mod.id === 'mod-abjad') {
      const lessons: Lesson[] = [
        { 
          id: 'les-abjad-1', moduleId: 'mod-abjad', title: 'Huruf A - I', order: 1, content: 'Kenalan dengan huruf!',
          items: ['a','b','c','d','e','f','g','h','i'].map(char => ({ text: char }))
        }
      ];
      for (const les of lessons) await setDoc(doc(db, `learning-modules/${mod.id}/lessons`, les.id), les);
    }

    if (mod.id === 'mod-vokal') {
      const lessons: Lesson[] = [
        { 
          id: 'les-vokal-1', moduleId: 'mod-vokal', title: 'Kata 2 Suku Kata', order: 1, content: 'Susun suku katanya!',
          items: [
            { text: 'CUCI', syllables: ['cu', 'ci'], words: ['qi', 'u'] }, // words here are distractors for syllables pool
            { text: 'TOPI', syllables: ['to', 'pi'], words: ['na', 'qe'] }
          ]
        }
      ];
      for (const les of lessons) await setDoc(doc(db, `learning-modules/${mod.id}/lessons`, les.id), les);
    }

    if (mod.id === 'mod-kalimat') {
      const lessons: Lesson[] = [
        { 
          id: 'les-kal-1', moduleId: 'mod-kalimat', title: 'Kalimat Pendek', order: 1, content: 'Rakit kalimatnya!',
          items: [
            { text: 'BUDI BACA', syllables: ['bu', 'di', 'ba', 'ca'], words: ['BUDI', 'BACA'] },
            { text: 'WIRA SAPU', syllables: ['wi', 'ra', 'sa', 'pu'], words: ['WIRA', 'SAPU'] }
          ]
        }
      ];
      for (const les of lessons) await setDoc(doc(db, `learning-modules/${mod.id}/lessons`, les.id), les);
    }
  }
}

export async function getModules(): Promise<LearningModule[]> {
  const q = query(collection(db, 'learning-modules'), orderBy('order'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as LearningModule));
}

export async function getLessons(moduleId: string): Promise<Lesson[]> {
  const q = query(collection(db, `learning-modules/${moduleId}/lessons`), orderBy('order'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Lesson));
}
