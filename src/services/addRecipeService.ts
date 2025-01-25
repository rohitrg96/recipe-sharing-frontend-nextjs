import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const addRecipe = async (recipeData: any) => {
  try {
    // const token = getAuth
    // Make the API request with the token in the Authorization header
    const response = await axios.post(`${API_URL}/recipes`, recipeData, {
      headers: {
        'Content-Type': 'application/json', // This header remains for JSON content
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdtaWFsQGdtYWlsLmNvbSIsImlkIjoiNjc4OTBiMzg2MzY0ZDA5MWEwNjIwMjI4IiwiaWF0IjoxNzM3NzE5MjA4LCJleHAiOjE3Mzc4MDU2MDh9.GDJHjRwi7JC3OYyNzPeK5N6V40xnXmBNatt-wMN2BTQ`, // Add the token here
      },
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Add Recipe Error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to add recipe.',
    };
  }
};
