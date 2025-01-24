import { AuthPosition } from '@/components/Auth/AuthPosition';
import AddRecipeForm from '@components/AddRecipe/AddRecipeForm';

const AddRecipePage: React.FC = () => {
  return (
    // <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <AuthPosition>
      <div className="max-w-4xl w-full bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-semibold mb-6">Add a New Recipe</h1>
        <AddRecipeForm />
      </div>
    </AuthPosition>

    // </div>
  );
};

export default AddRecipePage;
