
import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, toggleDarkMode, className = '' }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className={`
        relative overflow-hidden p-2 border-2 border-black dark:border-white 
        bg-white dark:bg-black 
        hover:bg-gray-100 dark:hover:bg-gray-800 
        transition-all duration-300 brutal-shadow-sm 
        w-10 h-10 flex items-center justify-center 
        active:scale-90 active:rotate-12
        group ${className}
      `}
      aria-label="Toggle Dark Mode"
    >
      <div className="relative w-6 h-6 flex items-center justify-center pointer-events-none">
        {/* Sun Icon (Visible when Light Mode is Active -> "Siang hari matahari") */}
        <Sun 
          size={22} 
          className={`
            absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            text-black dark:text-white
            ${!darkMode ? 'rotate-0 scale-100 opacity-100' : 'rotate-[180deg] scale-0 opacity-0'}
          `} 
        />
        
        {/* Moon Icon (Visible when Dark Mode is Active -> "Malam hari bulan") */}
        <Moon 
          size={22} 
          className={`
            absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            text-black dark:text-white
            ${darkMode ? 'rotate-0 scale-100 opacity-100' : 'rotate-[-180deg] scale-0 opacity-0'}
          `} 
        />
      </div>
    </button>
  );
};
