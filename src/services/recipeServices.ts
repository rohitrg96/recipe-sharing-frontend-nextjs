import axios from 'axios';
import { Filter } from '@/types/recipes';
import { getAuthToken } from '@/utils/getAuthToken';
import api from '@/api/axiosInstance';

// Environment variable for API base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;
/**
 * Service function to fetch recipes based on filters and pagination
 * @param filters - Filter values (ingredients, minRating, maxPreparationTime)
 * @param page - Page number for pagination
 * @param limit - Number of recipes per page (default: 12)
 * @returns Response data containing recipes and pagination details
 */
export const fetchRecipesService = async (
  filters: Filter,
  page = '1',
  limit = '12'
) => {
  try {
    // Construct query string based on filters and pagination
    const query = new URLSearchParams({
      ingredients: filters.ingredients.trim() || '',
      minRating: filters.minRating || '',
      maxPreparationTime: filters.maxPreparationTime || '',
      page,
      limit,
    }).toString();

    // API call to fetch recipes
    const response = await api.get(`/recipes?${query}`);

    // Return the response data
    return response.data.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes. Please try again later.');
  }
};

export const fetchRecipeService = async (_id: string, token: string | null) => {
  try {
    // API call to fetch recipe

    const response = await api.get(`${API_URL}/recipes/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token in Authorization header
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes. Please try again later.');
  }
};

export const addComment = async (recipeId: string, comment: string) => {
  const token = getAuthToken(false, null);

  await axios.put(
    `${API_URL}/recipes/comment/${recipeId}`,
    { comment },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Add token in Authorization header
      },
    }
  );
};

// Fetch user feedback on a recipe
export const fetchUserFeedback = async (
  recipeId: string,
  token: string | null
) => {
  const response = await api.get(`/recipes/user-feedback/${recipeId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Add token in Authorization header
    },
  });
  return response.data; // Assuming the response has a `data` object
};

// Add a rating to a recipe
export const addRating = async (
  recipeId: string,
  rating: number,
  token: string | null
) => {
  await api.put(
    `/recipes/rating/${recipeId}`,
    { rating },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Add token in Authorization header
      },
    }
  );
};
