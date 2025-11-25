import { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { CommunityScreen } from './components/CommunityScreen';
import { JourneyScreen } from './components/JourneyScreen';
import { ChatScreen } from './components/ChatScreen';
import { CommunityRoomScreen } from './components/CommunityRoomScreen';
import { BacklogScreen } from './components/BacklogScreen';
import { ScrapbookScreen } from './components/ScrapbookScreen';
import { WeeklyStoryScreen } from './components/WeeklyStoryScreen';
import { ComfortCornerScreen } from './components/ComfortCornerScreen';
import { ComfortLetterScreen } from './components/ComfortLetterScreen';
import { ComfortPoemScreen } from './components/ComfortPoemScreen';
import { ComfortStoryScreen } from './components/ComfortStoryScreen';
import { ComfortVideoScreen } from './components/ComfortVideoScreen';
import { BuddySettingsModal } from './components/BuddySettingsModal';
import { ObservationsScreen } from './components/ObservationsScreen';
import { HamburgerMenu } from './components/HamburgerMenu';
import { TopNavigation } from './components/TopNavigation';
import { LandingPage } from './components/LandingPage';
import { AboutScreen } from './components/AboutScreen';
import { SignUpModal } from './components/SignUpModal';
import { LoginModal } from './components/LoginModal';
import { ForgotPasswordModal } from './components/ForgotPasswordModal';
import { DemoScreen } from './components/DemoScreen';
import { BuddySetupScreen } from './components/BuddySetupScreen';
import { AccountScreen } from './components/AccountScreen';
import { EditAccountModal } from './components/EditAccountModal';
import { LogoutConfirmModal } from './components/LogoutConfirmModal';
import { supabaseAuth } from './utils/supabase/client';

export type Screen = 
  | 'landing'
  | 'about'
  | 'demo'
  | 'buddy-setup'
  | 'home' 
  | 'community' 
  | 'journey' 
  | 'chat' 
  | 'community-room'
  | 'backlog'
  | 'scrapbook'
  | 'weekly-story'
  | 'comfort-corner'
  | 'comfort-letter'
  | 'comfort-poem'
  | 'comfort-story'
  | 'comfort-video'
  | 'observations'
  | 'account';

export type ToneOfVoice = 'warm' | 'sibling' | 'mentor' | 'playful' | 'professional';

type ModalType = 'signup' | 'login' | 'forgot-password' | 'edit-account' | 'logout-confirm' | null;

export interface UserData {
  name: string;
  email: string;
  dob: string;
  profession: string;
}

export interface AppState {
  currentScreen: Screen;
  currentRoom?: string;
  buddyName: string;
  buddyTone: ToneOfVoice;
  buddyAvatar: string;
  showBuddySettings: boolean;
  showMenu: boolean;
  backlogItem?: string;
  isAuthenticated: boolean;
  activeModal: ModalType;
  userData: UserData;
  isDarkMode: boolean;
}

export default function App() {
  const [state, setState] = useState<AppState>({
    currentScreen: 'landing',
    buddyName: 'Muskurahat',
    buddyTone: 'warm',
    buddyAvatar: 'playful',
    showBuddySettings: false,
    showMenu: false,
    isAuthenticated: false,
    activeModal: null,
    userData: {
      name: '',
      email: '',
      dob: '',
      profession: '',
    },
    isDarkMode: false,
  });

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setState(prev => ({ ...prev, isDarkMode: true }));
    }

    // Check for existing session
    checkSession();
  }, []);

  const checkSession = async () => {
    const result = await supabaseAuth.getSession();
    if (result.success && result.user && result.profile) {
      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        userData: {
          name: result.profile.name || '',
          email: result.user.email || '',
          dob: result.profile.dob || '',
          profession: result.profile.profession || '',
        },
        buddyName: result.profile.buddyName || 'Muskurahat',
        buddyTone: result.profile.buddyTone || 'warm',
        buddyAvatar: result.profile.buddyAvatar || 'playful',
        isDarkMode: result.profile.isDarkMode || false,
        currentScreen: 'home',
      }));

      // Sync theme to localStorage
      if (result.profile.isDarkMode) {
        localStorage.setItem('theme', 'dark');
      }
    }
  };

  const navigate = (screen: Screen, options?: { room?: string; backlogItem?: string }) => {
    setState(prev => ({
      ...prev,
      currentScreen: screen,
      currentRoom: options?.room,
      backlogItem: options?.backlogItem,
    }));
  };

  const openBuddySettings = () => {
    setState(prev => ({ ...prev, showBuddySettings: true }));
  };

  const closeBuddySettings = () => {
    setState(prev => ({ ...prev, showBuddySettings: false }));
  };

  const openMenu = () => {
    setState(prev => ({ ...prev, showMenu: true }));
  };

  const closeMenu = () => {
    setState(prev => ({ ...prev, showMenu: false }));
  };

  const openModal = (modal: ModalType) => {
    setState(prev => ({ ...prev, activeModal: modal }));
  };

  const closeModal = () => {
    setState(prev => ({ ...prev, activeModal: null }));
  };

  const updateBuddySettings = (settings: { name?: string; tone?: ToneOfVoice; avatar?: string }) => {
    setState(prev => ({
      ...prev,
      buddyName: settings.name || prev.buddyName,
      buddyTone: settings.tone || prev.buddyTone,
      buddyAvatar: settings.avatar || prev.buddyAvatar,
    }));
  };

  const handleSignUpSuccess = (userData: UserData) => {
    closeModal();
    setState(prev => ({ ...prev, userData }));
    navigate('buddy-setup');
  };

  const handleLoginSuccess = () => {
    closeModal();
    setState(prev => ({ ...prev, isAuthenticated: true }));
    navigate('home');
  };

  const handleBuddySetupComplete = (settings: { name: string; tone: string; avatar: string }) => {
    setState(prev => ({
      ...prev,
      buddyName: settings.name,
      buddyTone: settings.tone as ToneOfVoice,
      buddyAvatar: settings.avatar,
      isAuthenticated: true,
    }));
    navigate('home');
  };

  const toggleDarkMode = () => {
    setState(prev => {
      const newDarkMode = !prev.isDarkMode;
      localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
      return { ...prev, isDarkMode: newDarkMode };
    });
  };

  // Determine if we should show navigation
  const showNavigation = state.isAuthenticated && 
    !['landing', 'about', 'demo', 'buddy-setup', 'weekly-story', 'comfort-video'].includes(state.currentScreen);

  return (
    <div className={`relative w-full min-h-screen ${state.isDarkMode ? 'dark bg-[#1a1a1a]' : 'bg-[#FAFAF9]'}`}>
      {/* Top Navigation - only show when authenticated and on appropriate screens */}
      {showNavigation && (
        <TopNavigation 
          onNavigate={navigate} 
          currentScreen={state.currentScreen}
          onMenuOpen={openMenu}
          isDarkMode={state.isDarkMode}
        />
      )}

      {/* Main Content Area */}
      <main className="w-full">
        <div className={`w-full h-full ${state.isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white lg:bg-transparent'}`}>
          {state.currentScreen === 'landing' && (
            <LandingPage 
              onNavigate={(screen) => navigate(screen as Screen)}
              onOpenModal={(modal) => openModal(modal)}
              isDarkMode={state.isDarkMode}
            />
          )}
          {state.currentScreen === 'about' && (
            <AboutScreen 
              onNavigate={(screen) => navigate(screen as Screen)}
              isDarkMode={state.isDarkMode}
            />
          )}
          {state.currentScreen === 'demo' && (
            <DemoScreen 
              onNavigate={(screen) => navigate(screen as Screen)}
              onOpenModal={(modal) => openModal(modal)}
              isDarkMode={state.isDarkMode}
            />
          )}
          {state.currentScreen === 'buddy-setup' && (
            <BuddySetupScreen onComplete={handleBuddySetupComplete} isDarkMode={state.isDarkMode} />
          )}
          {state.currentScreen === 'home' && (
            <HomeScreen 
              navigate={navigate} 
              openBuddySettings={openBuddySettings}
              buddyName={state.buddyName}
              buddyAvatar={state.buddyAvatar}
              isDarkMode={state.isDarkMode}
            />
          )}
          {state.currentScreen === 'community' && (
            <CommunityScreen navigate={navigate} isDarkMode={state.isDarkMode} />
          )}
          {state.currentScreen === 'journey' && (
            <JourneyScreen navigate={navigate} isDarkMode={state.isDarkMode} />
          )}
          {state.currentScreen === 'chat' && (
            <ChatScreen 
              navigate={navigate} 
              buddyName={state.buddyName}
              buddyTone={state.buddyTone}
              backlogItem={state.backlogItem}
              isDarkMode={state.isDarkMode}
            />
          )}
          {state.currentScreen === 'community-room' && (
            <CommunityRoomScreen 
              navigate={navigate} 
              roomName={state.currentRoom || 'For minds that run fast'}
              isDarkMode={state.isDarkMode}
            />
          )}
          {state.currentScreen === 'backlog' && (
            <BacklogScreen navigate={navigate} isDarkMode={state.isDarkMode} />
          )}
          {state.currentScreen === 'scrapbook' && (
            <ScrapbookScreen navigate={navigate} isDarkMode={state.isDarkMode} />
          )}
          {state.currentScreen === 'weekly-story' && (
            <WeeklyStoryScreen navigate={navigate} isDarkMode={state.isDarkMode} />
          )}
          {state.currentScreen === 'comfort-corner' && (
            <ComfortCornerScreen navigate={navigate} isDarkMode={state.isDarkMode} />
          )}
          {state.currentScreen === 'comfort-letter' && (
            <ComfortLetterScreen navigate={navigate} isDarkMode={state.isDarkMode} />
          )}
          {state.currentScreen === 'comfort-poem' && (
            <ComfortPoemScreen navigate={navigate} isDarkMode={state.isDarkMode} />
          )}
          {state.currentScreen === 'comfort-story' && (
            <ComfortStoryScreen navigate={navigate} isDarkMode={state.isDarkMode} />
          )}
          {state.currentScreen === 'comfort-video' && (
            <ComfortVideoScreen navigate={navigate} isDarkMode={state.isDarkMode} />
          )}
          {state.currentScreen === 'observations' && (
            <ObservationsScreen navigate={navigate} isDarkMode={state.isDarkMode} />
          )}
          {state.currentScreen === 'account' && (
            <AccountScreen 
              userData={state.userData}
              onEditAccount={() => openModal('edit-account')}
              onLogout={() => openModal('logout-confirm')}
              isDarkMode={state.isDarkMode}
              onToggleDarkMode={toggleDarkMode}
            />
          )}
        </div>

        {/* Mobile Hamburger Menu - only when authenticated */}
        {state.isAuthenticated && (
          <HamburgerMenu
            isOpen={state.showMenu}
            onClose={closeMenu}
            onNavigate={navigate}
            currentScreen={state.currentScreen}
            isDarkMode={state.isDarkMode}
          />
        )}

        {/* Buddy Settings Modal */}
        {state.showBuddySettings && (
          <BuddySettingsModal
            buddyName={state.buddyName}
            buddyTone={state.buddyTone}
            buddyAvatar={state.buddyAvatar}
            onClose={closeBuddySettings}
            onSave={updateBuddySettings}
            isDarkMode={state.isDarkMode}
          />
        )}

        {/* Auth Modals */}
        {state.activeModal === 'signup' && (
          <SignUpModal 
            onClose={closeModal}
            onSuccess={handleSignUpSuccess}
            isDarkMode={state.isDarkMode}
          />
        )}
        {state.activeModal === 'login' && (
          <LoginModal 
            onClose={closeModal}
            onSuccess={handleLoginSuccess}
            onForgotPassword={() => openModal('forgot-password')}
            isDarkMode={state.isDarkMode}
          />
        )}
        {state.activeModal === 'forgot-password' && (
          <ForgotPasswordModal onClose={closeModal} isDarkMode={state.isDarkMode} />
        )}
        {state.activeModal === 'edit-account' && (
          <EditAccountModal 
            userData={state.userData}
            onClose={closeModal}
            onSave={(updatedData) => {
              setState(prev => ({ 
                ...prev, 
                userData: { ...prev.userData, ...updatedData },
                activeModal: null 
              }));
            }}
            isDarkMode={state.isDarkMode}
          />
        )}
        {state.activeModal === 'logout-confirm' && (
          <LogoutConfirmModal 
            onClose={closeModal}
            onConfirm={async () => {
              closeModal();
              await supabaseAuth.signOut();
              setState(prev => ({ 
                ...prev, 
                isAuthenticated: false,
                userData: {
                  name: '',
                  email: '',
                  dob: '',
                  profession: '',
                }
              }));
              navigate('landing');
            }}
            isDarkMode={state.isDarkMode}
          />
        )}
      </main>
    </div>
  );
}