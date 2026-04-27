import * as React from "react"
import { useNavigate } from "react-router-dom"
import { MainLayout } from "../../../ui/templates/MainLayout"
import { QuizCard } from "../../../ui/organisms/QuizCard"
import { QuizReport } from "../../../ui/organisms/QuizReport"
import { WordBuilder } from "../../../ui/organisms/WordBuilder"
import { ChildProfile } from "../../../core/state/parent-store"
import { useQuizSessionStore } from "../../../modules/quiz-engine/store"
import { Button } from "../../../ui/atoms"
import { cn } from "../../../shared/utils"

import { Spinner, ProgressBar } from "../../../ui/atoms"
import { X, Target, ThumbsUp, Frown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function QuizPage({ child }: { child: ChildProfile }) {
  const navigate = useNavigate();
  const { 
    questions, currentIndex, loading, error, score, totalCorrect,
    initializeSession, submitAnswer, nextQuestion, resetSession 
  } = useQuizSessionStore();

  const [step, setStep] = React.useState<"quiz" | "report">("quiz");
  
  // Single selection
  const [selectedId, setSelectedId] = React.useState<string | undefined>();
  // Sequence selection
  const [selectedSequence, setSelectedSequence] = React.useState<(string | null)[]>([]);
  const [availableOptions, setAvailableOptions] = React.useState<{id: string; letter: string; isUsed: boolean}[]>([]);

  const [status, setStatus] = React.useState<"idle" | "evaluating" | "result">("idle");
  const [gainedStars, setGainedStars] = React.useState(0);
  const [gainedExp, setGainedExp] = React.useState(0);

  // Initialize Quiz Session (10 questions)
  React.useEffect(() => {
    initializeSession(child.level, 10);
    return () => resetSession();
  }, [child.level, initializeSession, resetSession]);

  const activeQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const prepareSequence = React.useCallback(() => {
    if (activeQuestion?.type === "arrange_syllables") {
       const correctArr = activeQuestion.correctAnswer as string[];
       setSelectedSequence(Array(correctArr.length).fill(null));
       setAvailableOptions(activeQuestion.options.map((opt, i) => ({ id: `opt-${i}`, letter: opt, isUsed: false })));
    }
  }, [activeQuestion]);

  React.useEffect(() => {
    prepareSequence();
  }, [prepareSequence]);

  const handleSequenceSelect = (id: string, letter: string) => {
    if (status !== "idle") return;
    
    // Find first empty slot
    const firstEmptyIndex = selectedSequence.indexOf(null);
    if (firstEmptyIndex === -1) return;

    const newSeq = [...selectedSequence];
    newSeq[firstEmptyIndex] = letter;
    setSelectedSequence(newSeq);

    setAvailableOptions(prev => prev.map(o => o.id === id ? { ...o, isUsed: true } : o));

    // If fully filled, evaluate
    if (!newSeq.includes(null)) {
      setStatus("evaluating");
      setTimeout(() => {
        const fullAnswer = newSeq.join("");
        const isCorrect = submitAnswer(fullAnswer);
        setStatus("result");
        setTimeout(() => {
           handleMoveToNext();
        }, 1500);
      }, 500);
    }
  };

  const handleSequenceRemove = (index: number) => {
    if (status !== "idle") return;
    const letter = selectedSequence[index];
    if (!letter) return;

    const newSeq = [...selectedSequence];
    newSeq[index] = null;
    setSelectedSequence(newSeq);

    // Free up option
    setAvailableOptions(prev => {
      let released = false;
      return prev.map(o => {
        if (!released && o.letter === letter && o.isUsed) {
           released = true;
           return { ...o, isUsed: false };
        }
        return o;
      });
    });
  };

  const handleSingleAnswer = (ans: string) => {
    if (status !== "idle") return;

    setSelectedId(ans);
    setStatus("evaluating");

    setTimeout(() => {
      const isCorrect = submitAnswer(ans);
      setStatus("result");

      setTimeout(() => {
         handleMoveToNext();
      }, 1500);
    }, 500);
  };

  const handleMoveToNext = () => {
    nextQuestion();
    const nextIndex = useQuizSessionStore.getState().currentIndex;
    if (nextIndex < questions.length) {
      setStatus("idle");
      setSelectedId(undefined);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = React.useCallback(() => {
    const finalScore = useQuizSessionStore.getState().score;
    let exp = 0;
    let stars = 0;
    if (finalScore >= 80) {
      exp = finalScore * 3 + 50; 
      stars = 5;
    } else if (finalScore >= 50) {
      exp = finalScore * 2;
      stars = 3;
    } else {
      exp = finalScore;
      stars = 1;
    }
    setGainedStars(stars);
    setGainedExp(exp);

    import('../../../core/event-bus').then(({ eventBus, EVENTS }) => {
      eventBus.emit(EVENTS.QUIZ_COMPLETED, { score: finalScore, totalQuestions: questions.length });
    });
    setStep("report");
  }, [questions.length]);

  return (
    <MainLayout showTopBar={false} showBottomBar={false}>
      <div className="flex-1 w-full h-[100dvh] flex flex-col items-center relative overflow-hidden bg-white dark:bg-slate-900">
        
        {/* Header Block */}
        <div className="w-full flex items-center justify-between p-4 px-6 pt-8">
           <button onClick={() => navigate("/main/dashboard")} className="w-12 h-12 rounded-full shadow-clay-sm flex items-center justify-center border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800">
              <X className="w-6 h-6 text-slate-500" />
           </button>
           <h1 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-widest leading-none drop-shadow-sm">KUIS HARIAN</h1>
           <div className="w-12 h-12 rounded-full shadow-clay-sm flex items-center justify-center border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800">
              <span className="font-black text-slate-300 dark:text-slate-600">Q</span>
           </div>
        </div>

        {/* Progress Bar Area */}
        <div className="w-full max-w-md px-6 mt-4">
           <div className="flex justify-between items-center text-[10px] font-black text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-tight">
              <span>Pertanyaan</span>
              <span>{currentIndex + 1}/{questions.length}</span>
           </div>
           <ProgressBar value={progress} indicatorColor="bg-amber-400" className="bg-slate-100 dark:bg-slate-800" />
        </div>

        <div className="flex-1 w-full max-w-xl mx-auto flex flex-col p-6 relative">
          <AnimatePresence mode="wait">
            {status === "result" && (
               <motion.div 
                 initial={{ y: -50, opacity: 0 }} 
                 animate={{ y: 0, opacity: 1 }}
                 className={cn(
                   "absolute top-0 left-6 right-6 z-50 p-4 rounded-2xl flex items-center gap-3 font-bold text-white shadow-lg",
                   selectedSequence.join("") === (Array.isArray(activeQuestion.correctAnswer) ? activeQuestion.correctAnswer.join("") : activeQuestion.correctAnswer) || selectedId === activeQuestion.correctAnswer
                    ? "bg-green-500" : "bg-red-500"
                 )}
               >
                  {selectedSequence.join("") === (Array.isArray(activeQuestion.correctAnswer) ? activeQuestion.correctAnswer.join("") : activeQuestion.correctAnswer) || selectedId === activeQuestion.correctAnswer ? (
                    <>
                      <ThumbsUp className="w-6 h-6" />
                      <div>Hebat! Jawabanmu Benar</div>
                    </>
                  ) : (
                    <>
                      <Frown className="w-6 h-6" />
                      <div>Kurang tepat... tetap semangat!</div>
                    </>
                  )}
               </motion.div>
            )}
          </AnimatePresence>

          {loading ? (
             <div className="flex flex-col items-center justify-center h-full space-y-4 m-auto">
                <Spinner size="lg" />
                <p className="font-black text-slate-500 dark:text-slate-400 animate-pulse uppercase text-xs tracking-widest">Menyiapkan Tantangan...</p>
             </div>
          ) : error ? (
             <div className="flex flex-col items-center justify-center h-full m-auto text-center gap-4">
                <span className="text-6xl drop-shadow-lg">🤕</span>
                <p className="text-red-500 dark:text-red-400 font-black max-w-xs">{error}</p>
                <Button onClick={() => initializeSession(child.level, 10)} className="shadow-clay-sm">Coba Lagi</Button>
             </div>
          ) : (
            <AnimatePresence mode="wait">
              {step === "quiz" && activeQuestion ? (
                <motion.div 
                   key={currentIndex}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="flex flex-col h-full w-full"
                >
                  <div className="bg-amber-50 dark:bg-amber-900/30 border-2 border-amber-100 dark:border-amber-800/50 p-5 rounded-3xl flex items-center gap-4 mt-4 shadow-sm">
                     <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-clay-sm text-amber-500 dark:text-amber-400">
                        <Target className="w-6 h-6" />
                     </div>
                     <div>
                        <div className="text-[10px] font-black text-amber-400 dark:text-amber-500 uppercase leading-none mb-1 tracking-wider">
                           {activeQuestion.type === "arrange_syllables" ? "Susun Kata" : "Pilih Jawaban"}
                        </div>
                        <div className="text-xl font-black text-slate-700 dark:text-white leading-tight">
                           {activeQuestion.questionText}
                        </div>
                     </div>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center py-8">
                     {activeQuestion.type === "arrange_syllables" ? (
                        <WordBuilder 
                          targetWord={activeQuestion.correctAnswer as any}
                          selectedLetters={selectedSequence}
                          availableLetters={availableOptions}
                          onSelectLetter={handleSequenceSelect}
                          onRemoveLetter={handleSequenceRemove}
                          className={cn(
                             "w-full transition-all duration-300",
                             status === "result" && selectedSequence.join("") === (Array.isArray(activeQuestion.correctAnswer) ? activeQuestion.correctAnswer.join("") : "") ? "scale-105" : ""
                          )}
                        />
                     ) : (
                        <QuizCard 
                          question=""
                          blanks={activeQuestion.blanks}
                          options={activeQuestion.options.map(o => ({ id: o, text: o }))}
                          onSelectOption={handleSingleAnswer}
                          selectedOptionId={selectedId}
                          correctOptionId={activeQuestion.correctAnswer as string}
                          status={status}
                          className="w-full"
                        />
                     )}
                  </div>
                </motion.div>
              ) : step === "report" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full flex justify-center items-center my-auto py-8"
                >
                  <QuizReport 
                    score={score}
                    stars={gainedStars}
                    expGained={gainedExp}
                    onRetry={() => {
                       setStep("quiz");
                       setStatus("idle");
                       setSelectedId(undefined);
                       initializeSession(child.level, 10);
                    }}
                    onNext={() => navigate('/main/dashboard')}
                    className="w-full"
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
