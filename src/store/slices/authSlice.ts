import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

// Initial state for the auth slice
const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to log in the user
    login: (
      state,
      action: PayloadAction<{
        token: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    // Action to log out the user
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
