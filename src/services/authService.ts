import axios from "axios";

// Environment variable for API base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (credentials: {
  userName: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials); // Replace with your actual API endpoint
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle server errors
        console.error("Server responded with an error:", error.response.data);
        throw new Error(
          error.response.data.message || "Invalid credentials or server error"
        );
      } else if (error.request) {
        // No response received from the server
        console.error("No response received:", error.request);
        throw new Error(
          "Unable to connect to the server. Please try again later."
        );
      }
    }
    // Handle non-Axios errors
    throw new Error("An unexpected error occurred.");
  }
};
