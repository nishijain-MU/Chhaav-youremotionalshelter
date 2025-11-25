import { X, Home, Users, Map, User } from 'lucide-react';
import type { Screen } from '../App';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: Screen) => void;
  currentScreen: Screen;
  isDarkMode?: boolean;
}

export function HamburgerMenu({ isOpen, onClose, onNavigate, currentScreen, isDarkMode }: HamburgerMenuProps) {
  const menuItems = [
    { screen: 'home' as Screen, label: 'Home', icon: Home },
    { screen: 'community' as Screen, label: 'Community', icon: Users },
    { screen: 'journey' as Screen, label: 'Journey', icon: Map },
    { screen: 'account' as Screen, label: 'Account', icon: User },
  ];

  const handleNavigate = (screen: Screen) => {
    onNavigate(screen);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - only show on mobile */}
      <div 
        className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Menu - only show on mobile */}
      <div className={`lg:hidden fixed top-0 left-0 bottom-0 w-[280px] shadow-2xl z-50 transform transition-transform duration-300 ${
        isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`px-6 pt-12 pb-6 border-b safe-area-top ${
          isDarkMode ? 'border-white/10' : 'border-[#DEDBD2]'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`text-2xl ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Chhaav</h2>
              <p className={`text-xs italic ${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`}>
                your emotional shelter
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode ? 'hover:bg-white/10' : 'hover:bg-[#F7E1D7]'
              }`}
            >
              <X className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-4 overflow-y-auto max-h-[calc(100vh-140px)]">
          {menuItems.map((item) => (
            <button
              key={item.screen}
              onClick={() => handleNavigate(item.screen)}
              className={`w-full px-6 py-3.5 flex items-center gap-4 transition-all duration-300 ${
                currentScreen === item.screen
                  ? isDarkMode
                    ? 'bg-[#EDAFB8]/20 border-r-4 border-[#EDAFB8]'
                    : 'bg-[#F7E1D7] border-r-4 border-[#EDAFB8]'
                  : isDarkMode
                    ? 'hover:bg-white/10'
                    : 'hover:bg-[#F7E1D7]/50'
              }`}
            >
              <item.icon 
                className={`w-5 h-5 ${
                  currentScreen === item.screen 
                    ? 'text-[#EDAFB8]' 
                    : isDarkMode 
                      ? 'text-white/60' 
                      : 'text-[#4A5759]/60'
                }`} 
              />
              <span className={`${
                currentScreen === item.screen 
                  ? isDarkMode ? 'text-white' : 'text-[#4A5759]'
                  : isDarkMode ? 'text-white/70' : 'text-[#4A5759]/70'
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className={`absolute bottom-0 left-0 right-0 px-6 py-4 border-t safe-area-bottom ${
          isDarkMode ? 'border-white/10 bg-[#2a2a2a]' : 'border-[#DEDBD2] bg-white'
        }`}>
          <p className={`text-xs italic text-center leading-relaxed ${
            isDarkMode ? 'text-white/50' : 'text-[#4A5759]/50'
          }`}>
            Whenever you need warmth, we're here.
          </p>
        </div>
      </div>
    </>
  );
}
