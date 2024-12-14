import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
}

export default function StatsCard({ label, value, icon: Icon }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <Icon className="h-8 w-8 text-blue-600" />
      </div>
    </div>
  );
}