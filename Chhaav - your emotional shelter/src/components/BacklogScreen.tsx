import { ArrowLeft, Calendar } from 'lucide-react';
import type { Screen } from '../App';

interface BacklogScreenProps {
  navigate: (screen: Screen, options?: { backlogItem?: string }) => void;
  isDarkMode?: boolean;
}

export function BacklogScreen({ navigate, isDarkMode }: BacklogScreenProps) {
  const backlogItems = [
    {
      id: 1,
      title: 'That conversation with my manager',
      description: 'I felt dismissed when I brought up my concerns...',
      date: 'Oct 15, 2024',
      color: '#EDAFB8',
    },
    {
      id: 2,
      title: 'Feeling unheard at the team meeting',
      description: 'My ideas were overlooked again and I don\'t know...',
      date: 'Oct 10, 2024',
      color: '#B0C4B1',
    },
    {
      id: 3,
      title: 'Anxiety about the upcoming presentation',
      description: 'The thought of presenting makes me feel...',
      date: 'Oct 8, 2024',
      color: '#F7E1D7',
    },
    {
      id: 4,
      title: 'Conflict with a close friend',
      description: 'We had a misunderstanding and I\'m not ready to...',
      date: 'Oct 5, 2024',
      color: '#DEDBD2',
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
        <h1 className={`text-2xl mb-1 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Feelings I'm Not Ready For Yet</h1>
        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`}>
          These are safe here. Revisit them whenever you feel ready.
        </p>
      </div>

      {/* Backlog Items */}
      <div className="px-6 py-6 space-y-4">
        {backlogItems.map((item) => (
          <div
            key={item.id}
            className={`rounded-3xl p-5 shadow-sm ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-[#F7E1D7]'}`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1">
                <h3 className={`mb-1 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed mb-2 ${
                  isDarkMode ? 'text-white/70' : 'text-[#4A5759]/70'
                }`}>
                  {item.description}
                </p>
                <div className={`flex items-center gap-1.5 text-xs ${
                  isDarkMode ? 'text-white/50' : 'text-[#4A5759]/50'
                }`}>
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Saved on {item.date}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('chat', { backlogItem: item.title })}
              className="w-full px-5 py-2.5 bg-[#EDAFB8] text-white rounded-2xl hover:bg-[#E19AA5] transition-all duration-300"
            >
              Revisit Gently
            </button>
          </div>
        ))}
      </div>

      {/* Gentle Reminder */}
      <div className="px-6 pb-6">
        <div className={`rounded-3xl p-5 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a]' 
            : 'bg-gradient-to-br from-[#DEDBD2] to-[#B0C4B1]/30'
        }`}>
          <p className={`text-sm italic text-center leading-relaxed ${
            isDarkMode ? 'text-white/70' : 'text-[#4A5759]/70'
          }`}>
            Take your time. There's no rush. I'll hold these for as long as you need.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
