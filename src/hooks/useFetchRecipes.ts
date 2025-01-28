import { useState, useCallback, useMemo, SetStateAction } from 'react';
import { Filter, Recipe, FetchRecipesResponse } from '@/types/recipes';
import { fetchRecipesService } from '@/services/recipeServices';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

/**
 * Custom hook to manage recipe fetching, filters, and pagination.
 * @param initialFilters - Initial filter values to prepopulate the filter state.
 * @param initialRecipes - Initial recipes to display before fetching new ones.
 */
const useFetchRecipes = (initialFilters: Filter, initialRecipes: Recipe[]) => {
  // State for managing the current page in pagination
  const [currentPage, setCurrentPage] = useState<string>('1');

  // State for managing filter inputs (e.g., ingredients, ratings, etc.)
  const [filtersState, setFiltersState] = useState<Filter>(initialFilters);

  /**
   * Debounce the filters state to reduce the frequency of API calls.
   *
   * Debouncing ensures that the API request is made only after a specified delay
   * (500ms in this case) once the user stops making changes to the filters.
   * This prevents unnecessary calls to the API during rapid filter updates.
   */
  const [debouncedFilterState] = useDebounce(filtersState, 500);

  /**
   * Memoized query key for React Query. This ensures the query key updates
   * only when `debouncedFilterState` or `currentPage` changes, reducing unnecessary re-renders.
   */
  const queryKey = useMemo(
    () => ['recipes', debouncedFilterState, currentPage],
    [debouncedFilterState, currentPage]
  );

  /**
   * Fetch recipes dynamically based on filters and current pagination state.
   * React Query automatically manages caching and deduplication using the query key.
   */
  const { data, error, isLoading, isError } = useQuery<FetchRecipesResponse>({
    queryKey, // Unique query key for caching
    queryFn: () => fetchRecipesService(debouncedFilterState, currentPage), // API service function to fetch recipes
  });

  /**
   * Callback to handle page change in pagination.
   * Updates the currentPage state without unnecessary re-renders.
   * useCallback ensures this function is memoized and not recreated on every render.
   */
  const handlePageChange = useCallback((page: SetStateAction<string>) => {
    setCurrentPage(page);
  }, []);

  /**
   * Callback to update the filter state dynamically when a filter value changes.
   * Merges the new filter value with the existing state.
   *
   * @param key - Filter key (e.g., "ingredient", "rating").
   * @param value - Filter value to update (e.g., "Tomato", 4).
   * useCallback ensures this function is memoized and not recreated on every render.
   */
  const filterChange = useCallback(
    (key: string, value: string | number) =>
      setFiltersState((prev) => ({ ...prev, [key]: value })),
    []
  );

  return {
    recipes: data?.data || initialRecipes, // Fetched recipes or initial fallback
    currentPage, // Current page in pagination
    totalPages: data?.pagination.totalPages || 10, // Total pages based on the fetched response
    filtersState, // Current filter state
    error, // Any error encountered during fetching
    isLoading, // Loading state during data fetching
    isError, // Whether an error occurred
    setFiltersState, // Setter for filters state
    handlePageChange, // Function to update the current page
    filterChange, // Function to update filters
  };
};

export default useFetchRecipes;
