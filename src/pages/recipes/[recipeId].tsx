import { GetServerSideProps } from 'next';
import { RecipeData } from '@/types/recipes';
import Image from 'next/image';
import { initialRecipeDetails } from '@/utils/initialRecipeDetails';
import useRecipeDetails from '@/hooks/useFetchRecipe';

import CommentSection from '@/components/RecipeDetails/commentsSection';
import RatingStars from '@/components/RecipeDetails/userRating';

const RecipeDetailsPage: React.FC<{ initialData: RecipeData }> = ({
  initialData,
}) => {
  const {
    recipe,
    isLoading,
    error,
    newComment,
    setNewComment,
    // rating,
    handleRate,
    // setRating,
    userRating,
    handleSubmitComment,
    userComment,
  } = useRecipeDetails(initialData);

  if (isLoading) return <p className="text-center text-xl mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-xl text-red-500 mt-10">
        Error loading recipe details
      </p>
    );

  return (
    <div className="container mx-auto p-6">
      {/* Recipe Details Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Recipe Image */}
        <div className="flex-1">
          <div className="w-full h-80 md:h-full relative rounded-md shadow-lg overflow-hidden">
            <Image
              src={recipe?.image || '/placeholder-image.jpg'} // Fallback if image is not provided
              alt={recipe?.title || 'Recipe Image'}
              layout="fill" // Ensures the image takes the full width and height of the container
              objectFit="cover" // Maintains aspect ratio and ensures the image covers the container
              priority // Ensures this image loads quickly since it's above the fold
              className="rounded-md" // Tailwind styles
            />
          </div>
        </div>

        {/* Recipe Information */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{recipe?.title}</h1>
          <p className="text-lg text-gray-600 mb-6">
            Preparation Time: {recipe?.preparationTime} minutes
          </p>

          <h3 className="text-2xl font-semibold mb-2">Ingredients:</h3>
          <ul className="list-disc pl-5 mb-6">
            {recipe?.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">
                {ingredient}
              </li>
            ))}
          </ul>

          <h3 className="text-2xl font-semibold mb-2">Steps:</h3>
          <ol className="list-decimal pl-5">
            {recipe?.steps.map((step, index) => (
              <li key={index} className="text-gray-700 mb-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <div className="space-y-4">
          {recipe.comments.length == 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            recipe.comments.map((comment) => (
              <CommentSection
                key={comment._id}
                comment={comment}
                userComment={userComment}
              />
            ))
          )}
        </div>
      </div>

      {/* Add Comment Section */}
      {!userComment && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Add Your Comment</h2>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
            className="w-full h-24 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSubmitComment}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit Comment
          </button>
        </div>
      )}

      <RatingStars userRating={userRating} handleRate={handleRate} />
    </div>
  );
};

/**
 * Server-Side Props: Fetch recipe details for the initial render
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  return await initialRecipeDetails(context);
};

export default RecipeDetailsPage;
