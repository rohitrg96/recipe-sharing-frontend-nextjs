import api from '@/api/axiosInstance';

export const addRecipe = async (recipeData: any) => {
  try {
    // const token = getAuth
    // Make the API request with the token in the Authorization header
    const response = await api.post(`/recipes`, recipeData);

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Add Recipe Error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to add recipe.',
    };
  }
};
