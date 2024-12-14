import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2 } from 'lucide-react';
import { Product } from '../../../types';

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export default function ProductTable({ products, onDelete }: ProductTableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {product.description.substring(0, 50)}...
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {product.category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">₹{product.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.stock > 10
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {product.stock} units
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <Link
                    to={`/admin/products/${product.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit2 className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}