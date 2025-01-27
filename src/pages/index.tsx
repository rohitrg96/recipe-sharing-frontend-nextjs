import React, { Suspense } from 'react';
// import { GetServerSideProps } from 'next';
import { HomePageProps } from '@/types/recipes';
import { initialLoadLogic } from '@/utils/initialLoadLogic';
import useFetchRecipes from '@/hooks/useFetchRecipes';
import Layout from '@/components/Home/Layout';
import { wrapper } from '@/store/store';
// import { login } from '@/store/slices/authSlice';
// import { useDispatch } from 'react-redux';

// Lazy load components
const Header = React.lazy(() => import('@/components/Home/Header'));
const RecipeCards = React.lazy(() => import('@/components/Home/Recipes'));

/**
 * HomePage Component
 * Main page for displaying recipes with filters, search, and pagination
 */
const HomePage: React.FC<HomePageProps> = ({
  initialFilters,
  initialRecipes,
  // token,
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

  // const dispatch = useDispatch();

  // // Dispatch login action on the client side
  // useEffect(() => {
  //   if (token) {
  //     dispatch(login({ token: token }));
  //   }
  // }, [token, dispatch]);

  return (
    <div>
      <Layout>
        {/* Lazy-loaded Header Section */}
        <Suspense fallback={<div>Loading Header...</div>}>
          <Header
            filters={filtersState}
            onFiltersChange={filterChange}
            initialFilters={initialFilters}
            setFiltersState={setFiltersState}
          />
        </Suspense>

        {/* Error Handling */}
        {isError && (
          <div className="error-banner">
            <p>Failed to load recipes. Please try again later.</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="loading-indicator text-xl flex items-center justify-center h-64 text-center text-red-500">
            <p>Loading recipes...</p>
          </div>
        )}

        {/* Lazy-loaded Recipe Cards Section */}
        {!isLoading && !isError && (
          <Suspense fallback={<div>Loading Recipes...</div>}>
            {recipes.length > 0 ? (
              <RecipeCards
                recipes={recipes}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange} // Pagination handler
              />
            ) : (
              <div className="flex items-center justify-center text-center text-red-500 text-xl h-64 mt-10">
                <p>Oops! No Recipes found, try rephrasing the query.</p>
              </div>
            )}
          </Suspense>
        )}
      </Layout>
    </div>
  );
};

/**
 * Server-side data fetching
 * Fetch initial filters, recipes, and pagination data
 */
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    // Call the initial load logic and pass the Redux dispatch
    return await initialLoadLogic(context, store.dispatch);
  }
);

export default HomePage;
