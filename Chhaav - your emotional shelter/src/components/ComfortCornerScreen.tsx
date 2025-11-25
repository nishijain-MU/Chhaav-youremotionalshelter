import { ArrowLeft, FileText, Heart, Sparkles, Book, Video } from 'lucide-react';
import type { Screen } from '../App';

interface ComfortCornerScreenProps {
  navigate: (screen: Screen) => void;
  isDarkMode?: boolean;
}

export function ComfortCornerScreen({ navigate, isDarkMode }: ComfortCornerScreenProps) {
  const comfortSections = [
    {
      id: 'letters',
      title: 'Comfort Letters',
      description: 'Personalized words just for you',
      icon: '💌',
      color: 'from-[#F7E1D7] to-[#EDAFB8]/30',
      screen: 'comfort-letter' as Screen,
    },
    {
      id: 'poems',
      title: 'Gentle Poems',
      description: 'Softly crafted verses',
      icon: '📜',
      color: 'from-[#EDAFB8]/30 to-[#F7E1D7]',
      screen: 'comfort-poem' as Screen,
    },
    {
      id: 'stories',
      title: 'Reflective Stories',
      description: 'Narratives that hold you',
      icon: '📖',
      color: 'from-[#B0C4B1]/30 to-[#F7E1D7]',
      screen: 'comfort-story' as Screen,
    },
    {
      id: 'videos',
      title: 'Video Messages',
      description: 'Visual warmth for you',
      icon: '🎬',
      color: 'from-[#F7E1D7] to-[#DEDBD2]',
      screen: 'comfort-video' as Screen,
    },
  ];

  return (
    <div className={`relative w-full min-h-screen overflow-y-auto pb-6 ${
      isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white lg:bg-[#FAFAF9]'
    }`}>
      <div className="max-w-4xl mx-auto lg:px-8">
      {/* Header */}
      <div className="px-6 lg:px-0 pt-12 pb-6">
        <button
          onClick={() => navigate('journey')}
          className={`mb-4 p-2 rounded-full transition-all duration-300 -ml-2 ${
            isDarkMode ? 'hover:bg-white/10' : 'hover:bg-[#F7E1D7]'
          }`}
        >
          <ArrowLeft className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} />
        </button>
        <h1 className={`text-2xl mb-1 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Comfort Corner</h1>
        <p className={`text-sm leading-relaxed ${
          isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'
        }`}>
          What do you need right now?
        </p>
      </div>

      {/* Options */}
      <div className="px-6 py-6 space-y-4">
        {comfortSections.map((section) => (
          <button
            key={section.id}
            onClick={() => navigate(section.screen)}
            className={`w-full rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-300 text-left ${
              isDarkMode ? 'bg-[#2a2a2a]' : `bg-gradient-to-br ${section.color}`
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl ${
                isDarkMode ? 'bg-[#EDAFB8]/20' : 'bg-white/60'
              }`}>
                {section.icon}
              </div>
              <div className="flex-1">
                <h3 className={`mb-1 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>{section.title}</h3>
                <p className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-white/70' : 'text-[#4A5759]/70'
                }`}>
                  {section.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Gentle Note */}
      <div className="px-6 pb-6">
        <div className={`rounded-3xl p-5 shadow-sm ${
          isDarkMode ? 'bg-[#3a3a3a]' : 'bg-[#F7E1D7]'
        }`}>
          <p className={`text-sm italic text-center leading-relaxed ${
            isDarkMode ? 'text-white/70' : 'text-[#4A5759]/70'
          }`}>
            Whenever you feel like you need a warm embrace, this corner is here for you.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}