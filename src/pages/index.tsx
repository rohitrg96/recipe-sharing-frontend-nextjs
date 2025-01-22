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
  initialTotalPages,
}) => {
  // Use the custom hook to manage state and fetching logic
  const {
    recipes,
    currentPage,
    totalPages,
    filtersState,
    setFiltersState,
    fetchRecipes,
    filterChange,
  } = useFetchRecipes(initialFilters, initialRecipes, initialTotalPages);

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

      {/* Recipe Cards Section */}
      <RecipeCards
        recipes={recipes}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={fetchRecipes} // Pagination handler
      />

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
