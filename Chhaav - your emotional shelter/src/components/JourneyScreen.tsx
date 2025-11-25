import { useState } from 'react';
import { ChevronRight, ChevronDown, FileText, Heart, Sparkles, Book, Video, Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AddScrapbookModal } from './AddScrapbookModal';
import type { Screen } from '../App';

interface JourneyScreenProps {
  navigate: (screen: Screen, options?: { backlogItem?: string }) => void;
  isDarkMode?: boolean;
}

export function JourneyScreen({ navigate, isDarkMode }: JourneyScreenProps) {
  const [isWeekExpanded, setIsWeekExpanded] = useState(false);
  const [showAddScrapbook, setShowAddScrapbook] = useState(false);

  const weeklyReflections = [
    { day: 'Monday', reflection: 'You felt unheard in your meeting but stayed kind to yourself.' },
    { day: 'Tuesday', reflection: 'A moment of quiet confidence when presenting your ideas.' },
    { day: 'Wednesday', reflection: 'You noticed feeling anxious but took time to breathe deeply.' },
    { day: 'Thursday', reflection: 'Connecting with a colleague brought unexpected warmth.' },
    { day: 'Friday', reflection: 'You honored your boundaries and left work on time.' },
    { day: 'Saturday', reflection: 'Rest came more easily today - you are learning to let go.' },
    { day: 'Sunday', reflection: 'Gentle preparation for the week ahead, with self-compassion.' },
  ];

  const backlogItems = [
    { id: 1, title: 'That conversation with my manager', color: '#EDAFB8' },
    { id: 2, title: 'Feeling unheard at the team meeting', color: '#B0C4B1' },
    { id: 3, title: 'Anxiety about the upcoming presentation', color: '#F7E1D7' },
  ];

  const scrapbookItems = [
    { 
      id: 1, 
      title: 'Peaceful morning',
      image: 'https://images.unsplash.com/photo-1709897633539-68625c0043e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMHN1bnJpc2UlMjBtb3JuaW5nfGVufDF8fHx8MTc2MzQ4NzY2NXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: 2, 
      title: 'Coffee with friend',
      image: 'https://images.unsplash.com/photo-1595804903022-5e12d1150fdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBmcmllbmQlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzYzNDg3NjY1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: 3, 
      title: 'Creative time',
      image: 'https://images.unsplash.com/photo-1725819242793-e83d3e08d439?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWludGluZyUyMGNyZWF0aXZlfGVufDF8fHx8MTc2MzQ1MzIzOXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: 4, 
      title: 'Reading moment',
      image: 'https://images.unsplash.com/photo-1706195546853-a81b6a190daf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMHJlYWRpbmclMjBjb3p5fGVufDF8fHx8MTc2MzM5NDI1Mnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: 5, 
      title: 'Nature walk',
      image: 'https://images.unsplash.com/photo-1678620845821-4db6d5ab1184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudHMlMjBuYXR1cmUlMjBncmVlbmVyeXxlbnwxfHx8fDE3NjM0ODc2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: 6, 
      title: 'Evening calm',
      image: 'https://images.unsplash.com/photo-1570751485906-b0bbe415db74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMHNreSUyMG1vb258ZW58MXx8fHwxNzYzNDg3NjY3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: 7, 
      title: 'Music therapy',
      image: 'https://images.unsplash.com/photo-1751606801832-51a77ad82f86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGhlYWRwaG9uZXMlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzYzMzc4NTU2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: 8, 
      title: 'Garden joy',
      image: 'https://images.unsplash.com/photo-1654139367249-5f51ce545345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXJzJTIwc3VuZmxvd2VyJTIwZ2FyZGVufGVufDF8fHx8MTc2MzQ4NzY2OHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
  ];

  const comfortOptions = [
    { id: 'letter', title: 'Comfort Letter', icon: FileText, color: 'from-[#F7E1D7] to-[#EDAFB8]/30' },
    { id: 'gratitude', title: 'Gratitude Note', icon: Heart, color: 'from-[#EDAFB8]/30 to-[#F7E1D7]' },
    { id: 'poem', title: 'Poem', icon: Sparkles, color: 'from-[#B0C4B1]/30 to-[#F7E1D7]' },
    { id: 'story', title: 'Reflective Story', icon: Book, color: 'from-[#F7E1D7] to-[#DEDBD2]' },
    { id: 'video', title: 'Video Message', icon: Video, color: 'from-[#DEDBD2] to-[#B0C4B1]/30' },
  ];

  const handleSaveScrapbook = (entry: { whatYouDid: string; howYouFelt: string; media?: File }) => {
    console.log('Scrapbook entry saved:', entry);
    // In a real app, this would save to a database or state management
  };

  return (
    <div className={`relative w-full min-h-screen overflow-y-auto pb-6 ${
      isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white lg:bg-[#FAFAF9]'
    }`}>
      <div className="max-w-6xl mx-auto lg:px-8">
        {/* Header */}
        <div className="px-6 lg:px-0 pt-12 pb-6">
          <div className="mb-2">
            <h1 className={`text-3xl lg:text-5xl ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Journey</h1>
            <p className={`text-sm lg:text-base mt-1 ${
              isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'
            }`}>Your emotional growth under shade.</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Auto-Journal Summary - Expandable */}
            <div className="px-6 lg:px-0">
              <div className={`rounded-3xl p-5 lg:p-6 shadow-md ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a]' 
                  : 'bg-gradient-to-br from-[#DEDBD2] to-[#B0C4B1]/30'
              }`}>
                <h3 className={`mb-3 text-sm lg:text-base ${
                  isDarkMode ? 'text-white' : 'text-[#4A5759]'
                }`}>This week's reflection</h3>
                
                {!isWeekExpanded ? (
                  // Collapsed view - show only Monday
                  <>
                    <p className={`text-sm lg:text-base leading-relaxed mb-3 ${
                      isDarkMode ? 'text-white/70' : 'text-[#4A5759]/70'
                    }`}>
                      {weeklyReflections[0].day}: {weeklyReflections[0].reflection}
                    </p>
                    <button 
                      onClick={() => setIsWeekExpanded(true)}
                      className={`text-sm lg:text-base flex items-center gap-1 hover:gap-2 transition-all duration-300 ${
                        isDarkMode ? 'text-white' : 'text-[#4A5759]'
                      }`}
                    >
                      View More
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  // Expanded view - show all days
                  <>
                    <div className="space-y-4 mb-4">
                      {weeklyReflections.map((item, index) => (
                        <div key={index} className={`pb-3 border-b last:border-0 ${
                          isDarkMode ? 'border-white/10' : 'border-[#4A5759]/10'
                        }`}>
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-20 lg:w-24">
                              <span className={`text-sm lg:text-base opacity-80 ${
                                isDarkMode ? 'text-white' : 'text-[#4A5759]'
                              }`}>
                                {item.day}
                              </span>
                            </div>
                            <p className={`text-sm lg:text-base leading-relaxed flex-1 ${
                              isDarkMode ? 'text-white/70' : 'text-[#4A5759]/70'
                            }`}>
                              {item.reflection}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => setIsWeekExpanded(false)}
                      className={`text-sm lg:text-base flex items-center gap-1 hover:gap-2 transition-all duration-300 ${
                        isDarkMode ? 'text-white' : 'text-[#4A5759]'
                      }`}
                    >
                      View Less
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Backlog */}
            <div className="px-6 lg:px-0">
              <div className="mb-3 flex items-center justify-between">
                <h3 className={`text-sm lg:text-base ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>
                  Feelings I'm not ready for yet
                </h3>
                <button 
                  onClick={() => navigate('backlog')}
                  className={`text-xs transition-colors duration-300 ${
                    isDarkMode ? 'text-white/50 hover:text-white' : 'text-[#4A5759]/50 hover:text-[#4A5759]'
                  }`}
                >
                  View all
                </button>
              </div>
              <div className="space-y-3">
                {backlogItems.map(item => (
                  <div
                    key={item.id}
                    className={`rounded-2xl p-4 lg:p-5 shadow-sm flex items-center justify-between ${
                      isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white lg:bg-[#F7E1D7]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className={`text-sm lg:text-base ${
                        isDarkMode ? 'text-white/70' : 'text-[#4A5759]/70'
                      }`}>{item.title}</span>
                    </div>
                    <button 
                      onClick={() => navigate('chat', { backlogItem: item.title })}
                      className={`px-4 py-1.5 rounded-xl text-sm lg:text-base transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-[#EDAFB8]/20 text-[#EDAFB8] hover:bg-[#EDAFB8]/30' 
                          : 'bg-[#EDAFB8]/30 lg:bg-white text-[#4A5759] hover:bg-[#EDAFB8]/50'
                      }`}
                    >
                      Revisit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 mt-6 lg:mt-0">
            {/* Scrapbook */}
            <div className="px-6 lg:px-0">
              <div className="mb-3 flex items-center justify-between">
                <h3 className={`text-sm lg:text-base ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>
                  Emotional scrapbook
                </h3>
                <button 
                  onClick={() => navigate('scrapbook')}
                  className={`text-xs transition-colors duration-300 ${
                    isDarkMode ? 'text-white/50 hover:text-white' : 'text-[#4A5759]/50 hover:text-[#4A5759]'
                  }`}
                >
                  View all
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {scrapbookItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => navigate('scrapbook')}
                    className="aspect-square rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden relative group"
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <p className="absolute bottom-1 left-1 right-1 text-white text-[10px] text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.title}
                    </p>
                  </button>
                ))}
              </div>
              
              {/* Add New Moment Button */}
              <button
                onClick={() => setShowAddScrapbook(true)}
                className={`w-full mt-3 py-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
                  isDarkMode 
                    ? 'bg-[#EDAFB8]/20 text-[#EDAFB8] hover:bg-[#EDAFB8]/30' 
                    : 'bg-gradient-to-br from-[#F7E1D7] to-[#EDAFB8]/30 text-[#4A5759] hover:from-[#EDAFB8]/30 hover:to-[#F7E1D7]'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm lg:text-base">Add a new warm moment</span>
              </button>
            </div>

            {/* Comforting Letters */}
            <div className="px-6 lg:px-0">
              <div className="mb-3 flex items-center justify-between">
                <h3 className={`text-sm lg:text-base ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>
                  What do you need this week?
                </h3>
                <button 
                  onClick={() => navigate('comfort-corner')}
                  className={`text-xs transition-colors duration-300 ${
                    isDarkMode ? 'text-white/50 hover:text-white' : 'text-[#4A5759]/50 hover:text-[#4A5759]'
                  }`}
                >
                  View all
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {comfortOptions.slice(0, 4).map(option => (
                  <button
                    key={option.id}
                    onClick={() => navigate('comfort-letter')}
                    className={`bg-gradient-to-br ${option.color} rounded-2xl p-4 lg:p-5 shadow-md hover:shadow-lg transition-all duration-300 text-left`}
                  >
                    <option.icon className={`w-5 h-5 lg:w-6 lg:h-6 mb-2 ${
                      isDarkMode ? 'text-white' : 'text-[#4A5759]'
                    }`} />
                    <span className={`text-sm lg:text-base block ${
                      isDarkMode ? 'text-white' : 'text-[#4A5759]'
                    }`}>{option.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Scrapbook Modal */}
      {showAddScrapbook && (
        <AddScrapbookModal
          onClose={() => setShowAddScrapbook(false)}
          onSave={handleSaveScrapbook}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
