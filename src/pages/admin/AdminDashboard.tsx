import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Users, ShoppingBag, BarChart2 } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Products', value: '24', icon: Package },
    { label: 'Total Users', value: '156', icon: Users },
    { label: 'Total Orders', value: '89', icon: ShoppingBag },
    { label: 'Total Revenue', value: '₹45,678', icon: BarChart2 },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link
          to="/admin/products"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Manage Products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <Icon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((order) => (
              <div
                key={order}
                className="flex items-center justify-between py-2 border-b"
              >
                <div>
                  <p className="font-medium">Order #{order}234</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    2 items • ₹1,299
                  </p>
                </div>
                <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Low Stock Products</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((product) => (
              <div
                key={product}
                className="flex items-center justify-between py-2 border-b"
              >
                <div>
                  <p className="font-medium">Product {product}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Only {product} units left
                  </p>
                </div>
                <Link
                  to={`/admin/products/${product}`}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Manage
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}