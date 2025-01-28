import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import LoginModal from './LoginModal';
import useAppSelector from '@/hooks/useAppSelector';
import { RecipeCardsProps } from '@/types/recipes';

/**
 * RecipeCardsContainer Component
 * Maps over recipes and displays individual RecipeCard components.
 * Includes pagination controls and login enforcement logic.
 */
const RecipeCardsContainer: React.FC<RecipeCardsProps> = ({
  recipes,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth); // Check authentication state
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Handle card click
  const handleCardClick = (recipeId: string) => {
    if (isAuthenticated) {
      window.location.href = `/recipes/${recipeId}`;
    } else {
      setShowModal(true); // Show login modal
    }
  };

  return (
    <section className="bg-white p-6">
      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onClick={() => handleCardClick(recipe._id)}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      {/* Login Modal */}
      {showModal && (
        <LoginModal
          onClose={() => setShowModal(false)}
          onLogin={() => (window.location.href = '/login')}
        />
      )}
    </section>
  );
};

export default RecipeCardsContainer;
