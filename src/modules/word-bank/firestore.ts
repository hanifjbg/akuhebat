import { collection, doc, getDocs, setDoc, query, where } from 'firebase/firestore';
import { db } from '../../core/firebase/config';
import { WordBankEntry, WordBankEntrySchema, initialWordBank } from './index';

const WORD_BANK_COLLECTION = 'word-bank';

export async function getWordBank(level?: number): Promise<WordBankEntry[]> {
  const wordsRef = collection(db, WORD_BANK_COLLECTION);
  let q = query(wordsRef);
  if (level) {
    q = query(wordsRef, where('level', '==', level));
  }
  
  const snapshot = await getDocs(q);
  const words: WordBankEntry[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    try {
      const parsed = WordBankEntrySchema.parse(data);
      words.push({ ...parsed, id: doc.id });
    } catch (e) {
      console.warn("Invalid word bank entry:", doc.id, e);
    }
  });
  
  return words;
}

export async function seedWordBank() {
  const wordsRef = collection(db, WORD_BANK_COLLECTION);
  const existing = await getDocs(wordsRef);
  if (existing.empty) {
    for (const word of initialWordBank) {
      const docRef = doc(wordsRef, word.id);
      await setDoc(docRef, {
        text: word.text,
        syllables: word.syllables,
        letters: word.letters,
        category: word.category,
        level: word.level,
        createdAt: word.createdAt
      });
    }
    console.log("Seeded word bank with initial data");
  }
}
