import { Home, Users, Map } from 'lucide-react';
import type { Screen } from '../App';

interface BottomNavigationProps {
  onNavigate: (screen: Screen) => void;
  currentScreen: Screen;
}

export function BottomNavigation({ onNavigate, currentScreen }: BottomNavigationProps) {
  const navItems = [
    { screen: 'home' as Screen, label: 'Home', icon: Home },
    { screen: 'community' as Screen, label: 'Community', icon: Users },
    { screen: 'journey' as Screen, label: 'Journey', icon: Map },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#DEDBD2] z-40 lg:hidden">
      <div className="flex items-center justify-around px-4 py-3 safe-area-bottom">
        {navItems.map((item) => {
          const isActive = currentScreen === item.screen;
          const Icon = item.icon;
          
          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-[16px] transition-all duration-300 ${
                isActive
                  ? 'bg-[#F7E1D7]'
                  : 'hover:bg-[#F7E1D7]/30'
              }`}
            >
              <Icon 
                className={`w-5 h-5 ${
                  isActive 
                    ? 'text-[#EDAFB8]' 
                    : 'text-[#4A5759]/60'
                }`}
              />
              <span 
                className={`text-xs ${
                  isActive 
                    ? 'text-[#4A5759]' 
                    : 'text-[#4A5759]/60'
                }`}
                style={{ fontSize: '11px' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}