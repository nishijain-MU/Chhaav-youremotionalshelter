import { Menu, Home, Users, Map, Archive, Image as ImageIcon, BookHeart, Compass, FileText } from 'lucide-react';
import type { Screen } from '../App';

interface TopNavigationProps {
  onNavigate: (screen: Screen) => void;
  currentScreen: Screen;
  onMenuOpen: () => void;
  isDarkMode?: boolean;
}

export function TopNavigation({ onNavigate, currentScreen, onMenuOpen, isDarkMode }: TopNavigationProps) {
  const menuItems = [
    { screen: 'home' as Screen, label: 'Home', icon: Home },
    { screen: 'community' as Screen, label: 'Community', icon: Users },
    { screen: 'journey' as Screen, label: 'Journey', icon: Map },
    { screen: 'backlog' as Screen, label: 'Revisit a Feeling', icon: Archive },
    { screen: 'scrapbook' as Screen, label: 'Scrapbook', icon: ImageIcon },
    { screen: 'comfort-corner' as Screen, label: 'Comfort Corner', icon: BookHeart },
    { screen: 'weekly-story' as Screen, label: 'Weekly Story', icon: Compass },
    { screen: 'observations' as Screen, label: 'Observations', icon: FileText },
  ];

  return (
    <nav className={`w-full sticky top-0 z-30 ${
      isDarkMode 
        ? 'bg-[#2a2a2a] border-b border-white/10' 
        : 'bg-white border-b border-[#DEDBD2]'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-start group"
          >
            <h1 className={`text-2xl md:text-3xl transition-colors duration-300 ${
              isDarkMode 
                ? 'text-white group-hover:text-[#EDAFB8]' 
                : 'text-[#4A5759] group-hover:text-[#EDAFB8]'
            }`}>
              Chhaav
            </h1>
            <p className={`text-xs italic hidden sm:block ${
              isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'
            }`}>
              your emotional shelter
            </p>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {menuItems.map((item) => (
              <button
                key={item.screen}
                onClick={() => onNavigate(item.screen)}
                className={`px-3 xl:px-4 py-2 rounded-full flex items-center gap-1.5 xl:gap-2 transition-all duration-300 ${
                  currentScreen === item.screen
                    ? isDarkMode
                      ? 'bg-[#EDAFB8]/20 text-white'
                      : 'bg-[#F7E1D7] text-[#4A5759]'
                    : isDarkMode
                      ? 'text-white/70 hover:bg-[#EDAFB8]/10 hover:text-white'
                      : 'text-[#4A5759]/70 hover:bg-[#F7E1D7]/50 hover:text-[#4A5759]'
                }`}
              >
                <item.icon 
                  className={`w-4 h-4 flex-shrink-0 ${
                    currentScreen === item.screen 
                      ? 'text-[#EDAFB8]' 
                      : isDarkMode 
                        ? 'text-white/60' 
                        : 'text-[#4A5759]/60'
                  }`} 
                />
                <span className="text-xs xl:text-sm whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={onMenuOpen}
            className={`lg:hidden p-2 rounded-full transition-all duration-300 ${
              isDarkMode 
                ? 'hover:bg-white/10' 
                : 'hover:bg-[#F7E1D7]'
            }`}
            aria-label="Open menu"
          >
            <Menu className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} />
          </button>
        </div>
      </div>

      {/* Mobile subtitle when scrolled */}
      <div className="sm:hidden px-4 pb-2">
        <p className={`text-xs italic ${
          isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'
        }`}>
          your emotional shelter
        </p>
      </div>
    </nav>
  );
}
