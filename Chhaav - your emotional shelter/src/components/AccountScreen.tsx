import { User, Globe, Bell, LogOut, Moon, Sun } from 'lucide-react';

interface AccountScreenProps {
  onEditAccount: () => void;
  onLogout: () => void;
  userData: {
    name: string;
    email: string;
    dob: string;
    profession: string;
  };
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function AccountScreen({ onEditAccount, onLogout, userData, isDarkMode, onToggleDarkMode }: AccountScreenProps) {
  return (
    <div className={`relative w-full min-h-screen overflow-y-auto pb-24 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]' 
        : 'bg-gradient-to-br from-[#F7E1D7]/30 to-[#DEDBD2]/30'
    }`}>
      <div className="max-w-2xl mx-auto px-6 py-8 lg:px-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-center ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} style={{ fontSize: '24px' }}>
            My Account
          </h1>
        </div>

        {/* User Details Card */}
        <div className={`rounded-[24px] p-6 mb-6 shadow-sm ${
          isDarkMode 
            ? 'bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a]' 
            : 'bg-gradient-to-br from-[#F7E1D7] to-[#DEDBD2]'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-[#EDAFB8]/20' : 'bg-[#EDAFB8]/30'
            }`}>
              <User className={`w-6 h-6 ${isDarkMode ? 'text-[#EDAFB8]' : 'text-[#4A5759]'}`} />
            </div>
            <div>
              <p className={`${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} style={{ fontSize: '20px' }}>
                {userData.name}
              </p>
              <p className={`${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`} style={{ fontSize: '14px' }}>
                {userData.email}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            {/* Name */}
            <div className={`pb-4 border-b ${isDarkMode ? 'border-white/20' : 'border-[#4A5759]/20'}`}>
              <p className={`mb-1 ${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`} style={{ fontSize: '14px' }}>
                Name
              </p>
              <p className={`${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} style={{ fontSize: '18px' }}>
                {userData.name}
              </p>
            </div>

            {/* Email */}
            <div className={`pb-4 border-b ${isDarkMode ? 'border-white/20' : 'border-[#4A5759]/20'}`}>
              <p className={`mb-1 ${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`} style={{ fontSize: '14px' }}>
                Email
              </p>
              <p className={`${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} style={{ fontSize: '18px' }}>
                {userData.email}
              </p>
            </div>

            {/* Date of Birth */}
            <div className={`pb-4 border-b ${isDarkMode ? 'border-white/20' : 'border-[#4A5759]/20'}`}>
              <p className={`mb-1 ${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`} style={{ fontSize: '14px' }}>
                Date of Birth
              </p>
              <p className={`${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} style={{ fontSize: '18px' }}>
                {new Date(userData.dob).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            {/* Profession */}
            <div>
              <p className={`mb-1 ${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`} style={{ fontSize: '14px' }}>
                Profession
              </p>
              <p className={`${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} style={{ fontSize: '18px' }}>
                {userData.profession}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={onEditAccount}
            className={`w-full mt-6 px-6 py-3 rounded-[20px] transition-all duration-300 ${
              isDarkMode 
                ? 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20' 
                : 'bg-white/60 backdrop-blur-sm text-[#4A5759] border border-[#4A5759]/20 hover:bg-white/80'
            }`}
            style={{ fontSize: '16px' }}
          >
            Edit Details
          </button>
        </div>

        {/* App Settings Section */}
        <div className={`rounded-[24px] p-6 mb-6 shadow-sm ${
          isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white'
        }`}>
          <h2 className={`mb-4 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} style={{ fontSize: '20px' }}>
            App Settings
          </h2>

          <div className="space-y-4">
            {/* Dark Mode Toggle */}
            <button 
              onClick={onToggleDarkMode}
              className={`w-full flex items-center gap-4 p-4 rounded-[16px] transition-all duration-300 text-left ${
                isDarkMode ? 'hover:bg-white/10' : 'hover:bg-[#F7E1D7]/30'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isDarkMode ? 'bg-[#EDAFB8]/20' : 'bg-[#B0C4B1]/20'
              }`}>
                {isDarkMode ? (
                  <Sun className={`w-5 h-5 ${isDarkMode ? 'text-[#EDAFB8]' : 'text-[#4A5759]'}`} />
                ) : (
                  <Moon className={`w-5 h-5 ${isDarkMode ? 'text-[#EDAFB8]' : 'text-[#4A5759]'}`} />
                )}
              </div>
              <div className="flex-1">
                <p className={`${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} style={{ fontSize: '16px' }}>
                  Dark Mode
                </p>
                <p className={`${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`} style={{ fontSize: '14px' }}>
                  {isDarkMode ? 'On' : 'Off'}
                </p>
              </div>
            </button>

            {/* Change Language */}
            <button className={`w-full flex items-center gap-4 p-4 rounded-[16px] transition-all duration-300 text-left ${
              isDarkMode ? 'hover:bg-white/10' : 'hover:bg-[#F7E1D7]/30'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isDarkMode ? 'bg-[#B0C4B1]/20' : 'bg-[#B0C4B1]/20'
              }`}>
                <Globe className={`w-5 h-5 ${isDarkMode ? 'text-[#B0C4B1]' : 'text-[#4A5759]'}`} />
              </div>
              <div className="flex-1">
                <p className={`${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} style={{ fontSize: '16px' }}>
                  Change Language
                </p>
                <p className={`${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`} style={{ fontSize: '14px' }}>
                  English (US)
                </p>
              </div>
            </button>

            {/* Notification Settings */}
            <button className={`w-full flex items-center gap-4 p-4 rounded-[16px] transition-all duration-300 text-left ${
              isDarkMode ? 'hover:bg-white/10' : 'hover:bg-[#F7E1D7]/30'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isDarkMode ? 'bg-[#B0C4B1]/20' : 'bg-[#B0C4B1]/20'
              }`}>
                <Bell className={`w-5 h-5 ${isDarkMode ? 'text-[#B0C4B1]' : 'text-[#4A5759]'}`} />
              </div>
              <div className="flex-1">
                <p className={`${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} style={{ fontSize: '16px' }}>
                  Notification Settings
                </p>
                <p className={`${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`} style={{ fontSize: '14px' }}>
                  Manage your notifications
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Log Out Section */}
        <div className={`rounded-[24px] p-6 shadow-sm ${
          isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white'
        }`}>
          <button
            onClick={onLogout}
            className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-[20px] transition-all duration-300 ${
              isDarkMode 
                ? 'border-2 border-[#EDAFB8] text-[#EDAFB8] hover:bg-[#EDAFB8]/10' 
                : 'border-2 border-[#4A5759] text-[#4A5759] hover:bg-[#4A5759]/5'
            }`}
            style={{ fontSize: '16px' }}
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`} style={{ fontSize: '14px' }}>
            Whenever you need shade, I'm here.
          </p>
        </div>
      </div>
    </div>
  );
}