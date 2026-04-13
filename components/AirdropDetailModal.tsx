
import React from 'react';
import { Airdrop, Language } from '../types';
import { BrutalButton } from './BrutalButton';
import { X, ShieldAlert, Zap, Layers, ExternalLink, CheckSquare, TrendingUp, Flame } from 'lucide-react';

interface AirdropDetailModalProps {
  data: Airdrop;
  onClose: () => void;
  language?: Language;
}

// Helper component to render the strategy text nicely
const StrategyRenderer: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  const sections: { type: 'intro' | 'step' | 'fire'; title: string; content: string[] }[] = [];
  
  let currentSection: { type: 'intro' | 'step' | 'fire'; title: string; content: string[] } | null = null;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Detect Step Header (e.g., "1) ...")
    if (/^\d+\)/.test(trimmed)) {
      if (currentSection) sections.push(currentSection);
      currentSection = { type: 'step', title: trimmed, content: [] };
    } 
    // Detect Fire Section (e.g., "🔥 ...")
    else if (trimmed.startsWith('🔥')) {
      if (currentSection) sections.push(currentSection);
      currentSection = { type: 'fire', title: trimmed, content: [] };
    }
    // Content or Intro
    else {
      if (!currentSection) {
        // Initial intro text
        if (!sections.length) {
            currentSection = { type: 'intro', title: '', content: [] };
        } else {
             // Fallback if weird structure
             currentSection = sections[sections.length - 1];
        }
      }
      
      // If it's the very first line of intro, treat as title
      if (currentSection.type === 'intro' && !currentSection.title) {
          currentSection.title = trimmed;
      } else {
          currentSection.content.push(trimmed);
      }
    }
  });
  
  // Push the last section
  if (currentSection) sections.push(currentSection);

  return (
    <div className="space-y-8 mt-6">
      {sections.map((section, idx) => {
        if (section.type === 'intro') {
            return (
                <div key={idx} className="bg-black text-white p-4 border-2 border-black dark:border-white transform -rotate-1 shadow-[4px_4px_0px_0px_#EBF400]">
                    <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#EBF400] text-center">{section.title}</h4>
                    {section.content.map((l, i) => <p key={i} className="font-mono text-sm text-center text-gray-300 mt-2">{l}</p>)}
                </div>
            );
        }

        if (section.type === 'fire') {
            return (
                <div key={idx} className="border-4 border-[#FF4D4D] bg-red-50 dark:bg-red-900/20 p-6 relative overflow-hidden animate-pulse-slow">
                     <div className="absolute -right-4 -top-4 text-[#FF4D4D] opacity-20 transform rotate-12">
                        <Flame size={100} />
                     </div>
                     <h4 className="text-xl font-black uppercase text-[#FF4D4D] mb-4 flex items-center gap-2 relative z-10 bg-white dark:bg-black w-fit px-2 border-2 border-[#FF4D4D]">
                        {section.title}
                     </h4>
                     <ul className="space-y-2 relative z-10">
                        {section.content.map((l, i) => (
                            <li key={i} className="font-mono font-bold text-sm md:text-base flex items-start gap-2">
                                <span className="text-[#FF4D4D] mt-1">➤</span> {l}
                            </li>
                        ))}
                     </ul>
                </div>
            );
        }

        // Standard Steps
        const stepNumber = section.title.match(/^(\d+)\)/)?.[1] || (idx).toString();
        const cleanTitle = section.title.replace(/^\d+\)\s*/, '');

        return (
            <div key={idx} className="relative pl-4 md:pl-0">
                {/* Visual Connector Line */}
                {idx < sections.length - 1 && (
                    <div className="absolute left-[19px] md:left-[-20px] top-10 bottom-[-40px] w-1 bg-gray-300 dark:bg-gray-700 hidden md:block"></div>
                )}

                <div className="bg-white dark:bg-[#1a1a1a] border-2 border-black dark:border-white p-5 md:p-6 brutal-shadow-sm group hover:translate-x-1 transition-transform">
                    {/* Big Number Sticker */}
                    <div className="absolute -left-3 -top-3 md:-left-6 md:-top-4 w-10 h-10 md:w-14 md:h-14 bg-[#EBF400] border-2 border-black flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10">
                        <span className="font-black text-xl md:text-2xl text-black">#{stepNumber.padStart(2, '0')}</span>
                    </div>

                    <h4 className="text-lg md:text-xl font-black uppercase mb-4 ml-4 md:ml-6 text-black dark:text-white leading-tight">
                        {cleanTitle}
                    </h4>

                    <div className="space-y-3 font-mono text-sm md:text-base text-gray-800 dark:text-gray-300">
                        {section.content.map((line, i) => {
                            // Sub-headers (1. Something)
                            if (/^\d+\./.test(line)) {
                                return <div key={i} className="font-bold text-[#3B82F6] mt-3 uppercase border-b-2 border-gray-200 dark:border-gray-700 inline-block">{line}</div>;
                            }
                            // Formulas (Contains =)
                            if (line.includes('=')) {
                                return (
                                    <div key={i} className="bg-black text-[#EBF400] p-2 border-l-4 border-[#3B82F6] font-bold text-xs md:text-sm my-1 overflow-x-auto">
                                        <code>{line}</code>
                                    </div>
                                )
                            }
                            return <p key={i} className="leading-relaxed">{line}</p>;
                        })}
                    </div>
                </div>
            </div>
        );
      })}
    </div>
  );
};

