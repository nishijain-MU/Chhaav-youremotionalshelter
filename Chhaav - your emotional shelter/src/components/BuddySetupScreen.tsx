import { useState } from 'react';
import { Heart, Users, Sparkles, Smile, Briefcase } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import warmUnderstandingAvatar from 'figma:asset/0494879eaa63b0e7f9e6f56184157d20308f08d4.png';
import wiseMentorAvatar from 'figma:asset/5faf2ca37bdb972e5ebd268dd480ba3a360bb4e1.png';
import youngProfessionalAvatar from 'figma:asset/756ee1c78616ebc197d56d450931ecd4be9d1537.png';
import friendlyApproachableAvatar from 'figma:asset/f2691d69c397f9ff00eae5d57f1d8269feaf8630.png';
import playfulEnergeticAvatar from 'figma:asset/d1fbecd2f109d13f2afc577f6651211c639890f3.png';
import warmGentleAvatar from 'figma:asset/81355990372c411bcc40c0a824ab93083fa80959.png';

interface BuddySetupScreenProps {
  onComplete: (settings: { name: string; tone: string; avatar: string }) => void;
}

export function BuddySetupScreen({ onComplete }: BuddySetupScreenProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('Muskurahat');
  const [tone, setTone] = useState('warm');
  const [avatar, setAvatar] = useState('playful');

  const tones = [
    { value: 'warm', label: 'Warm & Friendly', icon: Heart, description: 'Gentle and caring' },
    { value: 'sibling', label: 'Older Sibling', icon: Users, description: 'Protective and supportive' },
    { value: 'mentor', label: 'Calm Mentor', icon: Sparkles, description: 'Wise and patient' },
    { value: 'playful', label: 'Playful', icon: Smile, description: 'Light and fun' },
    { value: 'professional', label: 'Professional', icon: Briefcase, description: 'Composed and clear' },
  ];

  const avatars = [
    { id: 'default', image: warmUnderstandingAvatar },
    { id: 'friendly', image: wiseMentorAvatar },
    { id: 'professional', image: youngProfessionalAvatar },
    { id: 'mentor', image: friendlyApproachableAvatar },
    { id: 'playful', image: playfulEnergeticAvatar },
    { id: 'warm', image: warmGentleAvatar },
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({ name, tone, avatar });
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-y-auto bg-gradient-to-br from-[#F7E1D7] to-[#DEDBD2]/50">
      <div className="max-w-2xl mx-auto px-6 py-12 lg:py-16">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === step ? 'w-12 bg-[#EDAFB8]' : 'w-8 bg-[#DEDBD2]'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-[24px] p-8 lg:p-10 shadow-lg">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-[#4A5759] mb-2" style={{ fontSize: '24px' }}>
                  Welcome! Let's set up your companion
                </h2>
                <p className="text-[#4A5759]/60" style={{ fontSize: '16px' }}>
                  What would you like to call them?
                </p>
              </div>

              <div>
                <label className="text-[#4A5759] text-sm mb-2 block">Companion Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Muskurahat"
                  className="w-full px-4 py-4 bg-white border-2 border-[#DEDBD2] rounded-[20px] text-[#4A5759] focus:outline-none focus:ring-2 focus:ring-[#EDAFB8] focus:border-transparent transition-all"
                  style={{ fontSize: '18px' }}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-[#4A5759] mb-2" style={{ fontSize: '24px' }}>
                  Choose their tone of voice
                </h2>
                <p className="text-[#4A5759]/60" style={{ fontSize: '16px' }}>
                  How would you like them to talk to you?
                </p>
              </div>

              <div className="space-y-3">
                {tones.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTone(t.value)}
                    className={`w-full p-4 rounded-[20px] border-2 transition-all duration-300 text-left flex items-center gap-3 ${
                      tone === t.value
                        ? 'border-[#EDAFB8] bg-[#F7E1D7]'
                        : 'border-[#DEDBD2] bg-white hover:bg-[#F7E1D7]/50'
                    }`}
                  >
                    <div className={`p-2 rounded-[12px] ${tone === t.value ? 'bg-[#EDAFB8]/30' : 'bg-[#F7E1D7]'}`}>
                      <t.icon className={`w-5 h-5 ${tone === t.value ? 'text-[#EDAFB8]' : 'text-[#4A5759]/60'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-[#4A5759]" style={{ fontSize: '16px' }}>
                        {t.label}
                      </div>
                      <div className="text-[#4A5759]/50 text-sm">{t.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-[#4A5759] mb-2" style={{ fontSize: '24px' }}>
                  Pick their avatar
                </h2>
                <p className="text-[#4A5759]/60" style={{ fontSize: '16px' }}>
                  Choose a face that feels right
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {avatars.map((av) => (
                  <button
                    key={av.id}
                    onClick={() => setAvatar(av.id)}
                    className={`aspect-square rounded-[20px] overflow-hidden transition-all duration-300 ${
                      avatar === av.id
                        ? 'ring-4 ring-[#EDAFB8] ring-offset-2 scale-95'
                        : 'hover:scale-105'
                    }`}
                  >
                    <ImageWithFallback
                      src={av.image}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleNext}
            className="w-full px-6 py-4 bg-[#EDAFB8] text-white rounded-[20px] hover:bg-[#E19AA5] transition-all duration-300 mt-8"
            style={{ 
              fontSize: '17px',
              boxShadow: '0px 8px 24px rgba(237, 175, 184, 0.2)'
            }}
          >
            {step === 3 ? 'Complete Setup' : 'Continue'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}