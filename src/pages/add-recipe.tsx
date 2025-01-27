import { AuthPosition } from '@/components/Auth/AuthPosition';
import Layout from '@/components/Home/Layout';
import AddRecipeForm from '@components/AddRecipe/AddRecipeForm';
import MetaTags from '@/components/AddRecipe/MetaTags';

const AddRecipePage: React.FC = () => {
  return (
    <>
      <MetaTags
        title="Add a New Recipe - Recipe Sharing Platform"
        description="Share your delicious recipe with the community. Fill in details like title, ingredients, steps, and preparation time."
        ogTitle="Add a New Recipe"
        ogDescription="Share your delicious recipe with others and inspire the cooking community."
        ogImage="https://example.com/add-recipe-thumbnail.jpg"
      />
      <Layout>
        <AuthPosition>
          <AddRecipeForm />
        </AuthPosition>
      </Layout>
    </>
  );
};

export default AddRecipePage;
