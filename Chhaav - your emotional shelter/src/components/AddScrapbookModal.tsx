import { useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

interface AddScrapbookModalProps {
  onClose: () => void;
  onSave: (entry: { whatYouDid: string; howYouFelt: string; media?: File }) => void;
  isDarkMode?: boolean;
}

export function AddScrapbookModal({ onClose, onSave, isDarkMode }: AddScrapbookModalProps) {
  const [whatYouDid, setWhatYouDid] = useState('');
  const [howYouFelt, setHowYouFelt] = useState('');
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaFile, setMediaFile] = useState<File | undefined>(undefined);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (whatYouDid.trim() && howYouFelt.trim()) {
      onSave({ whatYouDid, howYouFelt, media: mediaFile });
      onClose();
    }
  };

  return (
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className={`rounded-3xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto ${
        isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 rounded-t-3xl border-b px-6 py-4 flex items-center justify-between ${
          isDarkMode ? 'bg-[#2a2a2a] border-white/10' : 'bg-white border-[#DEDBD2]'
        }`}>
          <h2 className={`${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Add a warm moment</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-all duration-300 ${
              isDarkMode ? 'hover:bg-white/10' : 'hover:bg-[#F7E1D7]'
            }`}
          >
            <X className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`} />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* What You Did */}
          <div>
            <label className={`text-sm mb-2 block ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>What you did?</label>
            <textarea
              value={whatYouDid}
              onChange={(e) => setWhatYouDid(e.target.value)}
              placeholder="Had coffee with a friend, watched the sunrise..."
              rows={3}
              className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#EDAFB8] resize-none ${
                isDarkMode 
                  ? 'bg-[#1a1a1a] border-white/20 text-white placeholder:text-white/40' 
                  : 'bg-[#F7E1D7] border-[#DEDBD2] text-[#4A5759]'
              }`}
            />
          </div>

          {/* How You Felt */}
          <div>
            <label className={`text-sm mb-2 block ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>How you felt?</label>
            <textarea
              value={howYouFelt}
              onChange={(e) => setHowYouFelt(e.target.value)}
              placeholder="Peaceful, connected, grateful..."
              rows={3}
              className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#EDAFB8] resize-none ${
                isDarkMode 
                  ? 'bg-[#1a1a1a] border-white/20 text-white placeholder:text-white/40' 
                  : 'bg-[#F7E1D7] border-[#DEDBD2] text-[#4A5759]'
              }`}
            />
          </div>

          {/* Media Upload */}
          <div>
            <label className={`text-sm mb-3 block ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Add a photo (optional)</label>
            
            {mediaPreview ? (
              <div className={`relative rounded-2xl overflow-hidden aspect-video ${
                isDarkMode ? 'bg-[#3a3a3a]' : 'bg-[#DEDBD2]'
              }`}>
                <img 
                  src={mediaPreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    setMediaPreview(null);
                    setMediaFile(undefined);
                  }}
                  className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
                    isDarkMode ? 'bg-[#2a2a2a]/90 hover:bg-[#2a2a2a]' : 'bg-white/90 hover:bg-white'
                  }`}
                >
                  <X className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} />
                </button>
              </div>
            ) : (
              <label className={`flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-[#3a3a3a] to-[#EDAFB8]/20 border-white/20 hover:border-[#EDAFB8]' 
                  : 'bg-gradient-to-br from-[#F7E1D7] to-[#EDAFB8]/30 border-[#DEDBD2] hover:border-[#EDAFB8]'
              }`}>
                <div className="flex flex-col items-center justify-center py-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    isDarkMode ? 'bg-white/10' : 'bg-white/70'
                  }`}>
                    <Upload className="w-6 h-6 text-[#EDAFB8]" />
                  </div>
                  <p className={`text-sm mb-1 ${isDarkMode ? 'text-white/70' : 'text-[#4A5759]/70'}`}>Click to upload</p>
                  <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-[#4A5759]/50'}`}>PNG, JPG up to 10MB</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleMediaUpload}
                />
              </label>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`sticky bottom-0 rounded-b-3xl border-t px-6 py-4 flex gap-3 ${
          isDarkMode ? 'bg-[#2a2a2a] border-white/10' : 'bg-white border-[#DEDBD2]'
        }`}>
          <button
            onClick={onClose}
            className={`flex-1 px-5 py-3 rounded-2xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]' 
                : 'bg-[#F7E1D7] text-[#4A5759] hover:bg-[#DEDBD2]'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!whatYouDid.trim() || !howYouFelt.trim()}
            className="flex-1 px-5 py-3 bg-[#EDAFB8] text-white rounded-2xl hover:bg-[#E19AA5] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Moment
          </button>
        </div>
      </div>
    </div>
  );
}