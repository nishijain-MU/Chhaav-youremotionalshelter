import { X } from 'lucide-react';

interface LogoutConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
  isDarkMode?: boolean;
}

export function LogoutConfirmModal({ onClose, onConfirm, isDarkMode }: LogoutConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
      <div className={`rounded-[24px] w-full max-w-sm shadow-2xl ${
        isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`border-b px-6 py-4 flex items-center justify-between ${
          isDarkMode ? 'border-white/10' : 'border-[#DEDBD2]'
        }`}>
          <h2 className={`${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} style={{ fontSize: '20px' }}>
            Log Out
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-all duration-300 ${
              isDarkMode ? 'hover:bg-white/10' : 'hover:bg-[#F7E1D7]'
            }`}
          >
            <X className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <p className={`text-center mb-6 ${
            isDarkMode ? 'text-white/80' : 'text-[#4A5759]/80'
          }`} style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Are you sure you want to log out?
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={`flex-1 px-6 py-3 rounded-[20px] transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-transparent text-white/60 hover:bg-white/10' 
                  : 'bg-transparent text-[#4A5759]/60 hover:bg-[#F7E1D7]/30'
              }`}
              style={{ fontSize: '16px' }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-[#EDAFB8] text-white rounded-[20px] hover:bg-[#E19AA5] transition-all duration-300"
              style={{ 
                fontSize: '16px',
                boxShadow: '0px 8px 24px rgba(237, 175, 184, 0.2)'
              }}
            >
              Yes, Log Out
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
