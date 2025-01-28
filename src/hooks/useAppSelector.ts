import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

// Custom hook to use selector with proper TypeScript typing
const useAppSelector: <T>(selector: (state: RootState) => T) => T = useSelector;

export default useAppSelector;
