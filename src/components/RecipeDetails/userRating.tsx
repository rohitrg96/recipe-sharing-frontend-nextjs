import { UserRating } from '@/types/recipes';
import { useState } from 'react';
// import React, { Dispatch, SetStateAction } from 'react';

const RatingStars: React.FC<{
  handleRate: (newRating: number) => void;
  userRating: UserRating | null;
}> = ({ userRating, handleRate }) => {
  // Fallback state for rating in case it's not provided
  const [rating, setRating] = useState(userRating?.rating || 0);

  return (
    <div className="mt-4">
      {userRating ? (
        // Show colored stars based on userRating
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-2xl  bg-black ${
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
                  setRating(star); // Update state with the clicked star value
                  handleRate(star); // Trigger parent function with the new rating
                }}
                className={`text-2xl bg-black  ${
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
