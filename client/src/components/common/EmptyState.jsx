import React from 'react';
import { Ghost } from 'lucide-react';
import Button from './Button';

const EmptyState = ({ 
  title = "Nothing to see here", 
  description = "No data was found for this section.", 
  icon: Icon = Ghost, 
  actionLabel, 
  onAction,
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-12 bg-white rounded-[2rem] border-2 border-dashed border-slate-200 ${className}`}>
      <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon size={40} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 font-medium max-w-sm mb-8 leading-relaxed">
        {description}
      </p>
      {actionLabel && (
        <Button variant="primary" onClick={onAction} className="px-8">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
