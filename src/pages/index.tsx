import Footer from '@/components/Home/Footer';
import Header from '@/components/Home/Header';
import Navbar from '@/components/Home/Navbar';
import RecipeCards from '@/components/Home/Recipes';
import useFetchRecipes from '@/hooks/useFetchRecipes';
import { GetServerSideProps } from 'next';
import { HomePageProps } from '@/types/recipes';
import { initialLoadLogic } from '@/utils/initialLoadLogic';

/**
 * HomePage Component
 * Main page for displaying recipes with filters, search, and pagination
 */
const HomePage: React.FC<HomePageProps> = ({
  initialFilters,
  initialRecipes,
}) => {
  // Use the custom hook to manage state and fetching logic
  const {
    recipes,
    currentPage,
    totalPages,
    filtersState,
    setFiltersState,
    filterChange,
    handlePageChange,
    isLoading,
    isError,
  } = useFetchRecipes(initialFilters, initialRecipes);

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar />

      {/* Header Section */}
      <Header
        filters={filtersState}
        onFiltersChange={filterChange}
        initialFilters={initialFilters}
        setFiltersState={setFiltersState}
      />

      {/* Error Handling */}
      {isError && (
        <div className="error-banner">
          <p>Failed to load recipes. Please try again later.</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="loading-indicator flex items-center justify-center h-64 text-center text-red-500">
          <p>Loading recipes...</p>
        </div>
      )}

      {/* Recipe Cards Section */}
      {!isLoading && !isError && (
        <>
          {recipes.length > 0 ? (
            <RecipeCards
              recipes={recipes}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange} // Pagination handler
            />
          ) : (
            <div className="flex justify-center text-center text-red-500 text-xl h-64 mt-10">
              <p>Oops! No Recipes found, try rephrasing the query.</p>
            </div>
          )}
        </>
      )}

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

/**
 * Server-side data fetching
 * Fetch initial filters, recipes, and pagination data
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  return await initialLoadLogic(context);
};

export default HomePage;
