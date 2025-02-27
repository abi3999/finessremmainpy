
import { useState, useEffect } from "react";
import { Play, Pause, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const toggle = () => {
    setIsActive(!isActive);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-primary mb-8">Rest Timer</h1>
      
      <div className="max-w-xl mx-auto text-center">
        <div className="bg-white/70 backdrop-blur-lg rounded-xl p-8 shadow-lg mb-6">
          <div className="text-6xl font-bold text-primary mb-8">
            {formatTime(seconds)}
          </div>
          
          <div className="flex justify-center gap-4">
            <Button
              onClick={toggle}
              size="lg"
              variant={isActive ? "destructive" : "default"}
            >
              {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            <Button onClick={reset} size="lg" variant="outline">
              <RefreshCw className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
