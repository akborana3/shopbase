import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <ShoppingBag className="mx-auto h-12 w-12 text-blue-600" />
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}