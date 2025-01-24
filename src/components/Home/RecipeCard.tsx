import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // For routing
import { Recipe } from '@/types/recipes'; // Define types for recipe

/**
 * RecipeCard Component
 * A component that displays a single recipe card with an image, title, rating, and reviews.
 * This card is clickable and routes to the details page of the recipe.
 */
const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md overflow-hidden">
      {/* Recipe Card Link - Makes the entire card clickable */}
      <Link href={`/recipes/${recipe._id}`} passHref>
        <div className="block">
          {/* Recipe Image */}
          <div className="h-60 relative">
            <Image
              src={recipe.image || 'https://via.placeholder.com/300x200'}
              alt={recipe.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          {/* Recipe Details */}
          <div className="p-4">
            {recipe.starsCount === 0 ? (
              <h5 className="text-base font-semibold text-gray-800 text-center">
                Be the first to review!
              </h5>
            ) : (
              <div className="text-base font-semibold text-gray-800 text-center">
                {`${recipe.starsCount} Reviews / ${recipe.averageStars.toFixed(1)} Average`}
              </div>
            )}
            <h4 className="text-xl font-bold text-gray-800 text-center">
              {recipe.title}
            </h4>
            {/* Dynamic Stars */}
            <div className="flex justify-center items-center mt-2">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={
                    index < Math.round(recipe.averageStars)
                      ? '#FFD700'
                      : '#E5E7EB'
                  }
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.004 6.14h6.462c.969 0 1.371 1.24.588 1.81l-5.227 3.794 2.004 6.141c.3.921-.755 1.688-1.54 1.114L12 17.011l-5.227 3.795c-.784.574-1.838-.193-1.539-1.114l2.004-6.141-5.227-3.794c-.784-.57-.381-1.81.588-1.81h6.462l2.004-6.14z"
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
