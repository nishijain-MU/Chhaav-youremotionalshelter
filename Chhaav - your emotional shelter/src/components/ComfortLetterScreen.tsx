import { ArrowLeft, Heart } from 'lucide-react';
import type { Screen } from '../App';
import { useState } from 'react';

interface ComfortLetterScreenProps {
  navigate: (screen: Screen) => void;
  isDarkMode?: boolean;
}

export function ComfortLetterScreen({ navigate, isDarkMode }: ComfortLetterScreenProps) {
  const [selectedLetter] = useState<string>(
    `Dear friend,

I wanted to take a moment to remind you of something important: you're doing better than you think.

Sometimes the hardest battles we fight are the ones no one else can see. The fact that you showed up today, that you're here reading this, means something. It means you haven't given up, even when things felt impossible.

You don't have to be perfect. You don't have to have it all figured out. You just have to keep going, one gentle step at a time.

I see your efforts. I see your heart. And I'm proud of you for holding on, even when letting go seemed easier.

Take your time. Rest when you need to. And remember: this too shall pass, but you don't have to rush it.

With warmth,
Your companion`
  );

  return (
    <div className={`relative w-full min-h-screen overflow-y-auto pb-6 ${
      isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white lg:bg-[#FAFAF9]'
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

        {/* Letter */}
        <div className="px-6 pb-8">
          <div className={`rounded-3xl p-8 shadow-xl max-w-sm mx-auto ${
            isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white'
          }`}>
            {/* Letter Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#EDAFB8] to-[#F7E1D7] rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className={`mb-2 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>A Letter of Comfort</h2>
              <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`}>For you, right now</p>
            </div>

            {/* Letter Content */}
            <div className={`space-y-4 leading-relaxed ${
              isDarkMode ? 'text-white/80' : 'text-[#4A5759]/80'
            }`}>
              <p>{selectedLetter}</p>
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