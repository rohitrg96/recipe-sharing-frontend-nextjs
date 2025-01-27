import { GetServerSideProps } from 'next';
import { RecipeData } from '@/types/recipes';
import { initialRecipeDetails } from '@/utils/initialRecipeDetails';
import useRecipeDetails from '@/hooks/useFetchRecipe';
import CommentSection from '@/components/RecipeDetails/CommentSection';
import RatingStars from '@/components/RecipeDetails/RatingStars';
import Layout from '@/components/Home/Layout';
import { RecipeImage } from '@/components/RecipeDetails/Recipeimage';
import { RecipeInfo } from '@/components/RecipeDetails/RecipeInfo';
import { AddComment } from '@/components/RecipeDetails/AddComment';

const RecipeDetailsPage: React.FC<{ initialData: RecipeData }> = ({
  initialData,
}) => {
  const {
    recipe,
    isLoading,
    error,
    newComment,
    setNewComment,
    handleRate,
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
    <Layout>
      <div className="container mx-auto p-6">
        {/* Recipe Details Section */}
        <div className="flex flex-col md:flex-row gap-6 md:min-h-screen">
          {/* Recipe Image */}
          <RecipeImage image={recipe?.image} title={recipe?.title} />

          {/* Recipe Information */}
          <RecipeInfo recipe={recipe} />
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
          <AddComment
            newComment={newComment}
            setNewComment={setNewComment}
            handleSubmitComment={handleSubmitComment}
          />
        )}

        {/* Rating Section */}
        <RatingStars userRating={userRating} handleRate={handleRate} />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await initialRecipeDetails(context);
};

export default RecipeDetailsPage;
