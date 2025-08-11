import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  return (
    <div className={`animate-spin rounded-full border-b-2 border-violet-500 ${sizes[size]} ${className}`}></div>
  );
};

export const LoadingCard = () => (
  <div className="card-glass animate-pulse">
    <div className="w-full h-48 bg-slate-700 rounded-xl mb-4"></div>
    <div className="space-y-3">
      <div className="h-6 bg-slate-700 rounded w-3/4"></div>
      <div className="h-4 bg-slate-700 rounded w-full"></div>
      <div className="h-4 bg-slate-700 rounded w-2/3"></div>
      <div className="flex space-x-2">
        <div className="h-10 bg-slate-700 rounded flex-1"></div>
        <div className="h-10 bg-slate-700 rounded flex-1"></div>
      </div>
    </div>
  </div>
);

export const LoadingTable = ({ rows = 5, cols = 4 }) => (
  <div className="space-y-4">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="glass-dark rounded-xl p-4 animate-pulse">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-6 bg-slate-700 rounded"></div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default LoadingSpinner;