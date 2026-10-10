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
    'inline-flex items-center justify-center font-medium rounded-lg text-sm px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1';

  const variants = {
    primary:
      'bg-[#0B1A34] hover:bg-[#1E3A8A] text-white border border-[#1E3A8A] focus:ring-[#1E3A8A]/30 disabled:bg-[#1E293B] shadow-sm active:scale-[0.99]',
    secondary:
      'bg-blue-50/80 hover:bg-blue-100/90 text-[#0B1A34] border-2 border-[#1E3A8A]/30 hover:border-[#1E3A8A] focus:ring-[#1E3A8A]/20 disabled:bg-slate-50 disabled:text-slate-400 font-semibold shadow-xs active:scale-[0.99]',
    danger:
      'bg-[#C93B3B] hover:bg-[#B32D2D] text-white focus:ring-[#C93B3B]/30 disabled:bg-[#FCD8D8]',
    outline:
      'border-2 border-[#1E3A8A] hover:bg-blue-50 text-[#1E3A8A] focus:ring-[#1E3A8A]/20 disabled:opacity-50 font-semibold',
    sage:
      'bg-[#286657] hover:bg-[#1E5044] text-white focus:ring-[#286657]/30 disabled:bg-[#C5DDD6]',
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
        ${isDisabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}
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
