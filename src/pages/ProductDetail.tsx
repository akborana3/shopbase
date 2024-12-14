import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShoppingCart, Share2, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { addToCart } from '../store/slices/cartSlice';
import { products } from '../data/products';
import ProductRating from '../components/product/ProductRating';
import ProductFeatures from '../components/product/ProductFeatures';
import ProductSpecifications from '../components/product/ProductSpecifications';
import WishlistButton from '../components/product/WishlistButton';
import { useAuth } from '../hooks/useAuth';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(addToCart(product));
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  // Mock images array (in real app, this would come from API)
  const productImages = [
    product.image,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500',
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  };

  const previousImage = () => {
    setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <WishlistButton 
              productId={product.id} 
              className="absolute top-4 right-4"
            />
            <button
              onClick={handleShare}
              className="absolute top-4 left-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-600"
            >
              <Share2 className="h-5 w-5" />
            </button>
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={previousImage}
                className="p-2 rounded-r-lg bg-white/80 hover:bg-white text-gray-600"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={nextImage}
                className="p-2 rounded-l-lg bg-white/80 hover:bg-white text-gray-600"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-blue-500">
                Top Rated Product
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-lg mb-4 text-gray-600 dark:text-gray-300">
              {product.description}
            </p>
            <div className="flex items-center gap-4">
              <ProductRating rating={product.rating} />
              <span className="text-sm text-gray-500">
                ({Math.floor(Math.random() * 1000)} reviews)
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
              <span className="text-green-500 font-medium">
                {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
              </span>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                {isAuthenticated ? (product.stock > 0 ? 'Add to Cart' : 'Out of Stock') : 'Login to Buy'}
              </button>
            </div>
          </div>

          <ProductFeatures />

          {/* User Rating Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Rate this product</h3>
            <ProductRating
              rating={0}
              showText={false}
              interactive={true}
              onRate={(rating) => {
                if (!isAuthenticated) {
                  navigate('/login');
                  return;
                }
                console.log('Rated:', rating);
              }}
            />
          </div>

          {/* Features */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.features?.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          {product.specifications && (
            <ProductSpecifications specifications={product.specifications} />
          )}
        </div>
      </div>
    </div>
  );
}