import axios from "axios";

// Environment variable for API base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// API call to login the user
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // Assuming response includes JWT or user data
  } catch (error) {
    console.log(error);
    throw new Error("Invalid credentials or server error");
  }
};
