import React from 'react';

const Badge = ({ 
  children, 
  variant = 'neutral', 
  className = '', 
  dot = false 
}) => {
  const variants = {
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-blue-50 text-blue-700 border-blue-200',
    success: 'bg-slate-100 text-slate-700 border-slate-200',
    warning: 'bg-blue-50 text-blue-700 border-blue-100',
    danger: 'bg-red-50 text-red-700 border-red-100',
    purple: 'bg-blue-50 text-blue-700 border-blue-100',
  };

  const dotColors = {
    neutral: 'bg-slate-400',
    primary: 'bg-blue-500',
    success: 'bg-slate-500',
    warning: 'bg-blue-500',
    danger: 'bg-red-500',
    purple: 'bg-blue-500',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border transition-all duration-200 ${variants[variant]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`}></span>}
      {children}
    </span>
  );
};

export default Badge;
