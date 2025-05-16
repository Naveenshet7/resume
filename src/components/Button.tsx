import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type?: 'primary' | 'secondary' | 'danger' | 'success' | 'ai';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  icon,
  isLoading = false,
}) => {
  const baseClasses = 'flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const typeClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    ai: 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500',
  };
  
  const sizeClasses = {
    small: 'text-xs px-2 py-1 rounded',
    medium: 'text-sm px-4 py-2 rounded-md',
    large: 'text-base px-6 py-3 rounded-lg',
  };
  
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed pointer-events-none' 
    : 'cursor-pointer';

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${baseClasses} 
        ${typeClasses[type]} 
        ${sizeClasses[size]} 
        ${disabledClasses}
        ${className}
      `}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;