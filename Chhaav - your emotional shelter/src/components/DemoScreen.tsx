import { ArrowLeft, MessageCircle, Users, Sparkles } from 'lucide-react';

interface DemoScreenProps {
  onNavigate: (screen: string) => void;
  onOpenModal: (modal: 'signup' | 'login') => void;
}

export function DemoScreen({ onNavigate, onOpenModal }: DemoScreenProps) {
  return (
    <div className="relative w-full min-h-screen overflow-y-auto bg-gradient-to-br from-[#F7E1D7]/30 to-[#DEDBD2]/30">
      <div className="max-w-4xl mx-auto px-6 py-12 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('about')}
            className="mb-6 p-2 hover:bg-[#F7E1D7] rounded-full transition-all duration-300 -ml-2"
          >
            <ArrowLeft className="w-5 h-5 text-[#4A5759]" />
          </button>
          <h1 className="text-[#4A5759] text-center mb-2" style={{ fontSize: '24px' }}>
            Demo Preview
          </h1>
          <p className="text-[#4A5759]/60 text-center" style={{ fontSize: '16px' }}>
            A glimpse into Chhaav's warm companion experience
          </p>
        </div>

        {/* Demo Content */}
        <div className="space-y-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-[16px] bg-[#F7E1D7] flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-[#EDAFB8]" />
              </div>
              <div>
                <h3 className="text-[#4A5759] mb-2" style={{ fontSize: '20px' }}>
                  Your AI Companion
                </h3>
                <p className="text-[#4A5759]/70 leading-relaxed" style={{ fontSize: '16px' }}>
                  Talk to Muskurahat, your personalized companion who listens without judgment. 
                  Choose their tone of voice and avatar to feel just right for you.
                </p>
              </div>
            </div>
            <div className="mt-6 bg-gradient-to-br from-[#F7E1D7] to-[#EDAFB8]/30 rounded-[20px] p-6 text-center">
              <p className="text-[#4A5759]/60 italic" style={{ fontSize: '15px' }}>
                "For any feeling and any moment, I'm here with you."
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-[16px] bg-[#EDAFB8]/30 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-[#EDAFB8]" />
              </div>
              <div>
                <h3 className="text-[#4A5759] mb-2" style={{ fontSize: '20px' }}>
                  Community Circles
                </h3>
                <p className="text-[#4A5759]/70 leading-relaxed" style={{ fontSize: '16px' }}>
                  Connect anonymously with others who understand. Join gentle circles 
                  for shared experiences, from overwork to loneliness.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-[16px] bg-[#B0C4B1]/30 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-[#B0C4B1]" />
              </div>
              <div>
                <h3 className="text-[#4A5759] mb-2" style={{ fontSize: '20px' }}>
                  Journey Tracking
                </h3>
                <p className="text-[#4A5759]/70 leading-relaxed" style={{ fontSize: '16px' }}>
                  Watch your emotional journey unfold. Gentle observations, weekly stories, 
                  and moments captured in your personal scrapbook.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#F7E1D7] to-[#EDAFB8]/30 rounded-[24px] p-8 text-center">
            <h3 className="text-[#4A5759] mb-4" style={{ fontSize: '22px' }}>
              Ready to begin?
            </h3>
            <button
              onClick={() => onOpenModal('signup')}
              className="px-8 py-4 bg-[#EDAFB8] text-white rounded-[20px] hover:bg-[#E19AA5] transition-all duration-300"
              style={{ 
                fontSize: '17px',
                boxShadow: '0px 8px 24px rgba(237, 175, 184, 0.2)'
              }}
            >
              Create your account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}