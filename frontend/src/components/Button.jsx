import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Komponen Tombol serbaguna dengan dukungan status loading dan varian tema
 */
const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  isLoading = false,
  loadingText = 'Memproses...',
  disabled = false,
  fullWidth = false,
  onClick,
  className = '',
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg text-sm px-4 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow focus:ring-blue-500 disabled:bg-blue-400',
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-700 focus:ring-slate-400 disabled:bg-slate-50',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-500 disabled:bg-rose-400',
    outline:
      'border border-slate-300 hover:bg-slate-50 text-slate-700 focus:ring-blue-500 disabled:opacity-50',
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'cursor-not-allowed opacity-80' : 'cursor-pointer active:scale-[0.99]'}
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
