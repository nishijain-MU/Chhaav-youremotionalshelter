import { useState } from 'react';
import { ArrowLeft, Edit2, Mic, Heart } from 'lucide-react';
import type { Screen } from '../App';

interface CommunityRoomScreenProps {
  navigate: (screen: Screen) => void;
  roomName: string;
  isDarkMode?: boolean;
}

export function CommunityRoomScreen({ navigate, roomName, isDarkMode }: CommunityRoomScreenProps) {
  const [username, setUsername] = useState('CloudWanderer');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [reactions, setReactions] = useState<{ [key: number]: { hug?: boolean; love?: boolean; metoo?: boolean } }>({});
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'QuietThoughts',
      text: "Sometimes I feel like I'm running on autopilot. Going through the motions but not really feeling anything. Does anyone else feel this way?",
      time: '2h ago',
    },
    {
      id: 2,
      username: 'MorningDew',
      text: "I had a meeting today where I shared an idea and nobody responded. The silence was so loud. I kept replaying it in my mind all day.",
      time: '4h ago',
    },
    {
      id: 3,
      username: 'SoftWhisper',
      text: "It's okay to not be okay. I'm learning that rest isn't laziness. Sometimes the bravest thing is to just pause.",
      time: '6h ago',
    },
  ]);

  const toggleReaction = (postId: number, reactionType: 'hug' | 'love' | 'metoo') => {
    setReactions(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [reactionType]: !prev[postId]?.[reactionType],
      },
    }));
  };

  const handlePost = () => {
    if (!postText.trim()) return;
    
    const newPost = {
      id: posts.length + 1,
      username,
      text: postText,
      time: 'Just now',
    };
    
    setPosts([newPost, ...posts]);
    setPostText('');
  };

  return (
    <div className={`relative w-full min-h-screen overflow-y-auto pb-6 ${
      isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white lg:bg-[#FAFAF9]'
    }`}>
      <div className="max-w-4xl mx-auto lg:px-8">
      {/* Header */}
      <div className="px-6 lg:px-0 pt-12 pb-6">
        <button
          onClick={() => navigate('community')}
          className={`mb-4 p-2 rounded-full transition-all duration-300 -ml-2 ${
            isDarkMode ? 'hover:bg-white/10' : 'hover:bg-[#F7E1D7]'
          }`}
        >
          <ArrowLeft className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} />
        </button>
        <h1 className={`text-2xl mb-1 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>{roomName}</h1>
        <div className="flex items-center gap-2 mt-3">
          {!isEditingUsername ? (
            <>
              <span className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`}>Posting as: {username}</span>
              <button 
                onClick={() => setIsEditingUsername(true)}
                className={`p-1.5 rounded-full transition-all duration-300 ${
                  isDarkMode ? 'hover:bg-white/10' : 'hover:bg-[#F7E1D7]'
                }`}
              >
                <Edit2 className={`w-3.5 h-3.5 ${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`} />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`px-3 py-1.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#EDAFB8] ${
                  isDarkMode 
                    ? 'bg-[#3a3a3a] border-white/20 text-white' 
                    : 'bg-[#F7E1D7] border-[#DEDBD2] text-[#4A5759]'
                }`}
              />
              <button
                onClick={() => setIsEditingUsername(false)}
                className="px-3 py-1.5 bg-[#EDAFB8] text-white rounded-xl text-sm hover:bg-[#E19AA5] transition-all duration-300"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Input */}
      <div className="px-6 py-4">
        <div className={`rounded-3xl p-4 shadow-sm ${
          isDarkMode ? 'bg-[#2a2a2a]' : 'bg-[#F7E1D7]'
        }`}>
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Share what's on your mind…"
            className={`w-full bg-transparent resize-none focus:outline-none mb-3 min-h-[80px] ${
              isDarkMode 
                ? 'text-white placeholder:text-white/40' 
                : 'text-[#4A5759] placeholder:text-[#4A5759]/40'
            }`}
          />
          <div className="flex items-center justify-between">
            <button className={`p-2 rounded-full transition-all duration-300 ${
              isDarkMode ? 'hover:bg-white/10' : 'hover:bg-white/50'
            }`}>
              <Mic className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`} />
            </button>
            <button 
              onClick={handlePost}
              disabled={!postText.trim()}
              className="px-5 py-2.5 bg-[#EDAFB8] text-white rounded-2xl text-sm hover:bg-[#E19AA5] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post Anonymously
            </button>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="px-6 space-y-4">
        {posts.map(post => (
          <div
            key={post.id}
            className={`rounded-3xl p-5 shadow-sm ${
              isDarkMode ? 'bg-[#2a2a2a]' : 'bg-[#F7E1D7]'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>{post.username}</span>
              <span className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-[#4A5759]/40'}`}>{post.time}</span>
            </div>
            <p className={`leading-relaxed mb-4 text-sm ${
              isDarkMode ? 'text-white/80' : 'text-[#4A5759]/80'
            }`}>
              {post.text}
            </p>
            {/* Only show reaction buttons if this is not the user's own post */}
            {post.username !== username && (
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => toggleReaction(post.id, 'hug')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm transition-all duration-300 ${
                    reactions[post.id]?.hug
                      ? 'bg-[#EDAFB8] text-white'
                      : isDarkMode 
                        ? 'bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]'
                        : 'bg-white text-[#4A5759] hover:bg-[#DEDBD2]'
                  }`}
                >
                  <span className="text-base">🤗</span>
                  <span>
                    {reactions[post.id]?.hug ? 'Hugged' : 'Hug'}
                  </span>
                </button>
                <button
                  onClick={() => toggleReaction(post.id, 'love')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm transition-all duration-300 ${
                    reactions[post.id]?.love
                      ? 'bg-[#EDAFB8] text-white'
                      : isDarkMode 
                        ? 'bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]'
                        : 'bg-white text-[#4A5759] hover:bg-[#DEDBD2]'
                  }`}
                >
                  <span className="text-base">💕</span>
                  <span>
                    {reactions[post.id]?.love ? 'Loved' : 'Love'}
                  </span>
                </button>
                <button
                  onClick={() => toggleReaction(post.id, 'metoo')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm transition-all duration-300 ${
                    reactions[post.id]?.metoo
                      ? 'bg-[#EDAFB8] text-white'
                      : isDarkMode 
                        ? 'bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]'
                        : 'bg-white text-[#4A5759] hover:bg-[#DEDBD2]'
                  }`}
                >
                  <span className="text-base">🙋</span>
                  <span>
                    Me too
                  </span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Community Guidelines Reminder */}
      <div className="px-6 mt-6">
        <div className={`rounded-3xl p-4 ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-[#DEDBD2]'}`}>
          <p className={`text-xs italic text-center leading-relaxed ${
            isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'
          }`}>
            Remember: No advice. No judgment. Only warmth.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}