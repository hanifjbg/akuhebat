import * as React from "react"
import { useState, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, ChevronLeft, Volume2, CheckCircle, RotateCcw, ThumbsUp, Frown } from "lucide-react"

import { MainLayout } from "../../../ui/templates/MainLayout"
import { useLearningStore } from "../../../modules/learning/store"
import { ChildProfile } from "../../../core/state/parent-store"
import { Button, ProgressBar } from "../../../ui/atoms"
import { useKidsSessionStore } from "../../../core/state/kids-store"
import { cn } from "../../../shared/utils"

export function LessonContentPage({ child }: { child: ChildProfile }) {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const { fetchLessonContent, completeLesson, modules } = useLearningStore();
  const { activeChildId } = useKidsSessionStore();

  const [lessonData, setLessonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [assembledSyllables, setAssembledSyllables] = useState<string[]>([]);

  const activeModule = useMemo(() => 
    modules.find(m => m.id === lessonData?.moduleId), 
    [modules, lessonData]
  );

  React.useEffect(() => {
    if (lessonId) {
      fetchLessonContent(lessonId).then(data => {
        setLessonData(data);
        setLoading(false);
      });
    }
  }, [lessonId, fetchLessonContent]);

  const items = lessonData?.items || [];
  const currentItem = items[currentIndex];
  const progress = items.length > 0 ? ((currentIndex + 1) / items.length) * 100 : 0;

  // Assembly Logic
  const targetArray = useMemo(() => {
    if (!currentItem || !activeModule) return [];
    if (activeModule.type === 'syllable_drag') return currentItem.syllables || [];
    if (activeModule.type === 'sentence_build') return currentItem.words || [];
    return [currentItem.text]; // default/grid
  }, [currentItem, activeModule]);

  const allAvailableTokens = useMemo(() => {
    if (!currentItem || !activeModule) return [];
    if (activeModule.type === 'grid') return []; // grid handles its own items
    
    // Combine target and distractors
    const distractors = activeModule.type === 'syllable_drag' ? (currentItem.words || []) : [];
    const tokens = [...targetArray, ...distractors];
    return tokens.sort(() => Math.random() - 0.5);
  }, [currentItem, activeModule, targetArray]);

  if (loading || !lessonData) return null;

  const handleAssemble = (token: string) => {
    if (feedback) return;
    const next = [...assembledSyllables, token];
    setAssembledSyllables(next);

    if (next.length === targetArray.length) {
      const isCorrect = next.every((val, index) => val === targetArray[index]);
      setFeedback(isCorrect ? "correct" : "incorrect");
    }
  };

  const handleGridClick = (text: string) => {
    if (feedback) return;
    if (text.toLowerCase() === currentItem.text.toLowerCase()) {
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  const handleNext = async () => {
    setFeedback(null);
    setAssembledSyllables([]);
    if (currentIndex < items.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      if (activeChildId && lessonId) await completeLesson(lessonId);
      navigate(`/main/learning/module/${lessonData.moduleId}`);
    }
  };

  const handleReset = () => {
    setAssembledSyllables([]);
    setFeedback(null);
  };

  return (
    <MainLayout showTopBar={false} showBottomBar={false}>
      <div className="flex-1 w-full h-[100dvh] flex flex-col items-center relative overflow-hidden bg-white dark:bg-slate-900">
        
        {/* Header Block from Screenshot */}
        <div className="w-full flex items-center justify-between p-4 px-6 pt-8">
           <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-full shadow-clay-sm flex items-center justify-center border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800">
              <ChevronLeft className="w-6 h-6 text-slate-500 dark:text-slate-400" />
           </button>
           <h1 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-widest leading-none drop-shadow-sm">{activeModule?.title || "Belajar"}</h1>
           <div className="w-12 h-12 rounded-full shadow-clay-sm flex items-center justify-center border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800">
              <span className="font-black text-slate-300 dark:text-slate-600">T</span>
           </div>
        </div>

        {/* Progress Bar Area */}
        <div className="w-full max-md px-6 mt-4">
           <div className="flex justify-between items-center text-[10px] font-black text-slate-400 dark:text-slate-500 mb-1 tracking-tight">
              <span>PROGRESS BELAJAR</span>
              <span>{currentIndex + 1}/{items.length}</span>
           </div>
           <ProgressBar value={progress} indicatorColor={activeModule?.color || "bg-primary"} className="bg-slate-100 dark:bg-slate-800" />
        </div>

        <div className="flex-1 w-full max-w-xl mx-auto flex flex-col p-6 relative">
          <AnimatePresence mode="wait">
            {feedback && (
               <motion.div 
                 initial={{ y: -50, opacity: 0 }} 
                 animate={{ y: 0, opacity: 1 }}
                 className={cn(
                   "absolute top-0 left-6 right-6 z-50 p-4 rounded-2xl flex items-center gap-3 font-black text-white shadow-lg",
                   feedback === "correct" ? "bg-green-500 shadow-green-500/20" : "bg-red-500 shadow-red-500/20"
                 )}
               >
                  {feedback === "correct" ? (
                    <>
                      <ThumbsUp className="w-6 h-6" />
                      <div>Hebat! Jawabanmu Benar</div>
                    </>
                  ) : (
                    <>
                      <Frown className="w-6 h-6" />
                      <div>Kurang tepat, yuk coba lagi!</div>
                    </>
                  )}
               </motion.div>
            )}
          </AnimatePresence>

          {/* Prompt Banner */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-100 dark:border-blue-800/50 p-5 rounded-3xl flex items-center gap-4 mt-8 shadow-sm">
             <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-clay-sm text-blue-500 dark:text-blue-400">
                <Volume2 className="w-6 h-6" />
             </div>
             <div>
                <div className="text-[10px] font-black text-blue-400 dark:text-blue-500 uppercase leading-none mb-1 tracking-wider">
                   {activeModule?.type === 'syllable_drag' ? 'Susun Suku Katanya!' : 
                    activeModule?.type === 'sentence_build' ? 'Susun Kalimatnya!' : 
                    'Pilih Hurufnya!'}
                </div>
                <div className="text-2xl font-black text-slate-700 dark:text-white uppercase tracking-tight">
                   "{currentItem?.text}"
                </div>
             </div>
          </div>

          {/* Interaction Area (Slots or Grid) */}
          <div className="flex-1 flex flex-col items-center justify-center py-6">
             {activeModule?.type === 'grid' ? (
                <div className="grid grid-cols-3 gap-4 w-full p-4">
                   {items.map((item: any, i: number) => (
                      <motion.button
                         key={i}
                         whileTap={{ scale: 0.9 }}
                         onClick={() => handleGridClick(item.text)}
                         className={cn(
                           "aspect-square rounded-[2rem] shadow-clay-sm border-4 text-4xl font-black transition-all flex items-center justify-center",
                           currentIndex === i 
                            ? "border-blue-500 bg-white dark:bg-slate-800 text-blue-600 dark:text-white" 
                            : "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600",
                           feedback === "correct" && currentIndex === i ? "bg-green-500 border-green-600 text-white" : 
                           feedback === "incorrect" && currentIndex === i ? "bg-red-500 border-red-600 text-white" : ""
                         )}
                      >
                         {item.text.toUpperCase()}
                      </motion.button>
                   ))}
                </div>
             ) : (
                <>
                   <div className="bg-slate-50/50 dark:bg-slate-800/20 border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 w-full min-h-[180px] flex items-center justify-center flex-wrap gap-4 relative">
                      {targetArray.map((_: string, i: number) => (
                         <div key={i} className={cn(
                           "min-w-[64px] h-16 sm:min-w-[80px] sm:h-20 px-4 rounded-2xl border-4 text-3xl font-black flex items-center justify-center transition-all relative",
                           assembledSyllables[i] 
                            ? (feedback === "incorrect" ? "bg-red-500 border-red-600 text-white" : "bg-green-500 border-green-600 text-white")
                            : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 shadow-inner text-slate-800 dark:text-white"
                         )}>
                            {assembledSyllables[i]}
                            {assembledSyllables[i] && feedback === "correct" && i === assembledSyllables.length - 1 && (
                               <ThumbsUp className="absolute -top-3 -right-3 w-8 h-8 text-green-500 bg-white dark:bg-slate-800 rounded-full p-1.5 shadow-md border-2 border-green-100 dark:border-green-900" />
                            )}
                            {assembledSyllables[i] && feedback === "incorrect" && (
                               <Frown className="absolute -top-3 -right-3 w-8 h-8 text-red-500 bg-white dark:bg-slate-800 rounded-full p-1.5 shadow-md border-2 border-red-100 dark:border-red-900" />
                            )}
                         </div>
                      ))}

                      {(assembledSyllables.length > 0 || feedback) && (
                         <button onClick={handleReset} className="absolute bottom-4 right-6 flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-black text-[10px] hover:text-slate-600 dark:hover:text-slate-300 bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
                            <RotateCcw className="w-3 h-3" /> RESET
                         </button>
                      )}
                   </div>

                   {/* Token Pool */}
                   <div className={cn(
                     "grid gap-4 mt-12 w-full",
                     activeModule?.type === 'sentence_build' ? 'grid-cols-1' : 'grid-cols-2'
                   )}>
                      {allAvailableTokens.map((token, i) => (
                         <motion.button
                           key={`${token}-${i}`}
                           whileTap={{ scale: 0.95 }}
                           onClick={() => !feedback && handleAssemble(token)}
                           disabled={!!feedback || assembledSyllables.includes(token)}
                           className={cn(
                             "bg-white dark:bg-slate-800 p-6 rounded-clay-md shadow-clay-sm border-2 border-slate-100 dark:border-slate-700 text-3xl font-black transition-all flex items-center justify-center",
                             assembledSyllables.includes(token) 
                              ? "opacity-30 scale-95 grayscale text-slate-300 dark:text-slate-700" 
                              : "text-slate-800 dark:text-slate-100 hover:border-blue-400 dark:hover:border-blue-500"
                           )}
                         >
                           {token}
                         </motion.button>
                      ))}
                   </div>
                </>
             )}
          </div>

          {/* Footer Navigation */}
          <div className="mt-auto flex justify-center py-4">
             {feedback === "correct" && (
                <motion.button
                   initial={{ scale: 0.8, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   onClick={handleNext}
                   className="w-20 h-20 bg-green-500 dark:bg-green-600 text-white rounded-full flex items-center justify-center shadow-clay-md border-4 border-white/20 hover:scale-110 transition-transform"
                >
                   <ChevronRight className="w-10 h-10 ml-1" />
                </motion.button>
             )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
