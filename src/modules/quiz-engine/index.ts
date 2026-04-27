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
    if (level === 1) {
      // Level 1: Missing one letter
      const targetLetterIndex = Math.floor(Math.random() * word.letters.length);
      const correctAnswer = word.letters[targetLetterIndex];

      const blanks = [...word.letters];
      blanks[targetLetterIndex] = "_";

      // Options: 1 correct, 2 wrong letters
      const options = [correctAnswer.toUpperCase()];
      const alphabet = "abcdefghijklmnopqrstuvwxyz";
      while (options.length < 3) {
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
      const targetSyllableIndex = Math.floor(Math.random() * word.syllables.length);
      const correctAnswer = word.syllables[targetSyllableIndex];

      const blanks = [...word.syllables];
      blanks[targetSyllableIndex] = "__";

      // Mock options for now
      const options = [correctAnswer.toUpperCase(), "MA", "KU"].sort(() => Math.random() - 0.5);

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
      options: [...word.syllables].map(s => s.toUpperCase()).sort(() => Math.random() - 0.5),
      correctAnswer: word.syllables.map(s => s.toUpperCase()),
      blanks: Array(word.syllables.length).fill("___")
    };
  }
}

export const quizEngine = new QuizEngine();
