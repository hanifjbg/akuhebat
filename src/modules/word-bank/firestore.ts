import { collection, doc, getDocs, setDoc, query, where, limit } from 'firebase/firestore';
import { db, auth } from '../../core/firebase/config';
import { WordBankEntry, WordBankEntrySchema, initialWordBank, SentenceBankEntry, SentenceBankEntrySchema, initialSentenceBank } from './index';

const WORD_BANK_COLLECTION = 'word-bank';
const SENTENCE_BANK_COLLECTION = 'sentence-bank';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function getWordBank(): Promise<WordBankEntry[]> {
  if (!auth.currentUser) {
    return [...initialWordBank];
  }

  const wordsRef = collection(db, WORD_BANK_COLLECTION);
  let q = query(wordsRef);
  
  try {
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
    
    // Fallback to initialWordBank if empty and we are a legitimate user
    if (words.length === 0) {
      return [...initialWordBank];
    }
    
    return words;
  } catch (error) {
    if (error instanceof Error && (error.message.includes('Missing or insufficient permissions') || error.message.includes('offline'))) {
      console.warn("Using offline/fallback word bank");
    } else {
      console.error("Failed to fetch word bank from Firestore: ", error);
    }
    return [...initialWordBank];
  }
}

export async function getSentenceBank(): Promise<SentenceBankEntry[]> {
  if (!auth.currentUser) {
    return [...initialSentenceBank];
  }

  const sentencesRef = collection(db, SENTENCE_BANK_COLLECTION);
  let q = query(sentencesRef);
  
  try {
    const snapshot = await getDocs(q);
    const sentences: SentenceBankEntry[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      try {
        const parsed = SentenceBankEntrySchema.parse(data);
        sentences.push({ ...parsed, id: doc.id });
      } catch (e) {
        console.warn("Invalid sentence bank entry:", doc.id, e);
      }
    });
    
    if (sentences.length === 0) {
      return [...initialSentenceBank];
    }
    
    return sentences;
  } catch (error) {
    if (error instanceof Error && (error.message.includes('Missing or insufficient permissions') || error.message.includes('offline'))) {
      console.warn("Using offline/fallback sentence bank");
    } else {
      console.error("Failed to fetch sentence bank from Firestore: ", error);
    }
    return [...initialSentenceBank];
  }
}

export async function seedWordBank() {
  if (!auth.currentUser) return; // Guests cannot seed
  
  const wordsRef = collection(db, WORD_BANK_COLLECTION);
  const sentencesRef = collection(db, SENTENCE_BANK_COLLECTION);

  try {
    const existingWords = await getDocs(query(wordsRef, limit(1)));
    if (existingWords.empty) {
      for (const word of initialWordBank) {
        const docRef = doc(wordsRef, word.id);
        await setDoc(docRef, word);
      }
      console.log("Seeded word bank with initial data");
    }

    const existingSentences = await getDocs(query(sentencesRef, limit(1)));
    if (existingSentences.empty) {
      for (const sentence of initialSentenceBank) {
        const docRef = doc(sentencesRef, sentence.id);
        await setDoc(docRef, sentence);
      }
      console.log("Seeded sentence bank with initial data");
    }

  } catch (error) {
    if (error instanceof Error && error.message.includes('Missing or insufficient permissions')) {
      // Ignore gracefully if not admin
      return;
    }
    console.error("Failed to seed word bank: ", error);
  }
}
