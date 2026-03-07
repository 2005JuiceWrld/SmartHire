import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon: Icon, 
  loading = false, 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-200',
    secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200 focus:ring-slate-200',
    outline: 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50/40 focus:ring-blue-200',
    ghost: 'text-slate-700 hover:bg-blue-50 hover:text-blue-700 focus:ring-blue-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-200',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-sm',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
      ) : Icon && <Icon size={size === 'sm' ? 16 : 18} className="mr-2" />}
      {children}
    </button>
  );
};

export default Button;
