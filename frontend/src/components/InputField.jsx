import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

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
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full mb-4">
      {label && (
        <label htmlFor={id || name} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label} {required && <span className="text-rose-500">*</span>}
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
          className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors duration-200 outline-none
            ${
              error
                ? 'border-rose-400 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                : 'border-slate-300 bg-white text-slate-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
            }
            ${disabled ? 'bg-slate-100 cursor-not-allowed text-slate-400' : ''}
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

      {error && <p className="mt-1 text-xs text-rose-600 font-medium animate-fade-in">{error}</p>}
    </div>
  );
};

export default InputField;
