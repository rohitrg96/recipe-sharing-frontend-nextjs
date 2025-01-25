import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ImageUpload from './ImageUpload';
import { addRecipe } from '@/services/addRecipeService';
import { toast } from 'react-toastify'; // Import Toastify
import { useRouter } from 'next/router'; // Import Next.js router for navigation

const AddRecipeForm: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter(); // Initialize router for navigation

  // Initial Form Values
  const initialValues = {
    title: '',
    ingredients: [''],
    steps: [''],
    preparationTime: '',
    image: '',
  };

  // Form Validation Schema
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    ingredients: Yup.array()
      .of(Yup.string().required('Ingredient is required'))
      .min(1, 'At least one ingredient is required'),
    steps: Yup.array()
      .of(Yup.string().required('Step is required'))
      .min(1, 'At least one step is required'),
    preparationTime: Yup.number()
      .typeError('Preparation time must be a number')
      .required('Preparation time is required'),
    image: Yup.string().required('Image is required'),
  });

  /**
   * Handles the form submission.
   *
   * @param values - The form values submitted by the user.
   */
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      // Call the API to add the recipe
      const result = await addRecipe(values);

      if (result.success) {
        // Show success message using Toastify
        toast.success('Recipe added successfully! 🎉');

        // Navigate to the home page after 2 seconds
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        // Show error message using Toastify
        toast.error(result.error || 'Failed to add recipe. Please try again.');
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Error adding recipe:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl w-full rounded-md p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4 max-w-4xl mx-auto p-4 md:p-8">
            {/* Title */}
            <div>
              <h1 className="text-2xl font-semibold mb-6">Add a New Recipe</h1>
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium"
              >
                Recipe Title
              </label>
              <Field
                name="title"
                type="text"
                className="mt-1 block w-full py-2 px-4 text-lg border-gray-300 rounded-md shadow-sm focus:border-blue-500"
                placeholder="Enter recipe title"
              />
              <ErrorMessage
                name="title"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-gray-700 font-medium">
                Ingredients
              </label>
              <FieldArray name="ingredients">
                {({ push, remove }) => (
                  <>
                    {values.ingredients.map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Field
                          name={`ingredients.${index}`}
                          type="text"
                          className="mt-1 block w-full py-2 px-4 text-lg border-gray-300 rounded-md shadow-sm focus:border-blue-500"
                          placeholder="Enter ingredient"
                        />
                        {/* Allow removal only for additional ingredients */}
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-red-500 text-white hover:text-red-700 py-2 px-4 rounded-md"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push('')}
                      className="text-blue-500 hover:text-blue-700 py-2 px-4 rounded-md"
                    >
                      Add Ingredient
                    </button>
                    <ErrorMessage
                      name="ingredients"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </>
                )}
              </FieldArray>
            </div>

            {/* Steps */}
            <div>
              <label className="block text-gray-700 font-medium">Steps</label>
              <FieldArray name="steps">
                {({ push, remove }) => (
                  <>
                    {values.steps.map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Field
                          name={`steps.${index}`}
                          type="text"
                          className="flex-1 block w-full py-2 px-4 border-gray-300 rounded-md shadow-sm focus:ring-blue-500"
                          placeholder="Enter step"
                        />
                        {/* Allow removal only for additional steps */}
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-red-500 text-white hover:text-red-700 py-2 px-4 rounded-md"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push('')}
                      className="text-blue-500 hover:text-blue-700 py-2 px-4 rounded-md"
                    >
                      Add Step
                    </button>
                    <ErrorMessage
                      name="steps"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </>
                )}
              </FieldArray>
            </div>

            {/* Preparation Time */}
            <div>
              <label
                htmlFor="preparationTime"
                className="block text-gray-700 font-medium"
              >
                Preparation Time (in minutes)
              </label>
              <Field
                name="preparationTime"
                type="number"
                className="mt-1 block py-2 px-4 w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter preparation time"
              />
              <ErrorMessage
                name="preparationTime"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Image Upload */}
            <ImageUpload
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              setFieldValue={(field, value) => {
                setFieldValue(field, value);
              }}
            />

            <ErrorMessage
              name="image"
              component="p"
              className="text-red-500 text-sm"
            />

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit Recipe
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRecipeForm;
