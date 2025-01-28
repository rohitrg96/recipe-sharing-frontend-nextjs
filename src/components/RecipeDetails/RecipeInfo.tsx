import { RecipeData } from '@/types/recipes';

export const RecipeInfo: React.FC<{ recipe: RecipeData }> = ({ recipe }) => (
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
);
