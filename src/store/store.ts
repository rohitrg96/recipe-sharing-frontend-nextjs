import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import authReducer from './slices/authSlice';
import errorReducer from './slices/errorSlice';

// Create the root reducer with HYDRATE handling
const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state, // Keep the existing state
      ...action.payload, // Merge the incoming payload
    };
  }
  return {
    auth: authReducer(state?.auth, action),
    error: errorReducer(state?.error, action),
  };
};

// Configure the Redux store
const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
  });

// Define types for RootState and AppDispatch
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

// Export the wrapper for SSR
export const wrapper = createWrapper(makeStore);
