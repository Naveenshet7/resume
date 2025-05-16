import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  maxLength?: number;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  error = '',
  type = 'text',
  maxLength,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1 dark:text-gray-200"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          rows={4}
          required={required}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          required={required}
        />
      )}
      {maxLength && value && (
        <div className="text-xs text-gray-500 mt-1 dark:text-gray-400">
          {value.length}/{maxLength} characters
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;