import { GetServerSideProps } from 'next';
import { RecipeData } from '@/types/recipes';
import useRecipeDetails from '@/hooks/useFetchRecipe';
import CommentSection from '@/components/RecipeDetails/CommentSection';
import RatingStars from '@/components/RecipeDetails/RatingStars';
import Layout from '@/components/Home/Layout';
import { RecipeImage } from '@/components/RecipeDetails/Recipeimage';
import { RecipeInfo } from '@/components/RecipeDetails/RecipeInfo';
import { AddComment } from '@/components/RecipeDetails/AddComment';
import { wrapper } from '@/store/store';
import { parseCookies } from 'nookies';
import { login } from '@/store/slices/authSlice';
import { fetchRecipeService } from '@/services/recipeServices';

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
                  newComment={newComment}
                  setNewComment={setNewComment}
                  handleSubmitComment={handleSubmitComment}
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

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    // Retrieve the authentication token from cookies
    const cookies = parseCookies(context);
    const token = cookies.authToken || null;

    // Dispatch the login action if the token is available
    if (token) {
      store.dispatch(login({ token }));
    }

    // Fetch initial recipe details
    const recipeId = context.params?.recipeId as string;
    let initialData = null;

    try {
      if (token) {
        initialData = await fetchRecipeService(recipeId, token);
      }
    } catch (error) {
      console.error('Error fetching initial recipes:', error);
    }

    return {
      props: {
        initialData,
      },
    };
  });

export default RecipeDetailsPage;
