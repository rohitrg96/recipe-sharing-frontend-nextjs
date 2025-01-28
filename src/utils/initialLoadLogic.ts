import { GetServerSidePropsContext } from 'next';
import { fetchRecipesService } from '@/services/recipeServices';

export const initialLoadLogic = async (context: GetServerSidePropsContext) => {
  const { page, limit } = context.query;

  const initialFilters = {
    minRating: '', // Rating options
    maxPreparationTime: '',
    ingredients: '',
  };

  try {
    // Fetch initial recipes from the API
    const res = await fetchRecipesService(
      initialFilters,
      page as string,
      limit as string
    );

    return {
      props: {
        initialFilters, // Pass filters to the Header component
        initialRecipes: res.data, // Initial recipes for RecipeCards
        initialTotalPages: res.pagination.totalPages,
      },
    };
  } catch (error) {
    console.error('Error fetching initial recipes:', error);
    return {
      props: {
        initialFilters,
        initialRecipes: [],
        initialTotalPages: 1,
      },
    };
  }
};
