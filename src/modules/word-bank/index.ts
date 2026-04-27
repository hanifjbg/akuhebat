import { z } from 'zod';

export const WordBankEntrySchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1).max(100),
  syllables: z.array(z.string()).max(20),
  letters: z.array(z.string()).max(50),
  imageUrl: z.string().url().optional(),
  category: z.string().optional(),
  level: z.number().min(1).max(10),
  createdAt: z.number()
});

export type WordBankEntry = z.infer<typeof WordBankEntrySchema>;

// Mock initial data if firestore is empty or we want to populate it:
export const initialWordBank: WordBankEntry[] = [
  {
    id: "word_1",
    text: "pesawat",
    syllables: ["pe", "sa", "wat"],
    letters: ["p", "e", "s", "a", "w", "a", "t"],
    category: "benda",
    level: 1,
    createdAt: Date.now()
  },
  {
    id: "word_2",
    text: "buku",
    syllables: ["bu", "ku"],
    letters: ["b", "u", "k", "u"],
    category: "benda",
    level: 1,
    createdAt: Date.now()
  }
];