export const AirdropDetailModal: React.FC<AirdropDetailModalProps> = ({ data, onClose, language = 'en' }) => {
  const t = {
      chain: language === 'id' ? "Chain" : "Chain",
      difficulty: language === 'id' ? "Kesulitan" : "Difficulty",
      potential: language === 'id' ? "Potensi" : "Potential",
      about: language === 'id' ? "Tentang Proyek" : "About Project",
      analysis: language === 'id' ? "Analisis Potensi" : "Potential Analysis",
      tasks: language === 'id' ? "Tugas Dilakukan" : "Tasks To Do",
      strategy: language === 'id' ? "Strategi" : "Strategy",
      maximizing: language === 'id' ? "Memaksimalkan" : "Maximizing",
      visit: language === 'id' ? "Kunjungi Website" : "Visit Website",
      close: language === 'id' ? "Tutup Detail" : "Close Details"
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white dark:bg-[#121212] w-full max-w-3xl max-h-[90vh] overflow-y-auto border-4 border-black dark:border-white brutal-shadow relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#EBF400] border-b-4 border-black dark:border-white p-4 flex justify-between items-start sticky top-0 z-20 shadow-md">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center overflow-hidden shrink-0">
                 <img src={data.imageUrl} alt={data.name} className="w-full h-full object-contain" />
              </div>
              <div>
                 <h2 className="text-2xl md:text-4xl font-black uppercase text-black leading-none">{data.name}</h2>
                 <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="bg-black text-white px-2 py-0.5 text-xs font-mono font-bold uppercase">{data.type}</span>
                    <span className={`px-2 py-0.5 text-xs font-bold uppercase border border-black ${
                        data.status === 'Live' ? 'bg-[#FF1F4B] text-white' : 
                        data.status === 'Rumored' ? 'bg-[#7AB6FF] text-black' :
                        data.status === 'Upcoming' ? 'bg-[#D7FF00] text-black' :
                        'bg-white text-black'
                    }`}>
                        {data.status}
                    </span>
                 </div>
              </div>
           </div>
           <button 
             onClick={onClose} 
             className="p-2 border-2 transition-colors bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
           >
              <X size={24} />
           </button>
        </div>

        <div className="p-6 md:p-8 space-y-8 text-black dark:text-white">
           
           {/* Stats Grid */}
           <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div className="border-2 border-black dark:border-white p-2 md:p-3 text-center bg-gray-50 dark:bg-gray-800 brutal-shadow-sm">
                 <div className="flex justify-center mb-1 text-gray-500"><Layers size={20} /></div>
                 <div className="text-[10px] md:text-xs uppercase font-bold text-gray-500">{t.chain}</div>
                 <div className="font-mono font-bold text-xs md:text-base truncate">{data.chain}</div>
              </div>
              <div className="border-2 border-black dark:border-white p-2 md:p-3 text-center bg-gray-50 dark:bg-gray-800 brutal-shadow-sm">
                 <div className="flex justify-center mb-1 text-gray-500"><ShieldAlert size={20} /></div>
                 <div className="text-[10px] md:text-xs uppercase font-bold text-gray-500">{t.difficulty}</div>
                 <div className="font-mono font-bold text-xs md:text-base">{data.difficulty}</div>
              </div>
              <div className="border-2 border-black dark:border-white p-2 md:p-3 text-center bg-gray-50 dark:bg-gray-800 brutal-shadow-sm">
                 <div className="flex justify-center mb-1 text-gray-500"><Zap size={20} /></div>
                 <div className="text-[10px] md:text-xs uppercase font-bold text-gray-500">{t.potential}</div>
                 <div className="font-mono font-bold text-xs md:text-base">{data.potential}</div>
              </div>
           </div>

           {/* About Section */}
           <div className="space-y-4">
              <h3 className="text-2xl font-black uppercase border-b-4 border-black dark:border-white inline-block">{t.about}</h3>
              <p className="font-mono text-sm md:text-base leading-relaxed text-gray-800 dark:text-gray-300">
                 {data.about || data.description}
              </p>
           </div>

           {/* Potential Analysis */}
           {data.potentialAnalysis && (
             <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase inline-block flex items-center gap-2">
                   <div className="bg-[#EBF400] p-1 border-2 border-black"><Zap size={20} className="text-black fill-current" /></div>
                   {t.analysis}
                </h3>
                <p className="font-mono text-sm md:text-base leading-relaxed text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 p-5 border-l-8 border-[#EBF400]">
                   {data.potentialAnalysis}
                </p>
             </div>
           )}

           {/* Tasks */}
           <div className="space-y-4">
              <h3 className="text-2xl font-black uppercase inline-block flex items-center gap-2">
                 <div className="bg-[#3B82F6] p-1 border-2 border-black"><CheckSquare size={20} className="text-white" /></div>
                 {t.tasks}
              </h3>
              <div className="space-y-3">
                 {data.tasks.map((task, i) => (
                    <div key={i} className="flex gap-4 p-4 border-2 border-black dark:border-white bg-white dark:bg-gray-800 hover:translate-x-1 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                       <div className="shrink-0 w-8 h-8 bg-black dark:bg-white text-white dark:text-black font-black flex items-center justify-center border-2 border-white dark:border-black">
                          {i + 1}
                       </div>
                       <p className="font-mono text-sm md:text-base font-medium">{task}</p>
                    </div>
                 ))}
              </div>
           </div>

           {/* Strategy Guide (Custom Renderer) */}
           {data.strategyGuide && (
             <div className="pt-8 border-t-4 border-black dark:border-white">
                <div className="flex items-center gap-3 mb-2">
                     <TrendingUp strokeWidth={4} className="w-8 h-8 md:w-10 md:h-10 text-[#3B82F6]" />
                     <h3 className="text-3xl md:text-4xl font-black uppercase leading-none">
                        {t.maximizing}<br/><span className="text-[#3B82F6]">{t.strategy}</span>
                     </h3>
                </div>
                <div className="w-full h-2 bg-black dark:bg-white mb-6"></div>
                
                {/* Render the text nicely */}
                <StrategyRenderer text={data.strategyGuide} />
             </div>
           )}

           {/* Action Buttons */}
           <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <BrutalButton 
                fullWidth 
                variant="primary" 
                className="flex items-center justify-center gap-2 text-lg"
                onClick={() => {
                    if (data.websiteUrl) {
                        window.open(data.websiteUrl, '_blank', 'noopener,noreferrer');
                    }
                }}
                disabled={!data.websiteUrl}
              >
                 {t.visit} <ExternalLink size={20} />
              </BrutalButton>
              <BrutalButton fullWidth variant="outline" onClick={onClose} className="text-lg">
                 {t.close}
              </BrutalButton>
           </div>

        </div>
      </div>
    </div>
  );
};
