import React from 'react';
import Image from 'next/image';
import { RecipeCardsProps } from '@/types/recipes';

const RecipeCards: React.FC<RecipeCardsProps> = ({
  recipes,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage.toString()); // Trigger parent callback
    }
  };

  return (
    <section className="bg-white p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Recipes
      </h2>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-gray-50 border border-gray-200 rounded-lg shadow-md overflow-hidden"
          >
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
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center space-x-2">
        <button
          onClick={() => handlePageChange(Number(currentPage) - 1)}
          disabled={Number(currentPage) === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-md ${
              Number(currentPage) === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(Number(currentPage) + 1)}
          disabled={Number(currentPage) === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default RecipeCards;
