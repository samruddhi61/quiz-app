import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, X, Trophy, RotateCcw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"],
    correct: 2,
  },
  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
    correct: 1,
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Python", "C++", "JavaScript", "Java"],
    correct: 2,
  },
];

const Index = () => {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const progress = ((current + (locked ? 1 : 0)) / questions.length) * 100;

  const handleSelect = (idx: number) => {
    if (locked) return;
    setSelected(idx);
    setLocked(true);
    if (idx === q.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setLocked(false);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setStarted(false);
    setCurrent(0);
    setSelected(null);
    setLocked(false);
    setScore(0);
    setFinished(false);
  };

  const pct = Math.round((score / questions.length) * 100);
  const message =
    pct === 100 ? "Perfect score! 🎉" : pct >= 70 ? "Great job! 🌟" : pct >= 40 ? "Not bad! 👍" : "Keep practicing! 💪";

  return (
    <main className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--gradient-bg)" }}>
      <div className="w-full max-w-2xl">
        {!started ? (
          <Card className="p-10 text-center border-0 shadow-2xl animate-in fade-in zoom-in-95 duration-500" style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-glow)" }}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-bg)" }}>
              Quiz Master
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Test your knowledge with {questions.length} fun questions
            </p>
            <Button size="lg" onClick={() => setStarted(true)} className="text-lg px-10 py-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
              Start Quiz
            </Button>
          </Card>
        ) : finished ? (
          <Card className="p-10 text-center border-0 animate-in fade-in zoom-in-95 duration-500" style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-glow)" }}>
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
              <Trophy className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-4xl font-bold mb-2 text-foreground">Quiz Complete!</h2>
            <p className="text-muted-foreground mb-8 text-lg">{message}</p>
            <div className="mb-8">
              <div className="text-7xl font-bold bg-clip-text text-transparent mb-2" style={{ backgroundImage: "var(--gradient-bg)" }}>
                {score}/{questions.length}
              </div>
              <p className="text-muted-foreground">{pct}% correct</p>
            </div>
            <Button size="lg" onClick={reset} className="text-lg px-8 py-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
              <RotateCcw className="mr-2 h-5 w-5" />
              Try Again
            </Button>
          </Card>
        ) : (
          <Card key={current} className="p-8 md:p-10 border-0 animate-in fade-in slide-in-from-right-5 duration-300" style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center justify-between mb-3 text-sm font-medium">
              <span className="text-primary">Question {current + 1} of {questions.length}</span>
              <span className="text-muted-foreground">Score: {score}</span>
            </div>
            <Progress value={progress} className="mb-8 h-2" />

            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground leading-snug">
              {q.question}
            </h2>

            <div className="space-y-3 mb-8">
              {q.options.map((opt, idx) => {
                const isCorrect = idx === q.correct;
                const isSelected = idx === selected;
                const showCorrect = locked && isCorrect;
                const showWrong = locked && isSelected && !isCorrect;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={locked}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border-2 font-medium flex items-center justify-between group",
                      "transition-all duration-200",
                      !locked && "border-border hover:border-primary hover:bg-primary/5 hover:scale-[1.02] cursor-pointer",
                      showCorrect && "border-success bg-success/10 text-success-foreground",
                      showWrong && "border-destructive bg-destructive/10",
                      locked && !isSelected && !isCorrect && "border-border opacity-50",
                    )}
                    style={showCorrect ? { borderColor: "hsl(var(--success))", backgroundColor: "hsl(var(--success) / 0.1)" } : undefined}
                  >
                    <span className="flex items-center gap-3">
                      <span className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0",
                        !locked && "bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground",
                        showCorrect && "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]",
                        showWrong && "bg-destructive text-destructive-foreground",
                        locked && !isSelected && !isCorrect && "bg-secondary text-secondary-foreground",
                      )}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-foreground">{opt}</span>
                    </span>
                    {showCorrect && <Check className="w-5 h-5" style={{ color: "hsl(var(--success))" }} />}
                    {showWrong && <X className="w-5 h-5 text-destructive" />}
                  </button>
                );
              })}
            </div>

            <Button
              onClick={handleNext}
              disabled={!locked}
              size="lg"
              className="w-full text-lg py-6 rounded-xl shadow-lg disabled:opacity-40"
            >
              {current + 1 === questions.length ? "See Results" : "Next Question"}
            </Button>
          </Card>
        )}
      </div>
    </main>
  );
};

export default Index;
