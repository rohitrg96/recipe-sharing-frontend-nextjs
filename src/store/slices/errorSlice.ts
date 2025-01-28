import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
  message: string | null;
}

// Initial state for the error slice
const initialState: ErrorState = {
  message: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    // Action to set an error message
    setError: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    // Action to clear the error message
    clearError: (state) => {
      state.message = null;
    },
  },
});

// Export actions and reducer
export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
