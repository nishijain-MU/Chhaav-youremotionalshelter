import { ArrowLeft, Play, Pause, Volume2, VolumeX, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { Screen } from '../App';

interface ComfortVideoScreenProps {
  navigate: (screen: Screen) => void;
  isDarkMode?: boolean;
}

export function ComfortVideoScreen({ navigate, isDarkMode }: ComfortVideoScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentMoment, setCurrentMoment] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const moments = [
    { emoji: '💝', text: 'You are exactly where you need to be' },
    { emoji: '🌸', text: 'Your feelings are valid and they matter' },
    { emoji: '✨', text: 'It\'s okay to rest when you\'re tired' },
    { emoji: '🌙', text: 'You don\'t have to be strong all the time' },
    { emoji: '🦋', text: 'Growth happens in gentle moments too' },
    { emoji: '🌿', text: 'You are worthy of kindness and care' },
    { emoji: '💫', text: 'Tomorrow is a new beginning' },
    { emoji: '🌺', text: 'You are enough, just as you are' },
  ];

  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          
          // Update moment based on progress
          const newProgress = prev + 0.4;
          const momentIndex = Math.floor((newProgress / 100) * moments.length);
          setCurrentMoment(Math.min(momentIndex, moments.length - 1));
          
          return newProgress;
        });
      }, 50);
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying, moments.length]);

  const togglePlay = () => {
    if (progress >= 100) {
      setProgress(0);
      setCurrentMoment(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleClose = () => {
    setIsPlaying(false);
    navigate('comfort-corner');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#F7E1D7] via-[#EDAFB8] to-[#DEDBD2]">
      <div className="max-w-md lg:max-w-lg mx-auto h-full flex flex-col">
      {/* Close Button */}
      <button
        onClick={() => navigate('comfort-corner')}
        className="absolute top-12 left-6 z-50 p-2 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/30 transition-all duration-300 safe-area-top"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-50 safe-area-top">
        <div 
          className="h-full bg-white transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 px-6 pt-12 pb-6 z-40 bg-gradient-to-b from-black/30 to-transparent safe-area-top">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EDAFB8] to-[#F7E1D7] flex items-center justify-center shadow-lg">
              <span className="text-xl">💌</span>
            </div>
            <div>
              <h3 className="text-white">Comfort Corner</h3>
              <p className="text-white/80 text-xs">A warm message for you</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Main Content Area - Tap to Play/Pause */}
      <div
        onClick={togglePlay}
        className="flex-1 flex items-center justify-center relative cursor-pointer"
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7E1D7]/50 via-transparent to-[#EDAFB8]/50 animate-pulse" />
        
        {/* Current Moment Display */}
        <div className="relative z-10 text-center px-8">
          <div className="text-8xl mb-6 animate-fade-in">
            {moments[currentMoment].emoji}
          </div>
          <p className="text-white text-xl leading-relaxed mb-8 animate-fade-in">
            {moments[currentMoment].text}
          </p>
          
          {/* Play/Pause Indicator */}
          {!isPlaying && progress < 100 && (
            <div className="w-20 h-20 mx-auto rounded-full bg-white/90 flex items-center justify-center shadow-2xl animate-pulse">
              <Play className="w-10 h-10 text-[#EDAFB8] ml-1" fill="currentColor" />
            </div>
          )}
          
          {progress >= 100 && (
            <div className="space-y-4">
              <p className="text-white/80 text-sm">Message complete</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProgress(0);
                  setCurrentMoment(0);
                  setIsPlaying(true);
                }}
                className="px-6 py-3 bg-white text-[#EDAFB8] rounded-2xl hover:bg-white/90 transition-all duration-300"
              >
                Watch Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="px-6 pb-8 z-40 bg-gradient-to-t from-black/30 to-transparent safe-area-bottom">
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-white text-sm">With love from Chhaav</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
      </div>
    </div>
  );
}