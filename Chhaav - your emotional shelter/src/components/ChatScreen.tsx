import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Mic, Image as ImageIcon, Send, X, Circle } from 'lucide-react';
import type { Screen, ToneOfVoice } from '../App';

interface ChatScreenProps {
  navigate: (screen: Screen) => void;
  buddyName: string;
  buddyTone: ToneOfVoice;
  backlogItem?: string;
  isDarkMode?: boolean;
}

interface Message {
  id: number;
  sender: 'user' | 'buddy' | 'system';
  text?: string;
  type: 'text' | 'voice' | 'image';
  timestamp: Date;
  imageUrl?: string;
  voiceDuration?: number;
}

export function ChatScreen({ navigate, buddyName, backlogItem, isDarkMode }: ChatScreenProps) {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [showBacklogPrompt, setShowBacklogPrompt] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const getBuddyResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
      return "It sounds like you've been carrying a lot. It's okay to rest. What's been weighing on you?";
    } else if (lowerMessage.includes('stressed') || lowerMessage.includes('overwhelm')) {
      return "That sounds really heavy. I'm here with you. Would you like to talk about what's making you feel this way?";
    } else if (lowerMessage.includes('work') || lowerMessage.includes('job')) {
      return "Work can be so demanding sometimes. Your feelings about this are completely valid. How has it been affecting you?";
    } else if (lowerMessage.includes('happy') || lowerMessage.includes('good')) {
      return "I'm so glad to hear that! These moments matter. What made today feel good for you?";
    } else if (lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
      return "Anxiety can feel so consuming. I see you, and I'm here. Take your time. What's on your mind?";
    } else {
      return "I'm listening. Take all the time you need to share what you're feeling. I'm here with you.";
    }
  };

  useEffect(() => {
    // Initialize with greeting or backlog message
    if (backlogItem) {
      setMessages([
        {
          id: 1,
          sender: 'buddy',
          type: 'text',
          text: `Let's revisit "${backlogItem}" gently. Whenever you're ready, I'm here.`,
          timestamp: new Date(),
        },
      ]);
    } else {
      setMessages([
        {
          id: 1,
          sender: 'buddy',
          type: 'text',
          text: 'Hey there. How are you feeling right now?',
          timestamp: new Date(),
        },
      ]);
    }
  }, [backlogItem]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      type: 'text',
      text: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageCopy = inputText;
    setInputText('');

    // Send message to webhook and wait for response
    try {
      const response = await fetch('https://nishijain.app.n8n.cloud/webhook/4104232a-d386-4c73-97a9-9e432cb8d9ae', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageCopy,
          buddyName: buddyName,
          timestamp: new Date().toISOString(),
          messageType: 'text',
        }),
      });

      // Log the raw response for debugging
      console.log('Webhook response status:', response.status);
      
      // Try to get response as text first
      const responseText = await response.text();
      console.log('Webhook raw response:', responseText);
      
      let buddyResponseText;
      
      // Try to parse as JSON
      try {
        const data = JSON.parse(responseText);
        console.log('Webhook parsed JSON:', data);
        
        // Check multiple possible response fields
        buddyResponseText = data.response || data.message || data.text || data.reply || data.output;
      } catch (parseError) {
        // If not JSON, use the text directly
        console.log('Using raw text response');
        buddyResponseText = responseText;
      }
      
      // If still no response, use fallback
      if (!buddyResponseText || buddyResponseText.trim() === '') {
        console.log('No response from webhook, using fallback');
        buddyResponseText = getBuddyResponse(messageCopy);
      }
      
      console.log('Final buddy response:', buddyResponseText);
      
      const buddyMessage: Message = {
        id: messages.length + 2,
        sender: 'buddy',
        type: 'text',
        text: buddyResponseText,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, buddyMessage]);

      // Sometimes show backlog prompt
      if (Math.random() > 0.7 && messageCopy.length > 20) {
        setTimeout(() => {
          setShowBacklogPrompt(true);
        }, 1000);
      }
    } catch (error) {
      // Fallback to local response if webhook fails
      setTimeout(() => {
        const buddyMessage: Message = {
          id: messages.length + 2,
          sender: 'buddy',
          type: 'text',
          text: getBuddyResponse(messageCopy),
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, buddyMessage]);
      }, 1000);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingDuration(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingDuration(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    setIsRecording(false);
  };

  const sendVoiceNote = () => {
    stopRecording();
    
    const voiceMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      type: 'voice',
      voiceDuration: recordingDuration,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, voiceMessage]);
    
    // Send voice message to webhook
    fetch('https://nishijain.app.n8n.cloud/webhook/4104232a-d386-4c73-97a9-9e432cb8d9ae', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify({
        message: `Voice note (${recordingDuration}s)`,
        buddyName: buddyName,
        timestamp: new Date().toISOString(),
        messageType: 'voice',
        voiceDuration: recordingDuration,
      }),
    }).catch(() => {
      // Silently handle webhook errors to not disrupt user experience
    });
    
    setRecordingDuration(0);

    // Buddy responds
    setTimeout(() => {
      const buddyMessage: Message = {
        id: messages.length + 2,
        sender: 'buddy',
        type: 'text',
        text: "I heard what you shared. Your voice matters here. How does it feel to express this?",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, buddyMessage]);

      // Send buddy response to webhook
      fetch('https://nishijain.app.n8n.cloud/webhook/4104232a-d386-4c73-97a9-9e432cb8d9ae', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          message: buddyMessage.text,
          buddyName: buddyName,
          timestamp: new Date().toISOString(),
          messageType: 'text',
          sender: 'buddy',
        }),
      }).catch(() => {
        // Silently handle webhook errors to not disrupt user experience
      });
    }, 1500);
  };

  const cancelRecording = () => {
    stopRecording();
    setRecordingDuration(0);
  };

  const handleImageUpload = (imageUrl: string) => {
    const imageMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      type: 'image',
      imageUrl,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, imageMessage]);
    setShowMediaPicker(false);

    // Send image message to webhook
    fetch('https://nishijain.app.n8n.cloud/webhook/4104232a-d386-4c73-97a9-9e432cb8d9ae', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify({
        message: 'Image shared',
        buddyName: buddyName,
        timestamp: new Date().toISOString(),
        messageType: 'image',
        imageUrl: imageUrl,
      }),
    }).catch(() => {
      // Silently handle webhook errors to not disrupt user experience
    });

    // Buddy responds
    setTimeout(() => {
      const buddyMessage: Message = {
        id: messages.length + 2,
        sender: 'buddy',
        type: 'text',
        text: "Thank you for sharing this moment with me. What does this mean to you?",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, buddyMessage]);

      // Send buddy response to webhook
      fetch('https://nishijain.app.n8n.cloud/webhook/4104232a-d386-4c73-97a9-9e432cb8d9ae', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          message: buddyMessage.text,
          buddyName: buddyName,
          timestamp: new Date().toISOString(),
          messageType: 'text',
          sender: 'buddy',
        }),
      }).catch(() => {
        // Silently handle webhook errors to not disrupt user experience
      });
    }, 1000);
  };

  const handleBacklogSave = () => {
    setShowBacklogPrompt(false);
    const systemMessage: Message = {
      id: messages.length + 1,
      sender: 'system',
      type: 'text',
      text: "💛 I've saved this for you. You can revisit it whenever you feel ready.",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  return (
    <div className={`relative w-full h-screen flex flex-col ${
      isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white lg:bg-[#FAFAF9]'
    }`}>
      <div className={`max-w-4xl mx-auto w-full h-full flex flex-col lg:my-4 lg:rounded-3xl lg:shadow-xl lg:overflow-hidden ${
        isDarkMode ? 'lg:bg-[#2a2a2a]' : 'lg:bg-white'
      }`}>
      {/* Header */}
      <div className={`flex-shrink-0 px-6 pt-12 pb-4 safe-area-top ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a]' 
          : 'bg-gradient-to-br from-[#F7E1D7] to-[#EDAFB8]/30'
      }`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('home')}
            className={`p-2 rounded-full transition-all duration-300 ${
              isDarkMode ? 'hover:bg-white/10' : 'hover:bg-white/50'
            }`}
          >
            <ArrowLeft className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} />
          </button>
          <div className="flex-1">
            <h2 className={`lg:text-xl ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>{buddyName}</h2>
            <p className={`text-xs lg:text-sm italic ${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`}>
              always here for you
            </p>
          </div>
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-[#EDAFB8] to-[#F7E1D7] flex items-center justify-center shadow-md">
            <span className="text-xl lg:text-2xl">🌙</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto px-6 py-6 space-y-4 ${
        isDarkMode ? 'bg-[#1a1a1a]' : ''
      }`}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'system' ? (
              <div className="max-w-[85%] bg-[#F7E1D7] rounded-2xl px-4 py-3 text-center">
                <p className="text-[#4A5759] text-sm">{message.text}</p>
              </div>
            ) : (
              <div
                className={`max-w-[75%] rounded-3xl px-5 py-3 ${
                  message.sender === 'user'
                    ? 'bg-[#EDAFB8] text-white rounded-br-lg'
                    : 'bg-[#F7E1D7] text-[#4A5759] rounded-bl-lg'
                }`}
              >
                {message.type === 'text' && (
                  <p className="text-sm leading-relaxed">{message.text}</p>
                )}
                {message.type === 'voice' && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>
                    <div className="flex-1 h-1 bg-white/30 rounded-full" />
                    <span className="text-xs opacity-80">{message.voiceDuration}s</span>
                  </div>
                )}
                {message.type === 'image' && (
                  <div className="w-48 h-48 rounded-2xl bg-[#DEDBD2] flex items-center justify-center">
                    <span className="text-4xl">🖼️</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {showBacklogPrompt && (
          <div className="bg-gradient-to-br from-[#F7E1D7] to-[#EDAFB8]/20 rounded-3xl p-5 shadow-md">
            <p className="text-[#4A5759] text-sm mb-4 leading-relaxed">
              Would you like me to hold this feeling for you until you're ready to revisit it?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleBacklogSave}
                className="flex-1 px-4 py-2.5 bg-[#EDAFB8] text-white rounded-2xl text-sm hover:bg-[#E19AA5] transition-all duration-300"
              >
                Hold This
              </button>
              <button
                onClick={() => setShowBacklogPrompt(false)}
                className="flex-1 px-4 py-2.5 bg-white text-[#4A5759] rounded-2xl text-sm hover:bg-[#DEDBD2] transition-all duration-300"
              >
                Not Now
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Recording Overlay */}
      {isRecording && (
        <div className="absolute inset-0 bg-[#EDAFB8]/95 backdrop-blur-md flex flex-col items-center justify-center z-50">
          <div className="text-center mb-8">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-4 mx-auto animate-pulse">
              <Circle className="w-16 h-16 text-white fill-white" />
            </div>
            <p className="text-white text-2xl mb-2">{Math.floor(recordingDuration / 60)}:{(recordingDuration % 60).toString().padStart(2, '0')}</p>
            <p className="text-white/80 text-sm">Recording your voice note...</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={cancelRecording}
              className="px-8 py-3 bg-white/20 text-white rounded-2xl hover:bg-white/30 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={sendVoiceNote}
              className="px-8 py-3 bg-white text-[#EDAFB8] rounded-2xl hover:bg-white/90 transition-all duration-300"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Media Picker Overlay */}
      {showMediaPicker && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className={`rounded-3xl w-full max-w-sm p-6 ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`}>Choose an image</h3>
              <button
                onClick={() => setShowMediaPicker(false)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode ? 'hover:bg-white/10' : 'hover:bg-[#F7E1D7]'
                }`}
              >
                <X className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-[#4A5759]'}`} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['🌸', '🌿', '☕', '📚', '🎨', '🌙'].map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleImageUpload(`image-${index}`)}
                  className={`aspect-square rounded-2xl flex items-center justify-center text-4xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-[#EDAFB8]/20 hover:bg-[#EDAFB8]/30' 
                      : 'bg-[#F7E1D7] hover:bg-[#EDAFB8]/30'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className={`backdrop-blur-md border-t px-6 py-4 pb-8 safe-area-bottom ${
        isDarkMode 
          ? 'bg-[#2a2a2a]/95 border-white/10' 
          : 'bg-white/95 border-[#DEDBD2]'
      }`}>
        <div className="flex items-end gap-2">
          <button 
            onClick={() => setShowMediaPicker(true)}
            className={`p-2.5 rounded-full transition-all duration-300 flex-shrink-0 ${
              isDarkMode ? 'hover:bg-white/10' : 'hover:bg-[#F7E1D7]'
            }`}
          >
            <ImageIcon className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`} />
          </button>
          <button 
            onClick={startRecording}
            className={`p-2.5 rounded-full transition-all duration-300 flex-shrink-0 ${
              isDarkMode ? 'hover:bg-white/10' : 'hover:bg-[#F7E1D7]'
            }`}
          >
            <Mic className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-[#4A5759]/60'}`} />
          </button>
          <div className={`flex-1 rounded-3xl px-4 py-2 flex items-center gap-2 ${
            isDarkMode ? 'bg-[#3a3a3a]' : 'bg-[#F7E1D7]'
          }`}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className={`flex-1 bg-transparent focus:outline-none text-sm ${
                isDarkMode 
                  ? 'text-white placeholder:text-white/40' 
                  : 'text-[#4A5759] placeholder:text-[#4A5759]/40'
              }`}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="p-2.5 bg-[#EDAFB8] rounded-full transition-all duration-300 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E19AA5]"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}