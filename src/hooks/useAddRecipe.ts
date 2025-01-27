import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { addRecipe } from '@/services/addRecipeService';

export const useAddRecipe = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  const initialValues = {
    title: '',
    ingredients: [''],
    steps: [''],
    preparationTime: '',
    image: '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const result = await addRecipe(values);
      if (result.success) {
        toast.success('Recipe added successfully! 🎉');
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        toast.error(result.error || 'Failed to add recipe. Please try again.');
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  return { initialValues, handleSubmit, imagePreview, setImagePreview };
};
