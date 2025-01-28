import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Define the shape of the auth state
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

// Initial state for the auth slice
const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to log in the user
    login: (state, action: PayloadAction<{ token: string }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    // Action to log out the user
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  // Handle server-side hydration
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      // Merge the server and client state
      return {
        ...state,
        ...action.payload.auth,
      };
    });
  },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
