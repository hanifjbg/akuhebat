import * as React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

import { MainLayout } from "../../../ui/templates/MainLayout"
import { QuizCard } from "../../../ui/organisms/QuizCard"
import { QuizReport } from "../../../ui/organisms/QuizReport"
import { useSimulatorStore } from "../../../shared/store/simulator"
import { Spinner, ProgressBar } from "../../../ui/atoms"

export function QuizPage() {
  const navigate = useNavigate();
  const { globalState } = useSimulatorStore();
  
  const [step, setStep] = useState<"quiz" | "report">("quiz");
  const [status, setStatus] = useState<"idle" | "evaluating" | "result">("idle");
  const [selectedId, setSelectedId] = useState<string | undefined>();
  
  // Real app would use a state machine or more robust logic
  useEffect(() => {
    if (status === "evaluating") {
      const timer = setTimeout(() => {
        setStatus("result");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setStatus("evaluating");
  };

  const handleNext = () => {
    setStep("report");
  };

  return (
    <MainLayout showTopBar={false} showBottomBar={false}>
      <div className="flex-1 w-full h-[100dvh] flex flex-col items-center relative overflow-hidden bg-transparent justify-center">

        {/* Header Overlay */}
        <div className="absolute top-6 left-4 right-4 sm:left-6 sm:right-6 flex items-center gap-3 sm:gap-4 z-50">
          <div className="shrink-0 font-bold justify-center items-center flex rounded-full w-12 h-12 bg-white/80 text-slate-800 backdrop-blur-md shadow-sm border-2 border-slate-200 dark:bg-slate-800/80 dark:border-slate-700 dark:text-slate-200">
            {step === 'quiz' ? '1/2' : '2/2'}
          </div>
          
          <div className="flex-1 drop-shadow-sm">
             <ProgressBar value={step === 'quiz' ? 50 : 100} indicatorColor="bg-primary" />
          </div>

          <button 
            onClick={() => navigate('/ux-lab/learning/dashboard')}
            className="shrink-0 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border-2 border-slate-200 text-slate-500 hover:bg-red-50 hover:border-red-500 hover:text-red-500 transition-all focus:outline-none dark:bg-slate-800/80 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-red-500/20"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex w-full flex-col max-w-xl mx-auto h-full px-4 overflow-y-auto no-scrollbar pt-24 pb-8 relative z-0">
          {globalState === 'loading' && (
             <div className="flex flex-col items-center gap-4 m-auto">
              <Spinner size="lg" />
              <p className="font-bold text-slate-500">Menyiapkan Kuis...</p>
            </div>
          )}

          {globalState === 'error' && (
             <div className="flex flex-col items-center gap-4 m-auto">
              <p className="font-bold text-red-500 animate-bounce">Yah, kuisnya gagal dimuat.</p>
            </div>
          )}

          {(globalState === 'normal' || globalState === 'empty') && (
            <AnimatePresence mode="wait">
              {step === "quiz" ? (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="w-full flex flex-col flex-1 min-h-[400px] justify-between h-full"
                >
                  <QuizCard
                    question="Lengkapi huruf yang hilang!"
                    blanks={["A", "P", "_", "L"]}
                    options={[
                      { id: "1", text: "E" },
                      { id: "2", text: "U" },
                      { id: "3", text: "I" },
                      { id: "4", text: "O" }
                    ]}
                    timeLeft={15}
                    status={status}
                    selectedOptionId={selectedId}
                    correctOptionId="1" // Apel
                    onSelectOption={handleSelect}
                    className="w-full flex-1 mb-6"
                  />
                  <button
                    disabled={status !== "result"}
                    onClick={handleNext}
                    className={`w-full py-4 rounded-full font-bold text-xl transition-all duration-300 shrink-0 ${status === "result" ? "bg-primary text-white shadow-clay-md hover:scale-[1.02] active:scale-[0.98]" : "bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed border-2 border-slate-300 dark:border-slate-700"}`}
                  >
                    Lanjut
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="report"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full flex justify-center items-center my-auto py-8"
                >
                  <QuizReport
                    score={80}
                    stars={4}
                    expGained={100}
                    onRetry={() => { setStep("quiz"); setStatus("idle"); setSelectedId(undefined); }}
                    onNext={() => navigate('/ux-lab/learning/map')}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
