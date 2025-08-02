import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, Target } from "lucide-react";

interface ProgressTrackerProps {
  level: number;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  streakCount: number;
}

const ProgressTracker = ({ 
  level, 
  score, 
  correctAnswers, 
  totalQuestions, 
  streakCount 
}: ProgressTrackerProps) => {
  const [celebrateLevel, setCelebrateLevel] = useState(false);

  useEffect(() => {
    if (level > 1) {
      setCelebrateLevel(true);
      const timer = setTimeout(() => setCelebrateLevel(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [level]);

  const progressPercentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  const questionsNeededForNextLevel = Math.max(5 - (correctAnswers % 5), 0);

  return (
    <Card className="p-6 bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-primary/20">
      <div className="space-y-4">
        {/* Header with level */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 ${celebrateLevel ? 'animate-pulse' : ''}`}>
              <Trophy className="w-6 h-6 text-yellow-600" />
              <span className="text-2xl font-bold text-foreground">Level {level}</span>
            </div>
            {celebrateLevel && (
              <Badge className="bg-yellow-200 text-yellow-800 animate-bounce">
                Level Up! 🎉
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-xl font-bold text-foreground">{score}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress to Next Level</span>
            <span className="font-medium">{correctAnswers % 5}/5 correct</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((correctAnswers % 5) / 5) * 100}%` }}
            ></div>
          </div>
          {questionsNeededForNextLevel > 0 && (
            <p className="text-sm text-muted-foreground">
              {questionsNeededForNextLevel} more correct answer{questionsNeededForNextLevel !== 1 ? 's' : ''} to level up!
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-lg font-bold text-green-600">{correctAnswers}</div>
            <div className="text-xs text-muted-foreground">Correct</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-red-500">❌</span>
            </div>
            <div className="text-lg font-bold text-red-600">{totalQuestions - correctAnswers}</div>
            <div className="text-xs text-muted-foreground">Mistakes</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-orange-500">🔥</span>
            </div>
            <div className="text-lg font-bold text-orange-600">{streakCount}</div>
            <div className="text-xs text-muted-foreground">Streak</div>
          </div>
        </div>

        {/* Motivational messages based on performance */}
        {streakCount >= 5 && (
          <div className="text-center p-3 bg-yellow-100 rounded-lg border border-yellow-300">
            <span className="text-yellow-800 font-medium">🔥 Amazing streak! You're on fire! 🔥</span>
          </div>
        )}
        
        {progressPercentage >= 80 && totalQuestions >= 5 && (
          <div className="text-center p-3 bg-green-100 rounded-lg border border-green-300">
            <span className="text-green-800 font-medium">🌟 Excellent work! Keep it up! 🌟</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProgressTracker;