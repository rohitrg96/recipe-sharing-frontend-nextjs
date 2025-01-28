import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';
import { fetchRecipesService } from '@/services/recipeServices';
import { AppDispatch } from '@/store/store';
import { login } from '@/store/slices/authSlice';

export const initialLoadLogic = async (
  context: GetServerSidePropsContext,
  dispatch: AppDispatch
) => {
  const { page, limit } = context.query;

  const initialFilters = {
    minRating: '',
    maxPreparationTime: '',
    ingredients: '',
  };

  // Retrieve the auth token from cookies
  const cookies = parseCookies(context);
  const token = cookies.authToken;

  // Dispatch the token to the Redux store
  if (token) {
    dispatch(login({ token })); // Set the token in the Redux auth slice
  }

  try {
    const res = await fetchRecipesService(
      initialFilters,
      page as string,
      limit as string
    );

    return {
      props: {
        initialFilters,
        initialRecipes: res.data,
        token: token || null, // Pass the token to the page props (optional)
      },
    };
  } catch (error) {
    console.error('Error fetching initial recipes:', error);
    return {
      props: {
        initialFilters,
        initialRecipes: [],
        token: token || null,
      },
    };
  }
};
