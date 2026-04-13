import React from 'react';

interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  fullWidth?: boolean;
}

export const BrutalButton: React.FC<BrutalButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseClasses = "font-bold py-3 px-6 text-black border-2 border-black dark:border-white transition-all brutal-shadow active:translate-x-[2px] active:translate-y-[2px] active:shadow-none uppercase tracking-wider font-mono";
  
  const variants = {
    primary: "bg-[#3B82F6] text-white hover:bg-blue-400",
    secondary: "bg-[#EBF400] text-black hover:bg-yellow-300",
    danger: "bg-[#FF4D4D] text-white hover:bg-red-400",
    outline: "bg-white hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-gray-900"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};