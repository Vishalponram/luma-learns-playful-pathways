import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calculator, BookOpen } from "lucide-react";
import ChatBubble from "@/components/ChatBubble";
import TypingDots from "@/components/TypingDots";
import SoundToggle from "@/components/SoundToggle";
import lumaMascot from "@/assets/luma-mascot.png";

const Index = () => {
  const navigate = useNavigate();
  const [showTyping, setShowTyping] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Simulate typing effect
    const typingTimer = setTimeout(() => {
      setShowTyping(false);
      setShowMessage(true);
    }, 2000);

    const buttonsTimer = setTimeout(() => {
      setShowButtons(true);
    }, 3000);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(buttonsTimer);
    };
  }, []);

  const handleMathClick = () => {
    navigate("/math");
  };

  const handleAlphabetClick = () => {
    navigate("/alphabet");
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-4 overflow-hidden">
      <SoundToggle />
      
      <div className="max-w-4xl mx-auto pt-8">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Luma Learns
            </span>
          </h1>
          <div className="w-24 h-24 mx-auto mb-6">
            <img 
              src={lumaMascot} 
              alt="Luma mascot" 
              className="w-full h-full bounce-gentle"
            />
          </div>
        </div>

        {/* Chat Interface */}
        <div className="max-w-2xl mx-auto mb-8">
          <ChatBubble className="relative">
            <div className="flex items-start space-x-4">
              <img 
                src={lumaMascot} 
                alt="Luma" 
                className="w-12 h-12 rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                {showTyping && (
                  <div className="flex items-center space-x-3">
                    <span className="text-lg text-muted-foreground">Luma is typing</span>
                    <TypingDots />
                  </div>
                )}
                
                {showMessage && (
                  <div className="animate-fade-in">
                    <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
                      Hi there, little explorer! 🌟 I'm Luma — your friendly learning buddy. 
                      What would you like to learn today?
                    </p>
                  </div>
                )}
              </div>
            </div>
          </ChatBubble>
        </div>

        {/* Learning Options */}
        {showButtons && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Math Button */}
              <button
                onClick={handleMathClick}
                className="btn-playful group relative overflow-hidden"
              >
                <div className="flex items-center justify-center space-x-4">
                  <Calculator className="w-8 h-8 bounce-gentle" />
                  <div className="text-left">
                    <div className="text-2xl font-bold">Learn Math</div>
                    <div className="text-sm opacity-90">Numbers & Counting</div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 text-2xl">🧮</div>
              </button>

              {/* Alphabet Button */}
              <button
                onClick={handleAlphabetClick}
                className="btn-warm group relative overflow-hidden"
              >
                <div className="flex items-center justify-center space-x-4">
                  <BookOpen className="w-8 h-8 bounce-gentle" />
                  <div className="text-left">
                    <div className="text-2xl font-bold">Learn Alphabets</div>
                    <div className="text-sm opacity-90">Letters & Words</div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 text-2xl">🔤</div>
              </button>
            </div>
          </div>
        )}

        {/* Floating Elements */}
        <div className="fixed bottom-4 left-4 z-40">
          <img 
            src={lumaMascot} 
            alt="Luma mascot" 
            className="w-20 h-20 bounce-gentle opacity-50"
          />
        </div>

        {/* Decorative floating shapes */}
        <div className="fixed top-20 right-10 w-6 h-6 bg-accent rounded-full opacity-20 bounce-gentle"></div>
        <div className="fixed top-40 left-10 w-4 h-4 bg-secondary rounded-full opacity-30 bounce-gentle" style={{ animationDelay: '0.5s' }}></div>
        <div className="fixed bottom-40 right-20 w-5 h-5 bg-highlight rounded-full opacity-25 bounce-gentle" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default Index;
