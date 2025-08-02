import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, Star } from "lucide-react";

interface MathQuestion {
  id: number;
  type: 'addition' | 'subtraction' | 'counting';
  leftCount: number;
  rightCount?: number;
  correctAnswer: number;
  visualElement: string;
  question: string;
}

interface VisualMathQuestionProps {
  level: number;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}

const VisualMathQuestion = ({ level, onCorrectAnswer, onWrongAnswer }: VisualMathQuestionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<MathQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const visualElements = ['🌳', '🍎', '🐝', '🌸', '🐣', '⭐', '🦋', '🐧', '🎈', '🍓'];

  const generateQuestion = () => {
    const element = visualElements[Math.floor(Math.random() * visualElements.length)];
    
    if (level === 1) {
      // Simple counting for level 1
      const count = Math.floor(Math.random() * 5) + 1;
      return {
        id: Date.now(),
        type: 'counting' as const,
        leftCount: count,
        correctAnswer: count,
        visualElement: element,
        question: `How many ${element} do you see?`
      };
    } else if (level === 2) {
      // Simple addition for level 2
      const left = Math.floor(Math.random() * 4) + 1;
      const right = Math.floor(Math.random() * 4) + 1;
      return {
        id: Date.now(),
        type: 'addition' as const,
        leftCount: left,
        rightCount: right,
        correctAnswer: left + right,
        visualElement: element,
        question: `Count all the ${element}. What is ${left} + ${right}?`
      };
    } else {
      // Subtraction for level 3+
      const total = Math.floor(Math.random() * 6) + 4;
      const subtract = Math.floor(Math.random() * (total - 1)) + 1;
      return {
        id: Date.now(),
        type: 'subtraction' as const,
        leftCount: total,
        rightCount: subtract,
        correctAnswer: total - subtract,
        visualElement: element,
        question: `Start with ${total} ${element}, take away ${subtract}. How many are left?`
      };
    }
  };

  useEffect(() => {
    setCurrentQuestion(generateQuestion());
    setUserAnswer("");
    setFeedback(null);
    setIsSubmitted(false);
  }, [level]);

  const handleSubmit = () => {
    if (!currentQuestion || userAnswer === "") return;
    
    const answer = parseInt(userAnswer);
    setIsSubmitted(true);
    
    if (answer === currentQuestion.correctAnswer) {
      setFeedback("correct");
      setTimeout(() => {
        onCorrectAnswer();
        setCurrentQuestion(generateQuestion());
        setUserAnswer("");
        setFeedback(null);
        setIsSubmitted(false);
      }, 2000);
    } else {
      setFeedback("wrong");
      setTimeout(() => {
        onWrongAnswer();
        setFeedback(null);
        setIsSubmitted(false);
      }, 2000);
    }
  };

  const renderVisualElements = () => {
    if (!currentQuestion) return null;

    if (currentQuestion.type === 'counting') {
      return (
        <div className="flex flex-wrap justify-center gap-4 p-6">
          {Array.from({ length: currentQuestion.leftCount }, (_, i) => (
            <div key={i} className="text-6xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
              {currentQuestion.visualElement}
            </div>
          ))}
        </div>
      );
    }

    if (currentQuestion.type === 'addition') {
      return (
        <div className="space-y-6">
          <div className="flex justify-center items-center gap-8">
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: currentQuestion.leftCount }, (_, i) => (
                <div key={i} className="text-5xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                  {currentQuestion.visualElement}
                </div>
              ))}
            </div>
            <div className="text-4xl font-bold text-primary">+</div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: currentQuestion.rightCount || 0 }, (_, i) => (
                <div key={i} className="text-5xl animate-bounce" style={{ animationDelay: `${(currentQuestion.leftCount + i) * 0.1}s` }}>
                  {currentQuestion.visualElement}
                </div>
              ))}
            </div>
            <div className="text-4xl font-bold text-primary">=</div>
            <div className="text-4xl font-bold text-muted-foreground">?</div>
          </div>
        </div>
      );
    }

    if (currentQuestion.type === 'subtraction') {
      return (
        <div className="space-y-6">
          <div className="text-center text-lg text-muted-foreground mb-4">
            Start with {currentQuestion.leftCount} {currentQuestion.visualElement}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {Array.from({ length: currentQuestion.leftCount }, (_, i) => (
              <div 
                key={i} 
                className={`text-5xl transition-all duration-500 ${
                  i >= currentQuestion.correctAnswer ? 'opacity-30 line-through' : 'animate-bounce'
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {currentQuestion.visualElement}
              </div>
            ))}
          </div>
          <div className="text-center text-lg text-muted-foreground">
            Take away {currentQuestion.rightCount} {currentQuestion.visualElement}. How many are left?
          </div>
        </div>
      );
    }
  };

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-primary/20">
      <div className="text-center space-y-6">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          {currentQuestion.question}
        </h3>
        
        {renderVisualElements()}
        
        <div className="space-y-4">
          <div className="flex justify-center items-center gap-4">
            <label htmlFor="answer" className="text-xl font-medium text-foreground">
              Your Answer:
            </label>
            <Input
              id="answer"
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-24 text-center text-xl font-bold"
              min="0"
              max="20"
              disabled={isSubmitted}
            />
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={isSubmitted || userAnswer === ""}
            className="btn-playful"
          >
            Check Answer
          </Button>
        </div>
        
        {feedback && (
          <div className={`flex items-center justify-center gap-2 text-xl font-bold ${
            feedback === "correct" ? "text-green-600" : "text-red-600"
          }`}>
            {feedback === "correct" ? (
              <>
                <CheckCircle className="w-8 h-8" />
                <span>Great job! 🎉</span>
                <Star className="w-8 h-8 text-yellow-500" />
              </>
            ) : (
              <>
                <XCircle className="w-8 h-8" />
                <span>Try again! You can do it! 💪</span>
              </>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default VisualMathQuestion;