import React from 'react';

interface ProductSpecificationsProps {
  specifications: Record<string, string>;
}

export default function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Specifications</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(specifications).map(([key, value]) => (
          <div key={key} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm opacity-75">{key}</p>
            <p className="font-medium">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}