import React from 'react';

const Island = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-[2rem] border border-slate-300 shadow-sm p-8 min-h-[calc(100vh-160px)] ${className}`}>
      {children}
    </div>
  );
};

export default Island;
