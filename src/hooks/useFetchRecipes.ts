import { useState, useCallback, useEffect } from 'react';
import { Filter, Recipe } from '@/types/recipes';
import { fetchRecipesService } from '@/services/recipeServices';
/**
 * Custom hook to manage recipe fetching, filters, and pagination
 * @param initialFilters - Initial filter values
 * @param initialRecipes - Initial recipes to display
 * @param initialTotalPages - Initial total number of pages
 */
const useFetchRecipes = (
  initialFilters: Filter,
  initialRecipes: Recipe[],
  initialTotalPages: number
) => {
  // State for recipes
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);

  // State for pagination
  const [currentPage, setCurrentPage] = useState<string>('1');
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages);

  // State for filters
  const [filtersState, setFiltersState] = useState<Filter>(initialFilters);

  /**
   * Fetch recipes dynamically based on filters and pagination
   * @param page - Page number to fetch
   */
  const fetchRecipes = useCallback(
    async (page: string) => {
      try {
        // Use the service function to fetch recipes
        const data = await fetchRecipesService(filtersState, page);
        setRecipes(data.data); // Update recipes state
        setTotalPages(data.pagination.totalPages); // Update total pages state
        setCurrentPage(page); // Update current page state
      } catch (error: any) {
        console.error(error.message);
      }
    },
    [filtersState]
  );

  // Fetch recipes when filters change
  useEffect(() => {
    fetchRecipes('1'); // Reset to the first page when filters are updated
  }, [filtersState, fetchRecipes]);

  const filterChange = (key: string, value: string | number) =>
    setFiltersState((prev) => ({ ...prev, [key]: value }));

  return {
    recipes,
    currentPage,
    totalPages,
    filtersState,
    setFiltersState,
    fetchRecipes,
    filterChange,
  };
};

export default useFetchRecipes;
