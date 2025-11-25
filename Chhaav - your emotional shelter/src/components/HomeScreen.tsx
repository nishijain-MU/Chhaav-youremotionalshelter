import { MessageCircle, Edit2, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Screen } from '../App';
import warmUnderstandingAvatar from 'figma:asset/0494879eaa63b0e7f9e6f56184157d20308f08d4.png';
import wiseMentorAvatar from 'figma:asset/5faf2ca37bdb972e5ebd268dd480ba3a360bb4e1.png';
import youngProfessionalAvatar from 'figma:asset/756ee1c78616ebc197d56d450931ecd4be9d1537.png';
import friendlyApproachableAvatar from 'figma:asset/f2691d69c397f9ff00eae5d57f1d8269feaf8630.png';
import playfulEnergeticAvatar from 'figma:asset/d1fbecd2f109d13f2afc577f6651211c639890f3.png';
import warmGentleAvatar from 'figma:asset/81355990372c411bcc40c0a824ab93083fa80959.png';

interface HomeScreenProps {
  navigate: (screen: Screen) => void;
  openBuddySettings: () => void;
  buddyName: string;
  buddyAvatar: string;
  isDarkMode?: boolean;
}

const avatarImages: Record<string, string> = {
  default: warmUnderstandingAvatar,
  friendly: wiseMentorAvatar,
  professional: youngProfessionalAvatar,
  mentor: friendlyApproachableAvatar,
  playful: playfulEnergeticAvatar,
  warm: warmGentleAvatar,
};

export function HomeScreen({ navigate, openBuddySettings, buddyName, buddyAvatar, isDarkMode }: HomeScreenProps) {
  const avatarImage = avatarImages[buddyAvatar] || avatarImages.default;

  return (
    <div className={`relative w-full min-h-screen overflow-y-auto pb-6 ${
      isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white lg:bg-[#FAFAF9]'
    }`}>
      <div className="max-w-6xl mx-auto lg:px-8">
        {/* Desktop Two Column Layout */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6 pt-8 lg:pt-12">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Buddy Card */}
            <div className="px-6 lg:px-0">
              <div className={`rounded-3xl p-6 lg:p-8 shadow-lg relative ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a]' 
                  : 'bg-gradient-to-br from-[#F7E1D7] to-[#EDAFB8]/30'
              }`}>
                <button 
                  onClick={openBuddySettings}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-white/10 hover:bg-white/20' 
                      : 'bg-white/70 hover:bg-white'
                  }`}
                >
                  <Edit2 className={`w-4 h-4 ${isDarkMode ? 'text-[#EDAFB8]' : 'text-[#4A5759]'}`} />
                </button>

                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden shadow-md border-2 ${
                    isDarkMode ? 'border-white/20' : 'border-white/50'
                  }`}>
                    <ImageWithFallback
                      src={avatarImage}
                      alt={buddyName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className={`mb-1 lg:text-xl ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>{buddyName}</h3>
                    <p className={`text-sm lg:text-base leading-relaxed ${
                      isDarkMode ? 'text-white/70' : 'text-[#4A5759]/70'
                    }`}>
                      For any feeling and any moment, I'm here with you.
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('chat')}
                  className="w-full bg-[#EDAFB8] text-white py-3 lg:py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#E19AA5] transition-all duration-300 shadow-md"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="lg:text-lg">Talk to {buddyName}</span>
                </button>
              </div>
            </div>

            {/* Soft Daily Observations */}
            <div className="px-6 lg:px-0">
              <div className={`rounded-3xl p-5 lg:p-6 shadow-sm ${
                isDarkMode 
                  ? 'bg-[#2a2a2a]' 
                  : 'bg-white lg:bg-[#DEDBD2]'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-sm lg:text-base ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>
                    Today's gentle observations
                  </h3>
                  <button 
                    onClick={() => navigate('observations')}
                    className={`text-xs transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-white/50 hover:text-white' 
                        : 'text-[#4A5759]/50 hover:text-[#4A5759]'
                    }`}
                  >
                    View all
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#EDAFB8] mt-2 flex-shrink-0" />
                    <p className={`text-sm lg:text-base leading-relaxed ${
                      isDarkMode ? 'text-white/70' : 'text-[#4A5759]/70'
                    }`}>
                      You sounded a little tired yesterday.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B0C4B1] mt-2 flex-shrink-0" />
                    <p className={`text-sm lg:text-base leading-relaxed ${
                      isDarkMode ? 'text-white/70' : 'text-[#4A5759]/70'
                    }`}>
                      Today felt softer than your last few days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 mt-6 lg:mt-0">
            {/* Weekly Emotional Story - with embedded video preview */}
            <div className="px-6 lg:px-0">
              <div className={`rounded-3xl p-5 lg:p-6 shadow-lg ${
                isDarkMode 
                  ? 'bg-[#2a2a2a]' 
                  : 'bg-white lg:bg-[#F7E1D7]'
              }`}>
                <h3 className={`mb-3 lg:text-lg ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>
                  Your week in a gentle story
                </h3>
                
                {/* Video Preview Area */}
                <button
                  onClick={() => navigate('weekly-story')}
                  className="w-full aspect-[9/16] max-h-[280px] lg:max-h-[400px] bg-gradient-to-br from-[#EDAFB8]/30 to-[#B0C4B1]/30 rounded-2xl mb-3 flex items-center justify-center relative overflow-hidden group"
                >
                  {/* Emoji Cover Design */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-[120px] lg:text-[160px] opacity-40">🌸</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-7 h-7 lg:w-9 lg:h-9 text-[#EDAFB8] ml-1" fill="currentColor" />
                    </div>
                    <span className="text-[#4A5759] text-sm lg:text-base drop-shadow-sm">Tap to watch</span>
                  </div>
                </button>
                
                <p className={`text-sm lg:text-base text-center ${
                  isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'
                }`}>
                  A warm reflection of your journey
                </p>
              </div>
            </div>

            {/* Quick Paths */}
            <div className="px-6 lg:px-0">
              <div className={`rounded-3xl p-5 lg:p-6 shadow-sm ${
                isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white'
              }`}>
                <h3 className={`mb-3 text-sm lg:text-base ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>
                  Quick paths
                </h3>
                <div className="flex gap-2 flex-wrap">
                  <button 
                    onClick={() => navigate('chat')}
                    className={`px-5 py-2.5 rounded-full text-sm lg:text-base transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-[#EDAFB8]/20 text-[#EDAFB8] hover:bg-[#EDAFB8]/30' 
                        : 'bg-[#F7E1D7] text-[#4A5759] hover:bg-[#EDAFB8]/30'
                    }`}
                  >
                    Talk to {buddyName}
                  </button>
                  <button 
                    onClick={() => navigate('backlog')}
                    className={`px-5 py-2.5 rounded-full text-sm lg:text-base transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-[#EDAFB8]/20 text-[#EDAFB8] hover:bg-[#EDAFB8]/30' 
                        : 'bg-[#F7E1D7] text-[#4A5759] hover:bg-[#EDAFB8]/30'
                    }`}
                  >
                    Revisit a Feeling
                  </button>
                  <button 
                    onClick={() => navigate('comfort-corner')}
                    className={`px-5 py-2.5 rounded-full text-sm lg:text-base transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-[#EDAFB8]/20 text-[#EDAFB8] hover:bg-[#EDAFB8]/30' 
                        : 'bg-[#F7E1D7] text-[#4A5759] hover:bg-[#EDAFB8]/30'
                    }`}
                  >
                    Comfort Corner
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
