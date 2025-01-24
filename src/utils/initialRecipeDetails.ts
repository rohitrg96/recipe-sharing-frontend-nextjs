import { GetServerSidePropsContext } from 'next';
import { fetchRecipeService } from '@/services/recipeServices';
import { getAuthToken } from './getAuthToken';

export const initialRecipeDetails = async (
  context: GetServerSidePropsContext
) => {
  const recipeId = context.params?.recipeId as string;

  try {
    // Fetch initial recipes from the API
    const token = getAuthToken(true, context);
    console.log(token, 'token from serverside');
    const res = await fetchRecipeService(recipeId, token);
    console.log(res, 'res');

    return {
      props: {
        initialData: res, // Initial recipes for RecipeCards
      },
    };
  } catch (error) {
    console.error('Error fetching initial recipes:', error);
    return {
      props: {
        initialData: null,
      },
    };
  }
};
