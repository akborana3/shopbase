import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlist } from '../../store/slices/userSlice';
import { useAuth } from '../../hooks/useAuth';
import { formatPrice } from '../../utils/formatPrice';
import ProductRating from './ProductRating';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const isWishlisted = user?.wishlist?.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(addToCart(product));
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(toggleWishlist(product.id));
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      onClick={handleProductClick}
      className="group rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
    >
      <div className="relative aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <Heart
            className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-sm mb-2 text-gray-600 dark:text-gray-300 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mb-3">
          <ProductRating rating={product.rating} />
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold">{formatPrice(product.price)}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>{isAuthenticated ? 'Add to Cart' : 'Login'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}