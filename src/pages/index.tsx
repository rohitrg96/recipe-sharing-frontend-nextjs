import React, { Suspense } from 'react';
import { HomePageProps } from '@/types/recipes';
import { initialLoadLogic } from '@/utils/initialLoadLogic';
import useFetchRecipes from '@/hooks/useFetchRecipes';
import Layout from '@/components/Home/Layout';
import { wrapper } from '@/store/store';
import Head from 'next/head'; // Import the Head component for meta tags

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

  return (
    <div>
      {/* Meta Tags for HomePage */}
      <Head>
        <title>Tasty Talses - Home</title>
        <meta
          name="description"
          content="Discover, share, and explore a wide variety of delicious recipes. Join the Recipe Sharing Platform today!"
        />
        <meta
          name="keywords"
          content="recipes, cooking, food, sharing, ratings, comments, discover recipes, food community"
        />
        <meta name="author" content="Rohit" />
        <meta property="og:title" content="Recipe Sharing Platform - Home" />
        <meta
          property="og:description"
          content="Discover, share, and explore a wide variety of delicious recipes. Join the Recipe Sharing Platform today!"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/ddaq6new3/image/upload/v1738040886/tasty-tales-images/yldiyagwj0peq0b862cw.png"
        />
        <meta property="og:url" content="https://your-website.com" />
        <meta name="twitter:title" content="Recipe Sharing Platform - Home" />
        <meta
          name="twitter:description"
          content="Discover, share, and explore a wide variety of delicious recipes. Join the Recipe Sharing Platform today!"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/ddaq6new3/image/upload/v1738040886/tasty-tales-images/yldiyagwj0peq0b862cw.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

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
