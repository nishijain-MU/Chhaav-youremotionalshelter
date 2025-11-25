import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface AboutScreenProps {
  onNavigate: (screen: string) => void;
}

export function AboutScreen({ onNavigate }: AboutScreenProps) {
  const [activeTab, setActiveTab] = useState<'what' | 'why' | 'safety'>('what');

  return (
    <div className="relative w-full min-h-screen overflow-y-auto bg-gradient-to-br from-[#F7E1D7]/30 to-[#DEDBD2]/30">
      <div className="max-w-4xl mx-auto px-6 py-12 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => onNavigate('landing')}
            className="mb-6 p-2 hover:bg-[#F7E1D7] rounded-full transition-all duration-300 -ml-2"
          >
            <ArrowLeft className="w-5 h-5 text-[#4A5759]" />
          </button>
          <h1 className="text-[#4A5759] text-center mb-2" style={{ fontSize: '24px' }}>
            About Chhaav
          </h1>
        </div>

        {/* Overview Section */}
        <div className="mb-12 text-center space-y-6">
          <h2 className="text-[#4A5759]" style={{ fontSize: '24px', lineHeight: '1.4' }}>
            A warm emotional companion that listens, reflects, and stays with you without judgment.
          </h2>

          <div className="space-y-3 text-left max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <span className="text-[#EDAFB8] mt-1">•</span>
              <p className="text-[#4A5759]/80" style={{ fontSize: '18px' }}>
                No tasks, no pressure, only presence
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#EDAFB8] mt-1">•</span>
              <p className="text-[#4A5759]/80" style={{ fontSize: '18px' }}>
                Conversations that feel gentle and human
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#EDAFB8] mt-1">•</span>
              <p className="text-[#4A5759]/80" style={{ fontSize: '18px' }}>
                A space where every feeling feels welcome
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-12">
          {/* Tab Buttons */}
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex bg-[#DEDBD2]/40 rounded-[20px] p-1.5 gap-1">
              <button
                onClick={() => setActiveTab('what')}
                className={`px-6 py-3 rounded-[16px] transition-all duration-300 ${
                  activeTab === 'what'
                    ? 'bg-white text-[#4A5759] shadow-md'
                    : 'text-[#4A5759]/60 hover:text-[#4A5759]'
                }`}
                style={{ fontSize: '15px' }}
              >
                What is Chhaav?
              </button>
              <button
                onClick={() => setActiveTab('why')}
                className={`px-6 py-3 rounded-[16px] transition-all duration-300 ${
                  activeTab === 'why'
                    ? 'bg-white text-[#4A5759] shadow-md'
                    : 'text-[#4A5759]/60 hover:text-[#4A5759]'
                }`}
                style={{ fontSize: '15px' }}
              >
                Why we built this
              </button>
              <button
                onClick={() => setActiveTab('safety')}
                className={`px-6 py-3 rounded-[16px] transition-all duration-300 ${
                  activeTab === 'safety'
                    ? 'bg-white text-[#4A5759] shadow-md'
                    : 'text-[#4A5759]/60 hover:text-[#4A5759]'
                }`}
                style={{ fontSize: '15px' }}
              >
                Safety & Guardrails
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-[24px] p-8 lg:p-10 shadow-sm">
            {activeTab === 'what' && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-[#4A5759]/80 leading-relaxed" style={{ fontSize: '18px' }}>
                  Chhaav is an AI-powered emotional companion built to feel warm, safe, and human. 
                  It listens in the tone you choose, helps you reflect on your days, and gently 
                  organizes your thoughts, feelings, and moments.
                </p>
                <div className="pt-4">
                  <div className="w-full h-48 bg-gradient-to-br from-[#F7E1D7] to-[#EDAFB8]/30 rounded-[20px] flex items-center justify-center">
                    <span className="text-6xl">🌸</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'why' && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-[#4A5759]/80 leading-relaxed" style={{ fontSize: '18px' }}>
                  Today's young adults face emotional fatigue, loneliness, and decision overwhelm. 
                  People don't always want a tool—they want presence.
                </p>
                <p className="text-[#4A5759]/70 leading-relaxed italic" style={{ fontSize: '17px' }}>
                  Aarav, 26, often feels unheard and overstimulated; he simply wants gentle 
                  conversation without judgment.
                </p>
              </div>
            )}

            {activeTab === 'safety' && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#B0C4B1] mt-2.5 flex-shrink-0" />
                    <p className="text-[#4A5759]/80" style={{ fontSize: '18px' }}>
                      No diagnosis, no medical tone
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#B0C4B1] mt-2.5 flex-shrink-0" />
                    <p className="text-[#4A5759]/80" style={{ fontSize: '18px' }}>
                      Crisis-safe redirection
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#B0C4B1] mt-2.5 flex-shrink-0" />
                    <p className="text-[#4A5759]/80" style={{ fontSize: '18px' }}>
                      Anonymous identities in community
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#B0C4B1] mt-2.5 flex-shrink-0" />
                    <p className="text-[#4A5759]/80" style={{ fontSize: '18px' }}>
                      Strict non-sharing of data
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#B0C4B1] mt-2.5 flex-shrink-0" />
                    <p className="text-[#4A5759]/80" style={{ fontSize: '18px' }}>
                      Warm, grounded AI responses only
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
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