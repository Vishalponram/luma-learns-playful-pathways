import { ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import ChatBubble from "@/components/ChatBubble";
import SoundToggle from "@/components/SoundToggle";
import lumaMascot from "@/assets/luma-mascot.png";

const AlphabetLearning = () => {
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-4 bounce-gentle">
            <BookOpen className="w-10 h-10 text-secondary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Alphabet Adventure! 🔤
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
                  Awesome! Let's explore the world of A to Z! 🌟
                </p>
                <p className="text-lg text-muted-foreground mt-2">
                  We'll learn letters with fun pictures and sounds!
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
                <span className="text-3xl">🅰️</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Letter Sounds</h3>
              <p className="text-muted-foreground">Learn how each letter sounds</p>
            </div>
          </div>

          <div className="bg-card rounded-3xl p-8 shadow-soft border border-border">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-warm rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🖼️</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Picture Words</h3>
              <p className="text-muted-foreground">Match letters with fun pictures</p>
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

export default AlphabetLearning;