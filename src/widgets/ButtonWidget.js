import React from 'react';

export const ButtonWidget = ({ children, onClick, className = '', type = 'button', disabled = false, ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-medium px-4 py-2.5 rounded ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
