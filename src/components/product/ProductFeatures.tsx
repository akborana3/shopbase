import React from 'react';
import { Truck, Shield, RotateCcw } from 'lucide-react';

export default function ProductFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-y">
      <div className="flex items-center gap-2">
        <Truck className="h-5 w-5 text-green-500" />
        <span className="text-sm">Free Delivery</span>
      </div>
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-blue-500" />
        <span className="text-sm">1 Year Warranty</span>
      </div>
      <div className="flex items-center gap-2">
        <RotateCcw className="h-5 w-5 text-orange-500" />
        <span className="text-sm">10 Days Return</span>
      </div>
    </div>
  );
}