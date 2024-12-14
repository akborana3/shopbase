import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function FormInput({ label, error, ...props }: FormInputProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        className={`appearance-none relative block w-full px-3 py-2 border ${
          error ? 'border-red-300' : 'border-gray-300'
        } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}