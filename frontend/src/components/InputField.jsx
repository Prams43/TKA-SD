import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

/**
 * Komponen Input serbaguna dengan label, validasi error, dan tombol intip password
 */
const InputField = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  showPasswordToggle = false,
  disabled = false,
  autoComplete,
  ...restProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full mb-4">
      {label && (
        <label
          htmlFor={id || name}
          className={`block text-sm font-medium mb-1.5 transition-colors duration-200 ${
            error ? 'text-red-600 font-semibold' : 'text-slate-700'
          }`}
        >
          {label} {required && <span className={error ? 'text-red-600' : 'text-rose-500'}>*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={id || name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          {...restProps}
          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors outline-none
            ${
              error
                ? 'border-[#C93B3B] bg-white text-[#C93B3B] placeholder-red-300 focus:border-[#C93B3B] focus:ring-1 focus:ring-[#C93B3B]'
                : 'border-[#E6DFD5] bg-white text-[#261C14] placeholder-[#A89F95] focus:border-[#C25E38] focus:ring-1 focus:ring-[#C25E38]'
            }
            ${disabled ? 'bg-[#F2ECE4] cursor-not-allowed text-[#A89F95]' : ''}
            ${showPasswordToggle ? 'pr-11' : ''}
          `}
        />

        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
            aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1.5 animate-fade-in">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-red-500" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default InputField;
