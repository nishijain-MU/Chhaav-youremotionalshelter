import { useState } from 'react';
import { X } from 'lucide-react';
import { supabaseAuth } from '../utils/supabase/client';

interface SignUpModalProps {
  onClose: () => void;
  onSuccess: (userData: { name: string; email: string; dob: string; profession: string }) => void;
  isDarkMode?: boolean;
}

export function SignUpModal({ onClose, onSuccess, isDarkMode }: SignUpModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    profession: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Create account with Supabase
      const result = await supabaseAuth.signUp(formData.email, formData.password, formData.name);
      
      if (!result.success) {
        setError(result.error || 'Failed to create account');
        setIsLoading(false);
        return;
      }

      // Update profile with additional data
      await supabaseAuth.updateProfile({
        dob: formData.dob,
        profession: formData.profession,
      });

      // Continue with account creation flow
      const { password, ...userData } = formData;
      onSuccess(userData);
    } catch (err) {
      setError('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
      <div className={`rounded-[24px] w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto ${
        isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 rounded-t-[24px] border-b px-6 py-4 flex items-center justify-between ${
          isDarkMode ? 'bg-[#2a2a2a] border-white/10' : 'bg-white border-[#DEDBD2]'
        }`}>
          <h2 className={`${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} style={{ fontSize: '22px' }}>
            Create Account
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
            <div className="p-3 rounded-[12px] bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Name */}
          <div>
            <label className={`text-sm mb-2 block ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
              required
              className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-[#EDAFB8] focus:border-transparent transition-all ${
                isDarkMode 
                  ? 'bg-[#1a1a1a] border-white/20 text-white placeholder:text-white/40' 
                  : 'bg-white border-[#DEDBD2] text-[#4A5759]'
              }`}
              style={{ fontSize: '16px' }}
            />
          </div>

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
            <label className={`text-sm mb-2 block ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Create Password</label>
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

          {/* Date of Birth */}
          <div>
            <label className={`text-sm mb-2 block ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Date of Birth</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              required
              className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-[#EDAFB8] focus:border-transparent transition-all ${
                isDarkMode 
                  ? 'bg-[#1a1a1a] border-white/20 text-white placeholder:text-white/40' 
                  : 'bg-white border-[#DEDBD2] text-[#4A5759]'
              }`}
              style={{ fontSize: '16px' }}
            />
          </div>

          {/* Profession */}
          <div>
            <label className={`text-sm mb-2 block ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Profession</label>
            <input
              type="text"
              value={formData.profession}
              onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
              placeholder="What do you do?"
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
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
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