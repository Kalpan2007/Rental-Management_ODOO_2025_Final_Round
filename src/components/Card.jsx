import React from 'react';
import { clsx } from 'clsx';

const Card = ({ 
  children, 
  variant = 'glass', 
  padding = 'default',
  hover = true,
  className,
  ...props 
}) => {
  const variants = {
    glass: 'glass-dark',
    neomorphism: 'neomorphism',
    solid: 'bg-slate-800 border border-slate-700'
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };

  return (
    <div
      className={clsx(
        'rounded-2xl',
        variants[variant],
        paddings[padding],
        hover && 'hover-lift',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;