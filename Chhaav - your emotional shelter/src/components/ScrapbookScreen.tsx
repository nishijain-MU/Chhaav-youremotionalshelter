import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AddScrapbookModal } from './AddScrapbookModal';
import type { Screen } from '../App';

interface ScrapbookScreenProps {
  navigate: (screen: Screen) => void;
  isDarkMode?: boolean;
}

export function ScrapbookScreen({ navigate, isDarkMode }: ScrapbookScreenProps) {
  const [showAddScrapbook, setShowAddScrapbook] = useState(false);

  const scrapbookItems = [
    { 
      id: 1, 
      title: 'Peaceful morning',
      date: 'Today',
      image: 'https://images.unsplash.com/photo-1709897633539-68625c0043e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMHN1bnJpc2UlMjBtb3JuaW5nfGVufDF8fHx8MTc2MzQ4NzY2NXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: 2, 
      title: 'Coffee with friend',
      date: 'Yesterday',
      image: 'https://images.unsplash.com/photo-1595804903022-5e12d1150fdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBmcmllbmQlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzYzNDg3NjY1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: 3, 
      title: 'Creative time',
      date: '2 days ago',
      image: 'https://images.unsplash.com/photo-1725819242793-e83d3e08d439?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWludGluZyUyMGNyZWF0aXZlfGVufDF8fHx8MTc2MzQ1MzIzOXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: 4, 
      title: 'Reading moment',
      date: '3 days ago',
      image: 'https://images.unsplash.com/photo-1706195546853-a81b6a190daf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMHJlYWRpbmclMjBjb3p5fGVufDF8fHx8MTc2MzM5NDI1Mnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: 5, 
      title: 'Nature walk',
      date: '4 days ago',
      image: 'https://images.unsplash.com/photo-1678620845821-4db6d5ab1184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudHMlMjBuYXR1cmUlMjBncmVlbmVyeXxlbnwxfHx8fDE3NjM0ODc2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: 6, 
      title: 'Evening calm',
      date: '5 days ago',
      image: 'https://images.unsplash.com/photo-1570751485906-b0bbe415db74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMHNreSUyMG1vb258ZW58MXx8fHwxNzYzNDg3NjY3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: 7, 
      title: 'Music therapy',
      date: '6 days ago',
      image: 'https://images.unsplash.com/photo-1751606801832-51a77ad82f86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGhlYWRwaG9uZXMlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzYzMzc4NTU2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: 8, 
      title: 'Garden joy',
      date: 'Last week',
      image: 'https://images.unsplash.com/photo-1654139367249-5f51ce545345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXJzJTIwc3VuZmxvd2VyJTIwZ2FyZGVufGVufDF8fHx8MTc2MzQ4NzY2OHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
  ];

  const handleSaveScrapbook = (entry: { whatYouDid: string; howYouFelt: string; media?: File }) => {
    console.log('Scrapbook entry saved:', entry);
    // In a real app, this would save to a database or state management
  };

  return (
    <div className={`relative w-full min-h-screen overflow-y-auto pb-6 ${
      isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white lg:bg-[#FAFAF9]'
    }`}>
      <div className="max-w-5xl mx-auto lg:px-8">
        {/* Header */}
        <div className="px-6 lg:px-0 pt-12 pb-6">
          <button
            onClick={() => navigate('journey')}
            className={`mb-4 p-2 rounded-full transition-all duration-300 -ml-2 ${
              isDarkMode ? 'hover:bg-white/10' : 'hover:bg-[#F7E1D7]'
            }`}
          >
            <ArrowLeft className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} />
          </button>
          <h1 className={`text-2xl lg:text-4xl mb-1 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Emotional Scrapbook</h1>
          <p className={`text-sm lg:text-base leading-relaxed ${
            isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'
          }`}>
            Warm moments and happy memories you have collected.
          </p>
        </div>

        {/* Scrapbook Grid */}
        <div className="px-6 lg:px-0 pb-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {scrapbookItems.map((item) => (
              <button
                key={item.id}
                className="aspect-square rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative group"
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <h3 className="text-white text-sm lg:text-base mb-1 leading-snug drop-shadow-lg">
                    {item.title}
                  </h3>
                  <span className="text-white/80 text-xs lg:text-sm drop-shadow-lg">
                    {item.date}
                  </span>
                </div>
                <div className="absolute inset-0 bg-[#EDAFB8]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Add Memory Button */}
        <div className="px-6 lg:px-0 pb-6">
          <button 
            onClick={() => setShowAddScrapbook(true)}
            className={`w-full rounded-3xl p-5 lg:p-6 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              isDarkMode 
                ? 'bg-[#EDAFB8]/20 hover:bg-[#EDAFB8]/30' 
                : 'bg-gradient-to-br from-[#F7E1D7] to-[#EDAFB8]/30'
            }`}
          >
            <Plus className={`w-5 h-5 ${isDarkMode ? 'text-[#EDAFB8]' : 'text-[#4A5759]'}`} />
            <p className={`text-sm lg:text-base ${isDarkMode ? 'text-[#EDAFB8]' : 'text-[#4A5759]'}`}>Add a new warm moment</p>
          </button>
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