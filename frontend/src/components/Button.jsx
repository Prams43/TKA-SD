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
      'bg-[#C25E38] hover:bg-[#A94D2B] text-white focus:ring-[#C25E38]/30 disabled:bg-[#F5D7CC]',
    secondary:
      'bg-[#F2ECE4] hover:bg-[#EAE2D8] text-[#261C14] border border-[#E6DFD5] focus:ring-[#C25E38]/20 disabled:bg-[#FAF7F2] disabled:text-[#A89F95]',
    danger:
      'bg-[#C93B3B] hover:bg-[#B32D2D] text-white focus:ring-[#C93B3B]/30 disabled:bg-[#FCD8D8]',
    outline:
      'border border-[#E6DFD5] hover:bg-[#FAF7F2] text-[#261C14] focus:ring-[#C25E38]/20 disabled:opacity-50',
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
