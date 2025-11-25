import { Brain, Briefcase, Coffee, Heart, ChevronRight } from 'lucide-react';
import type { Screen } from '../App';

interface CommunityScreenProps {
  navigate: (screen: Screen, options?: { room?: string }) => void;
  isDarkMode?: boolean;
}

export function CommunityScreen({ navigate, isDarkMode }: CommunityScreenProps) {
  const rooms = [
    {
      id: 'overthinkers',
      name: 'For minds that run fast',
      icon: Brain,
      color: 'from-[#EDAFB8]/30 to-[#F7E1D7]',
      iconColor: 'text-[#4A5759]',
    },
    {
      id: 'young-professionals',
      name: 'Share work stress without judgment',
      icon: Briefcase,
      color: 'from-[#B0C4B1]/30 to-[#F7E1D7]',
      iconColor: 'text-[#4A5759]',
    },
    {
      id: 'first-jobbers',
      name: "You're not alone in figuring life out",
      icon: Coffee,
      color: 'from-[#DEDBD2] to-[#F7E1D7]',
      iconColor: 'text-[#4A5759]',
    },
    {
      id: 'emotionally-tired',
      name: 'A space to feel understood',
      icon: Heart,
      color: 'from-[#EDAFB8]/30 to-[#DEDBD2]',
      iconColor: 'text-[#4A5759]',
    },
  ];

  return (
    <div className={`relative w-full min-h-screen overflow-y-auto pb-6 ${
      isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white lg:bg-[#FAFAF9]'
    }`}>
      <div className="max-w-5xl mx-auto lg:px-8">
        {/* Header */}
        <div className="px-6 lg:px-0 pt-12 pb-6">
          <div className="mb-2">
            <h1 className={`text-3xl lg:text-5xl ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Community</h1>
            <p className={`text-sm lg:text-base leading-relaxed mt-1 ${
              isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'
            }`}>
              Find your circle of people who feel like you.
            </p>
          </div>
        </div>

        {/* Community Rooms */}
        <div className="px-6 lg:px-0 mb-6">
          <div className="grid lg:grid-cols-2 gap-4">
            {rooms.map(room => (
              <button
                key={room.id}
                onClick={() => navigate('community-room', { room: room.name })}
                className={`w-full bg-gradient-to-br ${room.color} rounded-3xl p-5 lg:p-6 shadow-md hover:shadow-lg transition-all duration-300 text-left`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    isDarkMode ? 'bg-[#EDAFB8]/20' : 'bg-white/60'
                  }`}>
                    <room.icon className={`w-6 h-6 lg:w-7 lg:h-7 ${isDarkMode ? 'text-white' : room.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`leading-relaxed lg:text-lg ${isDarkMode ? 'text-white' : room.iconColor}`}>{room.name}</h3>
                  </div>
                  <ChevronRight className={`w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0 ${isDarkMode ? 'text-white' : room.iconColor}`} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Guidelines */}
        <div className="px-6 lg:px-0 mb-6">
          <div className={`rounded-3xl p-5 lg:p-8 shadow-sm max-w-2xl mx-auto ${
            isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white lg:bg-[#F7E1D7]'
          }`}>
            <h3 className={`mb-2 text-sm lg:text-lg ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Community Guidelines</h3>
            <p className={`text-sm lg:text-base leading-relaxed italic ${
              isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'
            }`}>
              No advice. No judgment. Only warmth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}