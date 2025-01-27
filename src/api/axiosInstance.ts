import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      switch (response.status) {
        case 401:
          toast.error('Unauthorized: Please log in again.');
          if (typeof window !== 'undefined') {
            window.location.href = '/login'; // Use window for redirection
          }
          break;
        case 403:
          toast.error('Forbidden: You do not have access to this resource.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(
            response.data?.message || 'An unexpected error occurred.'
          );
          break;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
