import { useState } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import ChatBubble from "@/components/ChatBubble";
import SoundToggle from "@/components/SoundToggle";
import VisualAlphabetQuestion from "@/components/VisualAlphabetQuestion";
import ProgressTracker from "@/components/ProgressTracker";
import lumaMascot from "@/assets/luma-mascot.png";

const AlphabetLearning = () => {
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
    setScore(score + (15 * level)); // More points for alphabet learning
    
    // Level up every 4 correct answers (slightly faster than math)
    if (newCorrectAnswers % 4 === 0) {
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
    if (level === 1) return "Let's learn letters and sounds! 🔤";
    if (level === 2) return "Great! Now let's match words! 📝";
    if (level >= 3) return "Awesome! Time to connect letters and words! 🎯";
    return "You're becoming an alphabet expert! 🌟";
  };

  const getEncouragementMessage = () => {
    const messages = [
      "Amazing! Your reading skills are growing! 📚",
      "Fantastic! Luma loves your progress! 🎉",
      "You're an alphabet superstar! ⭐",
      "Incredible! You're reading like a pro! 🚀",
      "Wonderful! Keep up the excellent work! 💪"
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
            <BookOpen className="w-10 h-10 text-accent-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Alphabet Adventures! 🔤
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
                  Look at the pictures and letters, then choose your answer! 🎯
                </p>
              </div>
            </div>
          </ChatBubble>
        </div>

        {/* Encouragement message */}
        {showEncouragement && (
          <div className="max-w-2xl mx-auto mb-6">
            <ChatBubble className="bg-gradient-to-r from-pink-100 to-purple-100 border-pink-300">
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

        {/* Alphabet Question */}
        <div className="mb-8">
          <VisualAlphabetQuestion
            level={level}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
          />
        </div>

        {/* Tips section */}
        <div className="bg-card rounded-3xl p-6 shadow-soft border border-border mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4 text-center">
            📖 Learning Tips!
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
            <div className="flex items-start gap-3">
              <span className="text-2xl">👂</span>
              <div>
                <p className="font-medium">Listen Carefully</p>
                <p className="text-sm">Use the "Hear it!" button to learn sounds</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🗣️</span>
              <div>
                <p className="font-medium">Say It Out Loud</p>
                <p className="text-sm">Practice saying letters and words</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔍</span>
              <div>
                <p className="font-medium">Look at the Pictures</p>
                <p className="text-sm">Pictures help you remember letters</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <p className="font-medium">Practice Daily</p>
                <p className="text-sm">A little practice every day helps a lot</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alphabet Reference */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 shadow-soft border border-border mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4 text-center">
            🌈 Alphabet Rainbow
          </h3>
          <div className="grid grid-cols-6 md:grid-cols-13 gap-2 text-center">
            {Array.from({ length: 26 }, (_, i) => {
              const letter = String.fromCharCode(65 + i);
              return (
                <div key={letter} className="p-2 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-primary">{letter}</div>
                  <div className="text-xs text-muted-foreground">{letter.toLowerCase()}</div>
                </div>
              );
            })}
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

export default AlphabetLearning;