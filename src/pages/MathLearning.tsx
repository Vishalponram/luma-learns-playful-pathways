import { useState, useEffect } from "react";
import { ArrowLeft, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import ChatBubble from "@/components/ChatBubble";
import SoundToggle from "@/components/SoundToggle";
import VisualMathQuestion from "@/components/VisualMathQuestion";
import ProgressTracker from "@/components/ProgressTracker";
import lumaMascot from "@/assets/luma-mascot.png";

const MathLearning = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [showEncouragement, setShowEncouragement] = useState(false);

  const handleCorrectAnswer = () => {
    const newCorrectAnswers = correctAnswers + 1;
    const newTotalQuestions = totalQuestions + 1;
    const newStreakCount = streakCount + 1;
    
    setCorrectAnswers(newCorrectAnswers);
    setTotalQuestions(newTotalQuestions);
    setStreakCount(newStreakCount);
    setScore(score + (10 * level)); // More points for higher levels
    
    // Level up every 5 correct answers
    if (newCorrectAnswers % 5 === 0) {
      setLevel(level + 1);
      setShowEncouragement(true);
      setTimeout(() => setShowEncouragement(false), 3000);
    }
  };

  const handleWrongAnswer = () => {
    setTotalQuestions(totalQuestions + 1);
    setStreakCount(0); // Reset streak on wrong answer
  };

  const getLevelMessage = () => {
    if (level === 1) return "Let's start with counting! 🔢";
    if (level === 2) return "Great! Now let's try addition! ➕";
    if (level >= 3) return "Awesome! Time for subtraction! ➖";
    return "You're doing amazing! Keep going! 🌟";
  };

  const getEncouragementMessage = () => {
    const messages = [
      "Fantastic! You're getting smarter! 🧠",
      "Incredible work! Luma is so proud! 🎉",
      "You're a math superstar! ⭐",
      "Amazing! You're learning so fast! 🚀",
      "Wonderful job! Keep up the great work! 💪"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-4">
      <SoundToggle />
      
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-lg font-medium">Back to Home</span>
      </Link>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent rounded-full mb-4 bounce-gentle">
            <Calculator className="w-10 h-10 text-accent-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Math Adventures! 🧮
          </h1>
        </div>

        {/* Chat message */}
        <div className="max-w-2xl mx-auto mb-8">
          <ChatBubble>
            <div className="flex items-start space-x-4">
              <img 
                src={lumaMascot} 
                alt="Luma" 
                className="w-12 h-12 rounded-full flex-shrink-0"
              />
              <div>
                <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
                  {getLevelMessage()}
                </p>
                <p className="text-lg text-muted-foreground mt-2">
                  Count the pictures and enter your answer! 🎯
                </p>
              </div>
            </div>
          </ChatBubble>
        </div>

        {/* Encouragement message */}
        {showEncouragement && (
          <div className="max-w-2xl mx-auto mb-6">
            <ChatBubble className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300">
              <div className="flex items-start space-x-4">
                <img 
                  src={lumaMascot} 
                  alt="Luma" 
                  className="w-12 h-12 rounded-full flex-shrink-0 animate-bounce"
                />
                <div>
                  <p className="text-xl font-medium text-foreground leading-relaxed">
                    {getEncouragementMessage()}
                  </p>
                </div>
              </div>
            </ChatBubble>
          </div>
        )}

        {/* Progress Tracker */}
        <div className="mb-8">
          <ProgressTracker
            level={level}
            score={score}
            correctAnswers={correctAnswers}
            totalQuestions={totalQuestions}
            streakCount={streakCount}
          />
        </div>

        {/* Math Question */}
        <div className="mb-8">
          <VisualMathQuestion
            level={level}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
          />
        </div>

        {/* Tips section */}
        <div className="bg-card rounded-3xl p-6 shadow-soft border border-border mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4 text-center">
            💡 Tips for Success!
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
            <div className="flex items-start gap-3">
              <span className="text-2xl">👀</span>
              <div>
                <p className="font-medium">Look Carefully</p>
                <p className="text-sm">Count each picture one by one</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🤔</span>
              <div>
                <p className="font-medium">Think Before You Answer</p>
                <p className="text-sm">Take your time to get it right</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="font-medium">Practice Makes Perfect</p>
                <p className="text-sm">The more you practice, the better you get</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🌟</span>
              <div>
                <p className="font-medium">Have Fun!</p>
                <p className="text-sm">Learning should be enjoyable</p>
              </div>
            </div>
          </div>
        </div>

        {/* Luma mascot in corner */}
        <div className="fixed bottom-4 left-4 z-40">
          <img 
            src={lumaMascot} 
            alt="Luma mascot" 
            className="w-20 h-20 bounce-gentle"
          />
        </div>
      </div>
    </div>
  );
};

export default MathLearning;