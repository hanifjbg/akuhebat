import * as React from "react"
import { useNavigate } from "react-router-dom"
import { MainLayout } from "../../../ui/templates/MainLayout"
import { QuizCard } from "../../../ui/organisms/QuizCard"
import { QuizReport } from "../../../ui/organisms/QuizReport"
import { ChildProfile } from "../../../core/state/parent-store"
import { getWordBank, seedWordBank } from "../../../modules/word-bank/firestore"
import { quizEngine, QuizQuestion } from "../../../modules/quiz-engine"
import { gamificationEngine } from "../../../modules/gamification"

export function QuizPage({ child }: { child: ChildProfile }) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [question, setQuestion] = React.useState<QuizQuestion | null>(null);
  const [step, setStep] = React.useState<"quiz" | "report">("quiz");
  
  const [selectedId, setSelectedId] = React.useState<string | undefined>();
  const [status, setStatus] = React.useState<"idle" | "correct" | "incorrect">("idle");
  const [score, setScore] = React.useState(0);
  const [stars, setStars] = React.useState(0);
  const [exp, setExp] = React.useState(0);

  React.useEffect(() => {
    async function loadQuiz() {
      // Seed first if empty
      await seedWordBank();
      const words = await getWordBank();
      
      if (words.length > 0) {
        // Random word
        const word = words[Math.floor(Math.random() * words.length)];
        const q = quizEngine.generateQuestion(word, child.level > 3 ? 3 : child.level);
        setQuestion(q);
      }
      setLoading(false);
    }
    loadQuiz();
  }, [child.level, step]); // reload when step goes back to quiz

  const handleAnswer = (ans: string) => {
    setSelectedId(ans);
    // Simple correct check for single string. Arrays (drag drop) need more complex logic
    let isCorrect = false;
    if (typeof question?.correctAnswer === 'string' && ans.toLowerCase() === question.correctAnswer.toLowerCase()) {
      isCorrect = true;
    }

    if (isCorrect) {
      setStatus("correct");
      // Calculate mini score
      const miniScore = 100;
      setScore(miniScore);
      
      // Calculate rewards
      let expGained = 0;
      let gainedStars = 0;
  
      if (miniScore >= 80) {
        expGained = miniScore * 3 + 50; 
        gainedStars = 5;
      } else if (miniScore >= 50) {
        expGained = miniScore * 2;
        gainedStars = 3;
      } else {
        expGained = miniScore;
        gainedStars = 1;
      }

      setStars(gainedStars);
      setExp(expGained);

      // Tell gamification engine to record it to firestore
      // We pass the payload matching EVENTS.QUIZ_COMPLETED
      import('../../../core/event-bus').then(({ eventBus, EVENTS }) => {
        eventBus.emit(EVENTS.QUIZ_COMPLETED, { score: miniScore, totalQuestions: 1 });
      });

      setTimeout(() => setStep("report"), 1500);
    } else {
      setStatus("incorrect");
    }
  };

  return (
    <MainLayout 
      activeTab="play"
      topBarProps={{
        userName: child.name,
        avatarSrc: child.avatarUrl,
        showBackButton: true,
        onBack: () => navigate("/main/dashboard")
      }}
    >
      <div className="flex-1 w-full h-full relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-t-4 border-indigo-100 dark:border-slate-800 p-4">
        {loading ? (
           <div className="flex items-center justify-center h-full">Memuat Kuis...</div>
        ) : !question ? (
           <div className="flex items-center justify-center h-full">Bank Kata Kosong! Minta Admin menambah kata.</div>
        ) : (
          <div className="max-w-xl mx-auto h-full flex flex-col pt-8">
            {step === "quiz" && (
                <QuizCard 
                  question={question.questionText}
                  options={question.options.map(o => ({ id: o, content: o }))}
                  targetWord={question.blanks.join(" ")}
                  onSelect={handleAnswer}
                  selectedId={selectedId}
                  status={status}
                  className="w-full flex-1 mb-8"
                />
            )}
            {step === "report" && (
                <QuizReport 
                  score={score}
                  stars={stars}
                  expGained={exp}
                  onRetry={() => {
                    setStep("quiz");
                    setStatus("idle");
                    setSelectedId(undefined);
                  }}
                  onNext={() => navigate('/main/map')}
                  className="w-full"
                />
            )}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
