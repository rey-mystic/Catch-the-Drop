import React from 'react';
import { Airdrop, Language } from '../types';
import { BrutalButton } from './BrutalButton';
import { ArrowUpRight, ShieldAlert, Zap, Layers } from 'lucide-react';

interface AirdropCardProps {
  data: Airdrop;
  onAnalyze: (name: string) => void;
  onDetails?: (drop: Airdrop) => void;
  language?: Language;
}

export const AirdropCard: React.FC<AirdropCardProps> = ({ data, onAnalyze, onDetails, language = 'en' }) => {
  const isId = language === 'id';

  const t = {
    difficulty: isId ? "KESULITAN" : "DIFFICULTY",
    value: isId ? "POTENSI" : "VALUE",
    analyze: isId ? "ANALISA DENGAN AI" : "ANALYZE WITH AI",
    start: isId ? "MULAI MENANGKAP" : "START CATCHING"
  };

  const displayDifficulty = isId ? {
    'Low': 'Mudah',
    'Medium': 'Sedang',
    'High': 'Tinggi',
    'Hard': 'Sulit',
    'Very Hard': 'Sangat Sulit'
  }[data.difficulty] || data.difficulty : data.difficulty;

  const displayStatus = isId ? {
      'Live': 'Live', 
      'Upcoming': 'Mendatang',
      'Rumored': 'Rumor',
      'Ended': 'Berakhir'
  }[data.status] || data.status : data.status;

  return (
    <div className="bg-white dark:bg-gray-900 border-2 border-black dark:border-white p-4 flex flex-col h-full brutal-shadow group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors relative overflow-hidden text-black dark:text-white">
      {/* Decorative background shape */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full border-2 border-black dark:border-white opacity-0 group-hover:opacity-20 transition-opacity"></div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
            <img 
              src={data.imageUrl} 
              alt={data.name} 
              className="w-full h-full object-contain grayscale contrast-125 group-hover:grayscale-0 transition-all"
            />
          </div>
          <div>
            <h3 className="font-bold text-xl uppercase tracking-tight">{data.name}</h3>
            <div className="flex items-center gap-1 text-xs font-mono bg-black dark:bg-white text-white dark:text-black px-1 w-max">
              <span>{data.type}</span>
            </div>
          </div>
        </div>
        <div className={`
          border-2 border-black dark:border-white px-2 py-1 text-xs font-bold uppercase
          ${
            data.status === 'Live' ? 'bg-[#FF1F4B] text-white' : 
            data.status === 'Rumored' ? 'bg-[#7AB6FF] text-black' :
            data.status === 'Upcoming' ? 'bg-[#D7FF00] text-black' : 
            'bg-gray-300 dark:bg-gray-600 text-black dark:text-white'
          }
        `}>
          {displayStatus}
        </div>
      </div>

      <div className="flex-grow relative z-10">
        <p className="text-sm font-medium mb-4 line-clamp-2 border-l-2 border-gray-300 dark:border-gray-600 pl-2">
          {data.description}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-white p-2 flex flex-col items-center justify-center">
            <ShieldAlert size={16} className="mb-1 text-gray-700 dark:text-gray-300" />
            <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">{t.difficulty}</span>
            <span className="font-bold">{displayDifficulty}</span>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-white p-2 flex flex-col items-center justify-center">
            <Zap size={16} className="mb-1 text-gray-700 dark:text-gray-300" />
            <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">{t.value}</span>
            <span className="font-bold">{data.potential}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
            <Layers size={14} />
            <span className="text-xs font-mono uppercase">{data.chain}</span>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2 relative z-10">
        <BrutalButton variant="outline" className="py-2 text-sm" onClick={() => onAnalyze(data.name)}>
          {t.analyze}
        </BrutalButton>
        <BrutalButton 
          variant="primary" 
          className="py-2 text-sm flex items-center justify-center gap-2 group-hover:bg-[#2563EB] group-hover:text-white transition-colors dark:border-white"
          onClick={() => onDetails && onDetails(data)}
        >
          {t.start} <ArrowUpRight size={18} />
        </BrutalButton>
      </div>
    </div>
  );
};
