
import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, X, Terminal, Sparkles } from 'lucide-react';
import { analyzeAirdrop } from '../services/geminiService';
import { ChatMessage, Language } from '../types';

interface GeminiScannerProps {
  initialQuery?: string;
  onClose?: () => void;
  language?: Language;
}

export const GeminiScanner: React.FC<GeminiScannerProps> = ({ initialQuery, onClose, language = 'en' }) => {
  const [query, setQuery] = useState(initialQuery || '');
  
  const initialMessageEN: ChatMessage = { 
    role: 'model', 
    text: "Hi there! I'm your AI Airdrop Assistant. \n\nI can help you analyze projects, explain how to complete tasks, or check if a strategy makes sense. \n\nWhat project are you looking into today?" 
  };

  const initialMessageID: ChatMessage = { 
    role: 'model', 
    text: "Halo! Saya Asisten Airdrop AI Anda. \n\nSaya bisa membantu menganalisis proyek, menjelaskan cara menyelesaikan tugas, atau memeriksa apakah strategi masuk akal. \n\nProyek apa yang ingin Anda cari tahu hari ini?" 
  };

  const [messages, setMessages] = useState<ChatMessage[]>([language === 'id' ? initialMessageID : initialMessageEN]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update messages if language changes (only if it's the initial state)
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'model') {
        setMessages([language === 'id' ? initialMessageID : initialMessageEN]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    if (initialQuery) {
        handleSend(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    setIsLoading(true);
    setQuery('');

    // Append language context to the prompt transparently
    const promptWithLang = language === 'id' 
        ? `${text} (Jawab dalam Bahasa Indonesia yang gaul tapi profesional)`
        : text;

    const response = await analyzeAirdrop(promptWithLang);
    
    setMessages([...newMessages, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(query);
    }
  };

  // Helper to format markdown-style text from Gemini
  const formatMessage = (text: string) => {
    // 1. Replace bullet points (* ) at start of lines with dots (• )
    let cleanText = text.replace(/^\* /gm, '• ');

    // 2. Split by Links [text](url) OR Bold **text**
    const parts = cleanText.split(/(\[.*?\]\(.*?\))|(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (!part) return null;

      // Handle Markdown Link: [Title](URL)
      if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
          const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
          if (match) {
              return (
                  <a 
                    key={index} 
                    href={match[2]} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#EBF400] underline hover:text-white break-all font-bold transition-colors"
                  >
                    {match[1]}
                  </a>
              );
          }
      }

      // Handle Bold: **Text**
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-extrabold">{part.slice(2, -2)}</strong>;
      }

      return part;
    });
  };

  const t = {
      title: language === 'id' ? "Asisten Gemini AI" : "Gemini AI Assistant",
      placeholder: language === 'id' ? "Tanya tentang proyek kripto (cth: 'Cara farm Base?')" : "Ask about a crypto project (e.g. 'How to farm Base?')",
      analyzing: language === 'id' ? "Mencari info terbaru..." : "Searching latest info...",
      powered: language === 'id' ? "Ditenagai oleh Google Gemini 2.5 Flash + Search" : "Powered by Google Gemini 2.5 Flash + Search"
  }

  return (
    <div className="bg-[#121212] border-2 border-black dark:border-white text-white h-full flex flex-col font-mono brutal-shadow relative">
       {/* Scanner Header */}
       <div className="bg-white dark:bg-black dark:text-white text-black p-3 border-b-2 border-black dark:border-white flex justify-between items-center">
         <div className="flex items-center gap-2">
            <Sparkles className="text-[#3B82F6]" size={20} />
            <span className="font-bold uppercase tracking-wider">{t.title}</span>
         </div>
         {onClose && (
           <button onClick={onClose} className="hover:bg-red-500 hover:text-white p-1 border-2 border-black dark:border-white transition-colors rounded-sm">
             <X size={20} />
           </button>
         )}
       </div>

       {/* Chat Area */}
       <div 
         ref={scrollRef}
         className="flex-grow p-4 overflow-y-auto space-y-4 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"
       >
         {messages.map((msg, idx) => (
           <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`
               max-w-[85%] p-4 border-2 shadow-sm
               ${msg.role === 'user' 
                 ? 'bg-[#EBF400] border-black text-black rounded-tl-xl rounded-bl-xl rounded-br-xl' 
                 : 'bg-[#3B82F6] border-white text-white rounded-tr-xl rounded-br-xl rounded-bl-xl'}
             `}>
               {msg.role === 'model' && <Terminal size={14} className="mb-2 opacity-70" />}
               <p className="whitespace-pre-wrap text-sm leading-relaxed font-medium">
                 {formatMessage(msg.text)}
               </p>
             </div>
           </div>
         ))}
         {isLoading && (
           <div className="flex justify-start">
             <div className="bg-gray-800 border-2 border-white text-white p-4 rounded-tr-xl rounded-br-xl rounded-bl-xl flex items-center gap-3">
                <Cpu className="animate-spin text-[#EBF400]" size={20} />
                <span className="text-sm font-bold animate-pulse">{t.analyzing}</span>
             </div>
           </div>
         )}
       </div>

       {/* Input Area */}
       <div className="p-4 bg-[#222] border-t-2 border-white">
         <div className="flex gap-2">
           <input
             type="text"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             onKeyDown={handleKeyDown}
             placeholder={t.placeholder}
             className="flex-grow bg-black border-2 border-white text-white p-3 focus:outline-none focus:border-[#3B82F6] placeholder-gray-500 font-medium rounded-sm"
           />
           <button 
             onClick={() => handleSend(query)}
             disabled={isLoading}
             className="bg-white text-black border-2 border-white p-3 hover:bg-[#3B82F6] hover:text-white transition-colors disabled:opacity-50 rounded-sm"
           >
             <Send size={20} />
           </button>
         </div>
         <div className="mt-2 text-[10px] text-gray-500 flex justify-between px-1">
           <span>{t.powered}</span>
           <span></span>
         </div>
       </div>
    </div>
  );
};
