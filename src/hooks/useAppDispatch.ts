import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store/store';

// Custom hook to use dispatch with proper TypeScript typing
const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
