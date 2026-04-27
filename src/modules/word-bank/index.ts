import { z } from 'zod';

export const WordCategorySchema = z.enum(['animal', 'object', 'fruit', 'vegetable', 'color', 'body_part', 'action', 'other']);
export type WordCategory = z.infer<typeof WordCategorySchema>;

export const DifficultyLevelSchema = z.enum(['easy', 'medium', 'hard']);
export type DifficultyLevel = z.infer<typeof DifficultyLevelSchema>;

export const WordBankEntrySchema = z.object({
  id: z.string(),
  word: z.string().min(1).max(50),
  syllables: z.array(z.string()).min(1).max(10),
  category: WordCategorySchema,
  difficulty: DifficultyLevelSchema,
  imageUrl: z.string().url().optional(),
  exampleSentence: z.string().max(200).optional(),
  tags: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type WordBankEntry = z.infer<typeof WordBankEntrySchema>;

export const SentenceBankEntrySchema = z.object({
  id: z.string(),
  sentence: z.string().min(1).max(200),
  words: z.array(z.string()).min(2),
  pattern: z.string(),
  difficulty: DifficultyLevelSchema,
  tags: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type SentenceBankEntry = z.infer<typeof SentenceBankEntrySchema>;

export { initialWordBank } from "./data/initial-words";
export { initialSentenceBank } from "./data/initial-sentences";

