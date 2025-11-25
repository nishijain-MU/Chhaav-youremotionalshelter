import { ArrowLeft, MessageCircle } from 'lucide-react';
import type { Screen } from '../App';

interface ObservationsScreenProps {
  navigate: (screen: Screen) => void;
  isDarkMode?: boolean;
}

export function ObservationsScreen({ navigate, isDarkMode }: ObservationsScreenProps) {
  const observations = [
    {
      id: 1,
      date: 'Today',
      items: [
        { text: 'You sounded a little tired in our conversation earlier.', color: '#EDAFB8' },
        { text: 'Today felt softer than your last few days.', color: '#B0C4B1' },
      ]
    },
    {
      id: 2,
      date: 'Yesterday',
      items: [
        { text: 'You spoke about work with more lightness today.', color: '#F7E1D7' },
        { text: 'It seems like you\'re being kinder to yourself.', color: '#EDAFB8' },
      ]
    },
    {
      id: 3,
      date: '2 days ago',
      items: [
        { text: 'You took a moment to breathe before responding.', color: '#B0C4B1' },
        { text: 'There was a calmness in your words.', color: '#DEDBD2' },
      ]
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
          onClick={() => navigate('home')}
          className={`mb-4 p-2 rounded-full transition-all duration-300 -ml-2 ${
            isDarkMode ? 'hover:bg-white/10' : 'hover:bg-[#F7E1D7]'
          }`}
        >
          <ArrowLeft className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} />
        </button>
        <h1 className={`text-2xl mb-1 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Gentle Observations</h1>
        <p className={`text-sm leading-relaxed ${
          isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'
        }`}>
          Little things I've noticed about your journey.
        </p>
      </div>

      {/* Observations List */}
      <div className="px-6 py-6 space-y-4">
        {observations.map((obs) => (
          <div
            key={obs.id}
            className={`rounded-3xl p-5 shadow-sm ${
              isDarkMode ? 'bg-[#2a2a2a]' : 'bg-[#F7E1D7]'
            }`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5"
                style={{ backgroundColor: obs.items[0].color }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs ${
                    isDarkMode ? 'text-white/50' : 'text-[#4A5759]/50'
                  }`}>{obs.date}</span>
                </div>
                {obs.items.map((item, index) => (
                  <div key={index}>
                    <h3 className={`mb-2 leading-relaxed ${
                      isDarkMode ? 'text-white' : 'text-[#4A5759]'
                    }`}>
                      {item.text}
                    </h3>
                    <button
                      onClick={() => navigate('chat')}
                      className="flex items-center gap-2 text-[#EDAFB8] text-sm hover:gap-3 transition-all duration-300"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Talk about this</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gentle Note */}
      <div className="px-6 pb-6">
        <div className={`rounded-3xl p-5 ${
          isDarkMode ? 'bg-[#3a3a3a]' : 'bg-gradient-to-br from-[#DEDBD2] to-[#B0C4B1]/30'
        }`}>
          <p className={`text-sm italic text-center leading-relaxed ${
            isDarkMode ? 'text-white/70' : 'text-[#4A5759]/70'
          }`}>
            These observations are here to remind you: I'm paying attention, and you matter.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}