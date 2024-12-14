import React from 'react';
import { Search } from 'lucide-react';

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function ProductSearch({ value, onChange, placeholder = "Search products..." }: ProductSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
      />
    </div>
  );
}