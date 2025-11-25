import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { supabaseAuth } from '../utils/supabase/client';

interface ForgotPasswordModalProps {
  onClose: () => void;
  isDarkMode?: boolean;
}

export function ForgotPasswordModal({ onClose, isDarkMode }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await supabaseAuth.resetPassword(email);
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
      <div className={`rounded-[24px] w-full max-w-md shadow-2xl ${
        isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`border-b px-6 py-4 flex items-center justify-between rounded-t-[24px] ${
          isDarkMode ? 'border-white/10' : 'border-[#DEDBD2]'
        }`}>
          <h2 className={`${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} style={{ fontSize: '22px' }}>
            Forgot Password
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
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-white/70' : 'text-[#4A5759]/70'}`}>
              Enter your email address and we'll send you a link to reset your password.
            </p>

            {/* Email */}
            <div>
              <label className={`text-sm mb-2 block ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-[#EDAFB8] focus:border-transparent transition-all ${
                  isDarkMode 
                    ? 'bg-[#1a1a1a] border-white/20 text-white placeholder:text-white/40' 
                    : 'bg-white border-[#DEDBD2] text-[#4A5759]'
                }`}
                style={{ fontSize: '16px' }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-4 bg-[#EDAFB8] text-white rounded-[20px] hover:bg-[#E19AA5] transition-all duration-300 mt-6"
              style={{ 
                fontSize: '17px',
                boxShadow: '0px 8px 24px rgba(237, 175, 184, 0.2)'
              }}
            >
              {isLoading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>
        ) : (
          <div className="px-6 py-8 text-center space-y-4">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
              isDarkMode ? 'bg-[#B0C4B1]/20' : 'bg-[#B0C4B1]/20'
            }`}>
              <CheckCircle className="w-8 h-8 text-[#B0C4B1]" />
            </div>
            <h3 className={`${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} style={{ fontSize: '20px' }}>
              Check your inbox
            </h3>
            <p className={`text-sm leading-relaxed max-w-sm mx-auto ${
              isDarkMode ? 'text-white/70' : 'text-[#4A5759]/70'
            }`}>
              If this email exists, we'll send a link to help you return.
            </p>
            <button
              onClick={onClose}
              className={`mt-6 px-6 py-3 rounded-[20px] transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-[#EDAFB8]/20 text-[#EDAFB8] hover:bg-[#EDAFB8]/30' 
                  : 'bg-[#F7E1D7] text-[#4A5759] hover:bg-[#DEDBD2]'
              }`}
              style={{ fontSize: '16px' }}
            >
              Close
            </button>
          </div>
        )}
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