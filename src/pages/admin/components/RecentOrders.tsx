import React from 'react';

interface Order {
  id: number;
  items: number;
  total: number;
  status: string;
}

interface RecentOrdersProps {
  orders: Order[];
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between py-2 border-b"
          >
            <div>
              <p className="font-medium">Order #{order.id}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {order.items} items • ₹{order.total}
              </p>
            </div>
            <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}