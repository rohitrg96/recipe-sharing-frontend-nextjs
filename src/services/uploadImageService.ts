import { toast } from 'react-toastify';
import api from '@/api/axiosInstance';

export const uploadImage = async (file: File, token: string | null) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await api.post(`/recipes/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Axios instance won't handle this automatically
        Authorization: `Bearer ${token}`, // Add token in Authorization header
      },
    });

    return response.data; // Return the successful response data
  } catch (error: any) {
    console.error('Upload error:', error);

    // Check for specific error cases
    if (error.response) {
      const errorMessage =
        error.response.data?.message || 'Failed to upload image.';
      toast.error(errorMessage); // Show the error message to the user
    } else {
      // Handle network or unknown errors
      toast.error('Network error. Please check your connection.');
    }

    // Return a rejected promise so the caller knows the operation failed
    return Promise.reject(error);
  }
};
