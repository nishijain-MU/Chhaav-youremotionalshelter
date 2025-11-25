import { ArrowLeft, Book } from 'lucide-react';
import type { Screen } from '../App';

interface ComfortStoryScreenProps {
  navigate: (screen: Screen) => void;
  isDarkMode?: boolean;
}

export function ComfortStoryScreen({ navigate, isDarkMode }: ComfortStoryScreenProps) {
  const story = {
    title: "The Garden That Grew in Silence",
    paragraphs: [
      "There was once a gardener who planted seeds in winter. Everyone told her it was the wrong time—that nothing grows when the world is cold and gray. But she planted them anyway, gently pressing each one into the frozen earth.",
      "Months passed. The surface looked unchanged—bare soil, quiet skies. People walking by would shake their heads. \"Nothing's growing,\" they'd say. And the gardener would smile softly, because she knew better.",
      "Beneath the surface, roots were spreading. Slowly, invisibly, the seeds were becoming something more. They weren't in a hurry. They were taking their time, drawing strength from the darkness, preparing for the light they couldn't yet see.",
      "And then, one morning, the first green shoot appeared. Delicate, tender, but undeniably alive. It hadn't given up during the cold months. It had simply been growing at its own pace, in its own way.",
      "Your healing is like that garden. Just because others can't see it doesn't mean it's not happening. Just because it feels slow doesn't mean it's not real. You're growing, even now, in ways that will one day break through the surface and bloom.",
      "Trust the process. Trust the silence. Trust that beneath everything you're feeling, something beautiful is taking root."
    ]
  };

  return (
    <div className={`relative w-full min-h-screen overflow-y-auto pb-6 ${
      isDarkMode 
        ? 'bg-[#1a1a1a]' 
        : 'bg-gradient-to-br from-[#B0C4B1]/20 to-[#F7E1D7] lg:bg-gradient-to-br lg:from-[#FAFAF9] lg:to-[#DEDBD2]/30'
    }`}>
      <div className="max-w-3xl mx-auto lg:px-8 lg:py-8">
        {/* Header */}
        <div className="px-6 pt-12 pb-4 safe-area-top">
          <button
            onClick={() => navigate('comfort-corner')}
            className={`p-2 rounded-full transition-all duration-300 -ml-2 ${
              isDarkMode ? 'hover:bg-white/10' : 'hover:bg-white/30'
            }`}
          >
            <ArrowLeft className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} />
          </button>
        </div>

        {/* Story */}
        <div className="px-6 pb-8">
          <div className={`rounded-3xl p-8 shadow-xl max-w-2xl mx-auto ${
            isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white'
          }`}>
            {/* Story Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#B0C4B1] to-[#F7E1D7] rounded-full flex items-center justify-center">
                <Book className="w-8 h-8 text-white" />
              </div>
              <h2 className={`mb-2 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>{story.title}</h2>
              <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`}>A story to hold you gently</p>
            </div>

            {/* Story Content */}
            <div className={`space-y-5 leading-relaxed ${
              isDarkMode ? 'text-white/80' : 'text-[#4A5759]/80'
            }`}>
              {story.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Footer */}
            <div className={`mt-8 pt-6 border-t ${
              isDarkMode ? 'border-white/10' : 'border-[#DEDBD2]'
            }`}>
              <button
                onClick={() => navigate('home')}
                className="w-full px-5 py-3 bg-[#EDAFB8] text-white rounded-2xl hover:bg-[#E19AA5] transition-all duration-300"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}