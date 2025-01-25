import { AuthPosition } from '@/components/Auth/AuthPosition';
import AddRecipeForm from '@components/AddRecipe/AddRecipeForm';

const AddRecipePage: React.FC = () => {
  return (
    <AuthPosition>
      <AddRecipeForm />
    </AuthPosition>
  );
};

export default AddRecipePage;
