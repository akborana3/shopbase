import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CartItem from '../components/cart/CartItem';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';
import { formatPrice } from '../utils/formatPrice';
import { useAuth } from '../hooks/useAuth';

export default function Cart() {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { user } = useAuth();

  const handleWhatsAppCheckout = () => {
    const message = generateWhatsAppMessage(items, user?.name);
    openWhatsApp(message);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShoppingBag className="h-16 w-16 text-gray-400" />
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="text-gray-600">Add items to your cart to see them here</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full bg-green-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Checkout via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}