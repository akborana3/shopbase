import React from 'react';
import ProductCard from '../components/product/ProductCard';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

// Sample products data (in a real app, this would come from an API)
const products = [
  {
    id: '1',
    name: 'Wireless Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=500',
    category: 'Electronics',
    rating: 4.5,
    stock: 50
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=500',
    category: 'Electronics',
    rating: 4.3,
    stock: 30
  },
  {
    id: '3',
    name: 'Laptop Backpack',
    description: 'Waterproof laptop backpack with USB charging port',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=500',
    category: 'Accessories',
    rating: 4.7,
    stock: 100
  },
  {
    id: '4',
    name: 'Fitness Band',
    description: 'Advanced fitness tracker with heart rate monitoring',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?auto=format&fit=crop&q=80&w=500',
    category: 'Electronics',
    rating: 4.2,
    stock: 75
  }
];

export default function Home() {
  const { isDarkMode } = useSelector((state: RootState) => state.theme);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Featured Products
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}