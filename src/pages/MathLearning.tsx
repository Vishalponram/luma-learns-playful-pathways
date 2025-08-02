import { ArrowLeft, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import ChatBubble from "@/components/ChatBubble";
import SoundToggle from "@/components/SoundToggle";
import lumaMascot from "@/assets/luma-mascot.png";

const MathLearning = () => {
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

      <div className="max-w-4xl mx-auto">
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
                  Yay! Let's solve some fun math puzzles with pictures! 🌟
                </p>
                <p className="text-lg text-muted-foreground mt-2">
                  Get ready for counting games, shape adventures, and number magic!
                </p>
              </div>
            </div>
          </ChatBubble>
        </div>

        {/* Placeholder content */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-3xl p-8 shadow-soft border border-border">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🔢</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Counting Fun</h3>
              <p className="text-muted-foreground">Count objects and learn numbers 1-10</p>
            </div>
          </div>

          <div className="bg-card rounded-3xl p-8 shadow-soft border border-border">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-warm rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🔴</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Shape Explorer</h3>
              <p className="text-muted-foreground">Discover circles, squares, and triangles</p>
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