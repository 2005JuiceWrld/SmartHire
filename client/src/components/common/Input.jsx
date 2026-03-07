import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({ 
  label, 
  error, 
  icon: Icon, 
  className = '', 
  type = 'text',
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-slate-700 block">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors duration-200">
            <Icon size={16} />
          </div>
        )}
        <input 
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={`w-full ${Icon ? 'pl-9' : 'px-3'} ${isPassword ? 'pr-10' : 'pr-3'} py-2 bg-white border ${error ? 'border-red-300 focus:ring-red-100 focus:border-red-400' : 'border-slate-200 focus:ring-blue-100 focus:border-blue-600'} rounded-md outline-none transition-colors duration-150 placeholder:text-slate-400 text-slate-700 text-sm focus:ring-2`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs font-medium text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
