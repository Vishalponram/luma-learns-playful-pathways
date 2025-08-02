import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

const SoundToggle = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    // Here you would implement actual audio toggle logic
  };

  return (
    <button
      onClick={toggleSound}
      className="sound-toggle"
      aria-label={soundEnabled ? "Turn off sound" : "Turn on sound"}
    >
      {soundEnabled ? (
        <Volume2 className="w-6 h-6 text-primary" />
      ) : (
        <VolumeX className="w-6 h-6 text-muted-foreground" />
      )}
    </button>
  );
};

export default SoundToggle;