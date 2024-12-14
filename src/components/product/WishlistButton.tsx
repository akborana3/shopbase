import React from 'react';
import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { toggleWishlist } from '../../store/slices/userSlice';

interface WishlistButtonProps {
  productId: string;
  className?: string;
}

export default function WishlistButton({ productId, className = '' }: WishlistButtonProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { token } = useSelector((state: RootState) => state.auth);
  const isWishlisted = currentUser?.wishlist?.includes(productId);

  const handleWishlist = () => {
    if (!token) {
      navigate('/login');
      return;
    }
    dispatch(toggleWishlist(productId));
  };

  return (
    <button
      onClick={handleWishlist}
      className={`p-2 rounded-full bg-white/80 hover:bg-white transition-colors ${className}`}
    >
      <Heart
        className={`h-6 w-6 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
      />
    </button>
  );
}