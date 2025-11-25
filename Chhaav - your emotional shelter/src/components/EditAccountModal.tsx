import { useState } from 'react';
import { X } from 'lucide-react';

interface EditAccountModalProps {
  onClose: () => void;
  onSave: (data: { name: string; dob: string; profession: string }) => void;
  userData: {
    name: string;
    email: string;
    dob: string;
    profession: string;
  };
  isDarkMode?: boolean;
}

export function EditAccountModal({ onClose, onSave, userData, isDarkMode }: EditAccountModalProps) {
  const [formData, setFormData] = useState({
    name: userData.name,
    dob: userData.dob,
    profession: userData.profession,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
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
            Edit Details
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

          {/* Email (Locked) */}
          <div>
            <label className={`text-sm mb-2 block ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Email</label>
            <input
              type="email"
              value={userData.email}
              disabled
              className={`w-full px-4 py-3 border rounded-[16px] cursor-not-allowed ${
                isDarkMode 
                  ? 'bg-[#1a1a1a]/50 border-white/10 text-white/50' 
                  : 'bg-[#DEDBD2]/30 border-[#DEDBD2] text-[#4A5759]/50'
              }`}
              style={{ fontSize: '16px' }}
            />
            <p className={`mt-1 ${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`} style={{ fontSize: '12px' }}>
              Email cannot be changed
            </p>
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

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
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
              type="submit"
              className="flex-1 px-6 py-4 bg-[#EDAFB8] text-white rounded-[20px] hover:bg-[#E19AA5] transition-all duration-300"
              style={{ 
                fontSize: '16px',
                boxShadow: '0px 8px 24px rgba(237, 175, 184, 0.2)'
              }}
            >
              Save Changes
            </button>
          </div>
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
