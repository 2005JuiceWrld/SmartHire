import React from 'react';

const Card = ({ children, className = "", noPadding = false }) => {
  return (
    <div className={`bg-white rounded-md border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.08)] ${noPadding ? '' : 'p-5'} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
