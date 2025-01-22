import axios from 'axios';
import { Filter } from '@/types/recipes';

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
    console.log(query, 'query');

    //recipe-sharing-backend-theta.vercel.app/api/
    // recipes?ingredients=oni%5C&minRating=&maxPreparationTime=&page=1&limit=12

    // API call to fetch recipes
    const response = await axios.get(`${API_URL}/recipes?${query}`);

    // Return the response data
    return response.data.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes. Please try again later.');
  }
};
