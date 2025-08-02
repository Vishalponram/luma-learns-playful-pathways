import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, Star, Volume2 } from "lucide-react";

interface AlphabetQuestion {
  id: number;
  letter: string;
  word: string;
  emoji: string;
  options: string[];
  correctAnswer: string;
  type: 'identify-letter' | 'identify-word' | 'match-letter-word';
}

interface VisualAlphabetQuestionProps {
  level: number;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}

const VisualAlphabetQuestion = ({ level, onCorrectAnswer, onWrongAnswer }: VisualAlphabetQuestionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<AlphabetQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const alphabetData = [
    { letter: 'A', word: 'Apple', emoji: '🍎' },
    { letter: 'B', word: 'Ball', emoji: '⚽' },
    { letter: 'C', word: 'Cat', emoji: '🐱' },
    { letter: 'D', word: 'Dog', emoji: '🐶' },
    { letter: 'E', word: 'Elephant', emoji: '🐘' },
    { letter: 'F', word: 'Fish', emoji: '🐠' },
    { letter: 'G', word: 'Grapes', emoji: '🍇' },
    { letter: 'H', word: 'House', emoji: '🏠' },
    { letter: 'I', word: 'Ice cream', emoji: '🍦' },
    { letter: 'J', word: 'Juice', emoji: '🧃' },
    { letter: 'K', word: 'Kite', emoji: '🪁' },
    { letter: 'L', word: 'Lion', emoji: '🦁' },
    { letter: 'M', word: 'Moon', emoji: '🌙' },
    { letter: 'N', word: 'Nest', emoji: '🪺' },
    { letter: 'O', word: 'Orange', emoji: '🍊' },
    { letter: 'P', word: 'Pizza', emoji: '🍕' },
    { letter: 'Q', word: 'Queen', emoji: '👑' },
    { letter: 'R', word: 'Rainbow', emoji: '🌈' },
    { letter: 'S', word: 'Sun', emoji: '☀️' },
    { letter: 'T', word: 'Tree', emoji: '🌳' },
    { letter: 'U', word: 'Umbrella', emoji: '☂️' },
    { letter: 'V', word: 'Violin', emoji: '🎻' },
    { letter: 'W', word: 'Whale', emoji: '🐋' },
    { letter: 'X', word: 'Xylophone', emoji: '🎹' },
    { letter: 'Y', word: 'Yellow', emoji: '💛' },
    { letter: 'Z', word: 'Zebra', emoji: '🦓' }
  ];

  const generateQuestion = () => {
    const availableLetters = alphabetData.slice(0, Math.min(6 + level * 2, 26)); // Gradually introduce more letters
    const targetLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
    
    if (level === 1) {
      // Level 1: Identify letter from picture
      const wrongOptions = alphabetData
        .filter(item => item.letter !== targetLetter.letter)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(item => item.letter);
      
      const options = [targetLetter.letter, ...wrongOptions].sort(() => Math.random() - 0.5);
      
      return {
        id: Date.now(),
        letter: targetLetter.letter,
        word: targetLetter.word,
        emoji: targetLetter.emoji,
        options,
        correctAnswer: targetLetter.letter,
        type: 'identify-letter' as const
      };
    } else if (level === 2) {
      // Level 2: Identify word from letter
      const wrongOptions = alphabetData
        .filter(item => item.letter !== targetLetter.letter)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(item => item.word);
      
      const options = [targetLetter.word, ...wrongOptions].sort(() => Math.random() - 0.5);
      
      return {
        id: Date.now(),
        letter: targetLetter.letter,
        word: targetLetter.word,
        emoji: targetLetter.emoji,
        options,
        correctAnswer: targetLetter.word,
        type: 'identify-word' as const
      };
    } else {
      // Level 3+: Match letter with word
      const wrongWords = alphabetData
        .filter(item => item.letter !== targetLetter.letter)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(item => `${item.letter} - ${item.word}`);
      
      const options = [`${targetLetter.letter} - ${targetLetter.word}`, ...wrongWords].sort(() => Math.random() - 0.5);
      
      return {
        id: Date.now(),
        letter: targetLetter.letter,
        word: targetLetter.word,
        emoji: targetLetter.emoji,
        options,
        correctAnswer: `${targetLetter.letter} - ${targetLetter.word}`,
        type: 'match-letter-word' as const
      };
    }
  };

  useEffect(() => {
    setCurrentQuestion(generateQuestion());
    setSelectedAnswer("");
    setFeedback(null);
    setIsSubmitted(false);
  }, [level]);

  const handleSubmit = () => {
    if (!currentQuestion || selectedAnswer === "") return;
    
    setIsSubmitted(true);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setFeedback("correct");
      setTimeout(() => {
        onCorrectAnswer();
        setCurrentQuestion(generateQuestion());
        setSelectedAnswer("");
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

  const speakLetter = () => {
    if (!currentQuestion) return;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`${currentQuestion.letter} for ${currentQuestion.word}`);
      utterance.rate = 0.7;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  const getQuestionText = () => {
    if (!currentQuestion) return "";
    
    switch (currentQuestion.type) {
      case 'identify-letter':
        return `Which letter does ${currentQuestion.word} start with?`;
      case 'identify-word':
        return `Which word starts with the letter ${currentQuestion.letter}?`;
      case 'match-letter-word':
        return `Match the letter with the correct word:`;
      default:
        return "";
    }
  };

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <Card className="p-8 bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-primary/20">
      <div className="text-center space-y-6">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          {getQuestionText()}
        </h3>
        
        {/* Visual Display */}
        <div className="flex flex-col items-center space-y-4">
          {currentQuestion.type === 'identify-letter' && (
            <div className="space-y-4">
              <div className="text-8xl animate-bounce">{currentQuestion.emoji}</div>
              <div className="text-2xl font-bold text-foreground">{currentQuestion.word}</div>
              <Button
                onClick={speakLetter}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                Hear it!
              </Button>
            </div>
          )}
          
          {currentQuestion.type === 'identify-word' && (
            <div className="space-y-4">
              <div className="text-9xl font-bold text-primary animate-pulse">
                {currentQuestion.letter}
              </div>
              <Button
                onClick={speakLetter}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                Hear it!
              </Button>
            </div>
          )}
          
          {currentQuestion.type === 'match-letter-word' && (
            <div className="flex items-center space-x-8">
              <div className="text-8xl font-bold text-primary animate-pulse">
                {currentQuestion.letter}
              </div>
              <div className="text-2xl">+</div>
              <div className="text-8xl animate-bounce">{currentQuestion.emoji}</div>
              <div className="text-2xl">=</div>
              <div className="text-2xl">?</div>
            </div>
          )}
        </div>
        
        {/* Answer Options */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => setSelectedAnswer(option)}
                disabled={isSubmitted}
                variant={selectedAnswer === option ? "default" : "outline"}
                className={`p-4 h-auto text-lg font-medium ${
                  selectedAnswer === option 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-primary/10"
                }`}
              >
                {option}
              </Button>
            ))}
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={isSubmitted || selectedAnswer === ""}
            className="btn-warm"
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
                <span>Excellent! 🎉</span>
                <Star className="w-8 h-8 text-yellow-500" />
              </>
            ) : (
              <>
                <XCircle className="w-8 h-8" />
                <span>Try again! You're learning! 📚</span>
              </>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default VisualAlphabetQuestion;