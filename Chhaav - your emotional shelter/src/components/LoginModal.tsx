import { useState } from 'react';
import { X } from 'lucide-react';
import { supabaseAuth } from '../utils/supabase/client';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: (user: any) => void;
  onForgotPassword: () => void;
  isDarkMode?: boolean;
}

export function LoginModal({ onClose, onSuccess, onForgotPassword, isDarkMode }: LoginModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await supabaseAuth.signIn(formData.email, formData.password);

      if (result.success && result.user) {
        onSuccess(result.user);
        onClose();
      } else {
        setError(result.error || 'Sign in failed. Please check your credentials and try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to sign in. Please check your email and password.');
    } finally {
      setIsLoading(false);
    }
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
            Log In
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-[12px] bg-red-50 border border-red-200 space-y-2">
              <p className="text-sm text-red-600">{error}</p>
              <p className="text-xs text-red-500">
                💡 Tip: Make sure you're using the same email and password you signed up with. If you just created an account, try using those exact credentials.
              </p>
            </div>
          )}

          {/* Email */}
          <div>
            <label className={`text-sm mb-2 block ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

          {/* Password */}
          <div>
            <label className={`text-sm mb-2 block ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              required
              className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-[#EDAFB8] focus:border-transparent transition-all ${
                isDarkMode 
                  ? 'bg-[#1a1a1a] border-white/20 text-white placeholder:text-white/40' 
                  : 'bg-white border-[#DEDBD2] text-[#4A5759]'
              }`}
              style={{ fontSize: '16px' }}
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => {
                onClose();
                onForgotPassword();
              }}
              className={`transition-colors text-sm ${
                isDarkMode ? 'text-white/60 hover:text-white' : 'text-[#4A5759]/60 hover:text-[#4A5759]'
              }`}
            >
              Forgot password?
            </button>
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
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
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