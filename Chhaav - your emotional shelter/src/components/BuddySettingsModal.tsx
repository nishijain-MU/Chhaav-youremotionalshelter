import { useState, useEffect } from 'react';
import { X, Volume2, CheckCircle2, Heart, Users, Sparkles, Smile, Briefcase } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import professionalCalmAvatar from 'figma:asset/a9a78a1c92db3b2d226d718570746b6cecf7f655.png';
import warmUnderstandingAvatar from 'figma:asset/0494879eaa63b0e7f9e6f56184157d20308f08d4.png';
import wiseMentorAvatar from 'figma:asset/5faf2ca37bdb972e5ebd268dd480ba3a360bb4e1.png';
import youngProfessionalAvatar from 'figma:asset/756ee1c78616ebc197d56d450931ecd4be9d1537.png';
import friendlyApproachableAvatar from 'figma:asset/f2691d69c397f9ff00eae5d57f1d8269feaf8630.png';
import playfulEnergeticAvatar from 'figma:asset/d1fbecd2f109d13f2afc577f6651211c639890f3.png';
import warmGentleAvatar from 'figma:asset/81355990372c411bcc40c0a824ab93083fa80959.png';

type ToneOfVoice = 'warm' | 'sibling' | 'mentor' | 'playful' | 'professional';

interface BuddySettingsModalProps {
  buddyName: string;
  buddyTone: ToneOfVoice;
  buddyAvatar: string;
  onClose: () => void;
  onSave: (settings: { name?: string; tone?: ToneOfVoice; avatar?: string }) => void;
}

export function BuddySettingsModal({
  buddyName,
  buddyTone,
  buddyAvatar,
  onClose,
  onSave,
}: BuddySettingsModalProps) {
  const [name, setName] = useState(buddyName);
  const [tone, setTone] = useState<ToneOfVoice>(buddyTone);
  const [avatar, setAvatar] = useState(buddyAvatar);

  // Sync local state with props when modal reopens
  useEffect(() => {
    setName(buddyName);
    setTone(buddyTone);
    setAvatar(buddyAvatar);
  }, [buddyName, buddyTone, buddyAvatar]);

  const tones: { value: ToneOfVoice; label: string; icon: any; description: string }[] = [
    { value: 'warm', label: 'Warm & Friendly', icon: Heart, description: 'Gentle and caring' },
    { value: 'sibling', label: 'Older Sibling', icon: Users, description: 'Protective and supportive' },
    { value: 'mentor', label: 'Calm Mentor', icon: Sparkles, description: 'Wise and patient' },
    { value: 'playful', label: 'Playful', icon: Smile, description: 'Light and fun' },
    { value: 'professional', label: 'Professional', icon: Briefcase, description: 'Composed and clear' },
  ];

  const avatars = [
    { 
      id: 'default', 
      type: 'image' as const,
      image: warmUnderstandingAvatar,
      color: 'from-[#F7E1D7] to-[#EDAFB8]/30',
      personality: 'Warm & Understanding'
    },
    { 
      id: 'friendly', 
      type: 'image' as const,
      image: wiseMentorAvatar,
      color: 'from-[#EDAFB8]/30 to-[#F7E1D7]',
      personality: 'Friendly & Approachable'
    },
    { 
      id: 'professional', 
      type: 'image' as const,
      image: youngProfessionalAvatar,
      color: 'from-[#B0C4B1]/30 to-[#F7E1D7]',
      personality: 'Professional & Calm'
    },
    { 
      id: 'mentor', 
      type: 'image' as const,
      image: friendlyApproachableAvatar,
      color: 'from-[#DEDBD2] to-[#B0C4B1]/30',
      personality: 'Wise & Supportive'
    },
    { 
      id: 'playful', 
      type: 'image' as const,
      image: playfulEnergeticAvatar,
      color: 'from-[#F7E1D7] to-[#B0C4B1]/30',
      personality: 'Playful & Energetic'
    },
    { 
      id: 'warm', 
      type: 'image' as const,
      image: warmGentleAvatar,
      color: 'from-[#EDAFB8]/30 to-[#DEDBD2]',
      personality: 'Warm & Gentle'
    },
  ];

  const handleSave = () => {
    onSave({ name, tone, avatar });
    
    // Send buddy settings to webhook
    fetch('https://nishijain.app.n8n.cloud/webhook-test/e15af118-3c1c-47ae-aab6-98e0d596c07d', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify({
        buddyName: name,
        buddyTone: tone,
        buddyAvatar: avatar,
        timestamp: new Date().toISOString(),
        action: 'buddy_settings_updated',
      }),
    }).catch(() => {
      // Silently handle webhook errors to not disrupt user experience
    });
    
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-[#DEDBD2] px-6 py-4 flex items-center justify-between">
          <h2 className="text-[#4A5759]">Buddy Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F7E1D7] rounded-full transition-all duration-300"
          >
            <X className="w-5 h-5 text-[#4A5759]/60" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Buddy Name */}
          <div>
            <label className="text-[#4A5759] text-sm mb-2 block">Companion Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Muskurahat"
              className="w-full px-4 py-3 bg-[#F7E1D7] border border-[#DEDBD2] rounded-2xl text-[#4A5759] focus:outline-none focus:ring-2 focus:ring-[#EDAFB8]"
            />
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="text-[#4A5759] text-sm mb-3 block">Choose Avatar</label>
            <div className="grid grid-cols-2 gap-3">
              {avatars.map((av) => (
                <button
                  key={av.id}
                  onClick={() => setAvatar(av.id)}
                  className={`aspect-square rounded-2xl bg-gradient-to-br ${av.color} overflow-hidden transition-all duration-300 relative group ${
                    avatar === av.id
                      ? 'ring-4 ring-[#EDAFB8] ring-offset-2 scale-95'
                      : 'hover:scale-105'
                  }`}
                >
                  {av.type === 'image' && (
                    <ImageWithFallback
                      src={av.image}
                      alt={av.personality}
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tone of Voice */}
          <div>
            <label className="text-[#4A5759] text-sm mb-3 block">Tone of Voice</label>
            <div className="space-y-2">
              {tones.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTone(t.value)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left flex items-center gap-3 ${
                    tone === t.value
                      ? 'border-[#EDAFB8] bg-[#F7E1D7]'
                      : 'border-[#DEDBD2] bg-white hover:bg-[#F7E1D7]/50'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${tone === t.value ? 'bg-[#EDAFB8]/30' : 'bg-[#F7E1D7]'}`}>
                    <t.icon className={`w-5 h-5 ${tone === t.value ? 'text-[#EDAFB8]' : 'text-[#4A5759]/60'}`} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm ${tone === t.value ? 'text-[#4A5759]' : 'text-[#4A5759]/70'}`}>
                      {t.label}
                    </div>
                    <div className="text-xs text-[#4A5759]/50">{t.description}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                    tone === t.value
                      ? 'border-[#EDAFB8] bg-[#EDAFB8]'
                      : 'border-[#DEDBD2]'
                  }`}>
                    {tone === t.value && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white rounded-b-3xl border-t border-[#DEDBD2] px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-5 py-3 bg-[#F7E1D7] text-[#4A5759] rounded-2xl hover:bg-[#DEDBD2] transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-5 py-3 bg-[#EDAFB8] text-white rounded-2xl hover:bg-[#E19AA5] transition-all duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}