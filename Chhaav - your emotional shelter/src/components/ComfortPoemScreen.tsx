import { ArrowLeft, Sparkles } from 'lucide-react';
import type { Screen } from '../App';

interface ComfortPoemScreenProps {
  navigate: (screen: Screen) => void;
  isDarkMode?: boolean;
}

export function ComfortPoemScreen({ navigate, isDarkMode }: ComfortPoemScreenProps) {
  const poem = {
    title: "Under the Shade",
    lines: [
      "Beneath the gentle canopy,",
      "Where light falls soft and kind,",
      "You rest among the whispers",
      "Of a calm and quiet mind.",
      "",
      "The world may rush beyond you,",
      "With storms that twist and bend,",
      "But here, beneath your shelter,",
      "You're safe until the end.",
      "",
      "Each breath you take is precious,",
      "Each moment yours to hold,",
      "You're growing in the silence,",
      "More valuable than gold.",
      "",
      "So rest a while, dear traveler,",
      "Let go of what you chase,",
      "For sometimes healing happens",
      "In this warm and gentle space."
    ]
  };

  return (
    <div className={`relative w-full min-h-screen overflow-y-auto pb-6 ${
      isDarkMode 
        ? 'bg-[#1a1a1a]' 
        : 'bg-gradient-to-br from-[#F7E1D7] to-[#EDAFB8]/20 lg:bg-gradient-to-br lg:from-[#FAFAF9] lg:to-[#F7E1D7]'
    }`}>
      <div className="max-w-3xl mx-auto lg:px-8 lg:py-8">
        {/* Header */}
        <div className="px-6 pt-12 pb-4 safe-area-top">
          <button
            onClick={() => navigate('comfort-corner')}
            className={`p-2 rounded-full transition-all duration-300 -ml-2 ${
              isDarkMode ? 'hover:bg-white/10' : 'hover:bg-white/30'
            }`}
          >
            <ArrowLeft className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} />
          </button>
        </div>

        {/* Poem */}
        <div className="px-6 pb-8">
          <div className={`rounded-3xl p-8 shadow-xl max-w-lg mx-auto ${
            isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white'
          }`}>
            {/* Poem Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#EDAFB8] to-[#B0C4B1] rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className={`mb-2 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>{poem.title}</h2>
              <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`}>A gentle verse for you</p>
            </div>

            {/* Poem Content */}
            <div className={`space-y-1 leading-relaxed text-center ${
              isDarkMode ? 'text-white/80' : 'text-[#4A5759]/80'
            }`}>
              {poem.lines.map((line, index) => (
                <p key={index} className={line === "" ? "mb-2" : ""}>
                  {line || "\u00A0"}
                </p>
              ))}
            </div>

            {/* Footer */}
            <div className={`mt-8 pt-6 border-t ${
              isDarkMode ? 'border-white/10' : 'border-[#DEDBD2]'
            }`}>
              <button
                onClick={() => navigate('home')}
                className="w-full px-5 py-3 bg-[#EDAFB8] text-white rounded-2xl hover:bg-[#E19AA5] transition-all duration-300"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}