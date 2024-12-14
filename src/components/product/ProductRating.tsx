import React from 'react';
import { Star } from 'lucide-react';

interface ProductRatingProps {
  rating: number;
  showText?: boolean;
  onRate?: (rating: number) => void;
  interactive?: boolean;
}

export default function ProductRating({ rating, showText = true, onRate, interactive = false }: ProductRatingProps) {
  const [hoverRating, setHoverRating] = React.useState(0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => {
          const starValue = i + 1;
          const filled = interactive 
            ? (hoverRating || rating) >= starValue
            : rating >= starValue;

          return (
            <Star
              key={i}
              className={`h-5 w-5 ${
                filled
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              } ${interactive ? 'cursor-pointer transition-colors' : ''}`}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
              onMouseLeave={() => interactive && setHoverRating(0)}
              onClick={() => interactive && onRate?.(starValue)}
            />
          );
        })}
      </div>
      {showText && (
        <span className="text-sm opacity-75">
          ({rating.toFixed(1)} rating)
        </span>
      )}
    </div>
  );
}