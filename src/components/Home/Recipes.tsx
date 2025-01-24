import React from 'react';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import { RecipeCardsProps } from '@/types/recipes';

/**
 * RecipeCards Container Component
 * This component maps over recipes and displays individual RecipeCard components.
 * It also includes pagination controls.
 */
const RecipeCardsContainer: React.FC<RecipeCardsProps> = ({
  recipes,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <section className="bg-white p-6">
      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </section>
  );
};

export default RecipeCardsContainer;
