import React from 'react';
import { useDispatch } from 'react-redux';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { updateQuantity, removeFromCart } from '../../store/slices/cartSlice';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm opacity-75">{item.description}</p>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="text-right">
        <p className="font-semibold">₹{item.price * item.quantity}</p>
        <p className="text-sm opacity-75">₹{item.price} each</p>
      </div>
    </div>
  );
}