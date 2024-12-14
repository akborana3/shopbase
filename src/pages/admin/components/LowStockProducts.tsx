import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../types';

interface LowStockProductsProps {
  products: Product[];
}

export default function LowStockProducts({ products }: LowStockProductsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Low Stock Products</h2>
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between py-2 border-b"
          >
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Only {product.stock} units left
              </p>
            </div>
            <Link
              to={`/admin/products/${product.id}`}
              className="text-blue-600 hover:text-blue-700"
            >
              Manage
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}