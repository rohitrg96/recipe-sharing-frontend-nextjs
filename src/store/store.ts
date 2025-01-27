import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import errorReducer from './slices/errorSlice';

// Initialize the Redux store with reducers
const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer for auth state
    error: errorReducer, // Reducer for global error state
  },
});

// Define types for RootState and AppDispatch for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
