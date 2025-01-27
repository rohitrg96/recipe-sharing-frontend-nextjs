import { AuthPosition } from '@/components/Auth/AuthPosition';
import Layout from '@/components/Home/Layout';
import AddRecipeForm from '@components/AddRecipe/AddRecipeForm';

const AddRecipePage: React.FC = () => {
  return (
    <Layout>
      <AuthPosition>
        <AddRecipeForm />
      </AuthPosition>
    </Layout>
  );
};

export default AddRecipePage;
