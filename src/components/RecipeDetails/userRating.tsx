import { UserRating } from '@/types/recipes';
import React, { Dispatch, SetStateAction } from 'react';

const RatingStars: React.FC<{
  setRating: Dispatch<SetStateAction<number | null>>;
  userRating: UserRating | null;
}> = ({ userRating, setRating }) => {
  // Fallback state for rating in case it's not provided
  const [rating, setRating] = React.useState(userRating?.rating || 0);

  return (
    <div className="mt-4">
      {userRating ? (
        // Show colored stars based on userRating
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-2xl ${
                star <= Number(userRating.rating)
                  ? 'text-yellow-500'
                  : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>
      ) : (
        // Show stars for interactive rating
        <>
          <h4 className="text-lg font-semibold mb-2">Rate This Recipe</h4>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => {
                  setRating(star);
                  setRating(star); // Pass the rating value to the parent handler
                }}
                className={`text-2xl ${
                  star <= Number(rating) ? 'text-yellow-500' : 'text-gray-300'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RatingStars;
