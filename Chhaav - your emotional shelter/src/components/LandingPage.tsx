import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onNavigate: (screen: string) => void;
  onOpenModal: (modal: 'signup' | 'login') => void;
}

export function LandingPage({ onNavigate, onOpenModal }: LandingPageProps) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#F7E1D7] to-[#DEDBD2]">
      {/* Hero Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative w-full h-full">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758791978087-737819d8e9a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMHRyZWUlMjBzaGFkZSUyMHN1bmxpZ2h0JTIwbmF0dXJlfGVufDF8fHx8MTc2MzYyOTQ2OHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Peaceful nature"
            className="w-full h-full object-cover"
          />
          {/* Overlay with blur */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-md" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Title */}
          <h1 className="text-[#4A5759] mb-4" style={{ fontSize: '48px', lineHeight: '1.2' }}>
            छाँव
          </h1>

          {/* Subtitle */}
          <p className="text-[#4A5759]/80 mb-12" style={{ fontSize: '22px', lineHeight: '1.5' }}>
            a comforting shelter for your emotions
          </p>

          {/* CTA Button */}
          <button
            onClick={() => onNavigate('about')}
            className="px-7 py-4 bg-[#EDAFB8] text-[#4A5759] rounded-[20px] hover:bg-[#E19AA5] transition-all duration-300"
            style={{ 
              fontSize: '18px',
              boxShadow: '0px 8px 24px rgba(237, 175, 184, 0.3)'
            }}
          >
            About Chhaav
          </button>

          {/* Start Gently Section */}
          <div className="pt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-[24px] p-8 shadow-lg max-w-md mx-auto">
              <h3 className="text-[#4A5759] text-center mb-6" style={{ fontSize: '22px' }}>
                Start gently
              </h3>

              <div className="space-y-3">
                {/* Primary Button */}
                <button
                  onClick={() => onOpenModal('signup')}
                  className="w-full px-6 py-4 bg-[#EDAFB8] text-[#4A5759] rounded-[20px] hover:bg-[#E19AA5] transition-all duration-300"
                  style={{ 
                    fontSize: '17px',
                    boxShadow: '0px 8px 24px rgba(237, 175, 184, 0.2)'
                  }}
                >
                  Sign up
                </button>

                {/* Secondary Button */}
                <button
                  onClick={() => onOpenModal('login')}
                  className="w-full px-6 py-4 bg-transparent border-2 border-[#4A5759] text-[#4A5759] rounded-[20px] hover:bg-[#4A5759]/5 transition-all duration-300"
                  style={{ fontSize: '17px' }}
                >
                  Log In
                </button>

                {/* Tertiary Link */}
                <div className="text-center pt-2">
                  <button
                    onClick={() => onNavigate('demo')}
                    className="text-[#4A5759]/60 hover:text-[#4A5759] transition-colors"
                    style={{ fontSize: '15px' }}
                  >
                    Or try demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-0 right-0 text-center px-6">
          <p className="text-[#4A5759]/60 mb-2" style={{ fontSize: '14px' }}>
            Whenever you feel like talking, I'm here.
          </p>
          <div className="flex items-center justify-center gap-4 text-[#4A5759]/50" style={{ fontSize: '13px' }}>
            <button className="hover:text-[#4A5759] transition-colors">Privacy Policy</button>
            <span>•</span>
            <button className="hover:text-[#4A5759] transition-colors">Terms</button>
          </div>
        </div>
      </div>
    </div>
  );
}