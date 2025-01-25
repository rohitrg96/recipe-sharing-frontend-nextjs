import { AuthPosition } from '@/components/Auth/AuthPosition';
import AddRecipeForm from '@components/AddRecipe/AddRecipeForm';

const AddRecipePage: React.FC = () => {
  return (
    // <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <AuthPosition>
      <div className="max-w-3xl w-full  rounded-md p-6">
        <AddRecipeForm />
      </div>
    </AuthPosition>

    // </div>
  );
};

export default AddRecipePage;
