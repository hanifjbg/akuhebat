import { WordBankEntry } from '../word-bank';

export interface QuizQuestion {
  questionText: string;
  targetWord: WordBankEntry;
  type: 'missing_letter' | 'missing_syllable' | 'arrange_syllables'; // and so on
  options: string[]; // e.g. for multiple choice like Find It
  correctAnswer: string | string[];
  blanks: string[]; // format to display string, e.g. ["P", "_", "S", "A", "W", "A", "T"]
}

export class QuizEngine {
  
  /**
   * Generates a quiz question for a specific level based on a WordBankEntry
   */
  public generateQuestion(word: WordBankEntry, level: number): QuizQuestion {
    const letters = word.word.split('');
    const syllables = word.syllables;

    if (level === 1) {
      // Level 1: Missing one letter
      const targetLetterIndex = Math.floor(Math.random() * letters.length);
      const correctAnswer = letters[targetLetterIndex];

      const blanks = [...letters];
      blanks[targetLetterIndex] = "_";

      // Options: 1 correct, 3 wrong letters (total 4)
      const options = [correctAnswer.toUpperCase()];
      const alphabet = "abcdefghijklmnopqrstuvwxyz";
      while (options.length < 4) {
        const randLetter = alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase();
        if (!options.includes(randLetter) && randLetter.toLowerCase() !== correctAnswer.toLowerCase()) {
          options.push(randLetter);
        }
      }

      // Shuffle options
      options.sort(() => Math.random() - 0.5);

      return {
        questionText: "Lengkapi huruf yang hilang!",
        targetWord: word,
        type: 'missing_letter',
        options: options,
        correctAnswer: correctAnswer.toUpperCase(),
        blanks: blanks.map(b => b.toUpperCase())
      };
    } 
    else if (level === 2) {
      // Level 2: Missing one syllable
      const targetSyllableIndex = Math.floor(Math.random() * syllables.length);
      const correctAnswer = syllables[targetSyllableIndex];

      const blanks = [...syllables];
      blanks[targetSyllableIndex] = "__";

      // Mock options for now
      const options = [correctAnswer.toUpperCase()];
      const mockSyllables = ["MA", "KU", "LA", "PI", "TU", "BA", "CA", "DI", "BO"];
      while (options.length < 4) {
        const randSyllable = mockSyllables[Math.floor(Math.random() * mockSyllables.length)].toUpperCase();
        if (!options.includes(randSyllable) && randSyllable.toLowerCase() !== correctAnswer.toLowerCase()) {
          options.push(randSyllable);
        }
      }
      
      options.sort(() => Math.random() - 0.5);

      return {
        questionText: "Lengkapi suku kata yang hilang!",
        targetWord: word,
        type: 'missing_syllable',
        options: options,
        correctAnswer: correctAnswer.toUpperCase(),
        blanks: blanks.map(b => b.toUpperCase())
      };
    }
    
    // Level 3+
    return {
      questionText: "Susun suku kata menjadi kata yang benar!",
      targetWord: word,
      type: 'arrange_syllables',
      options: [...syllables].map(s => s.toUpperCase()).sort(() => Math.random() - 0.5),
      correctAnswer: syllables.map(s => s.toUpperCase()),
      blanks: Array(syllables.length).fill("___")
    };
  }
}

export const quizEngine = new QuizEngine();
