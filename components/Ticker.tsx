import React from 'react';
import { MARQUEE_TEXT } from '../constants';

export const Ticker: React.FC = () => {
  return (
    <div className="bg-black text-[#EBF400] overflow-hidden border-y-2 border-black dark:border-white py-2 font-mono font-bold text-lg select-none relative z-20">
      <div className="whitespace-nowrap animate-marquee inline-block">
        <span>{MARQUEE_TEXT.repeat(10)}</span>
      </div>
    </div>
  );
};