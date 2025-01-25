import axios from 'axios';
// Environment variable for API base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  console.log(file);

  try {
    const response = await axios.post(
      `${API_URL}/recipes/upload-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Axios instance won't handle this automatically
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdtaWFsQGdtYWlsLmNvbSIsImlkIjoiNjc4OTBiMzg2MzY0ZDA5MWEwNjIwMjI4IiwiaWF0IjoxNzM3NzE5MjA4LCJleHAiOjE3Mzc4MDU2MDh9.GDJHjRwi7JC3OYyNzPeK5N6V40xnXmBNatt-wMN2BTQ`, // Add the token here
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Upload error:', error);
    throw new Error(error.response?.data?.message || 'Failed to upload image');
  }
};
