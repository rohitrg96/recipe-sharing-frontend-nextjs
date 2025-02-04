import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import ImageUpload from '@components/AddRecipe/ImageUpload';
import { useAddRecipe } from '@hooks/useAddRecipe';
import { validationSchema } from './validationSchema';

/**
 * AddRecipeForm Component
 * Handles the form to add a new recipe with fields for title, ingredients, steps, preparation time, and an image upload.
 */
const AddRecipeForm: React.FC = () => {
  const { initialValues, handleSubmit, imagePreview, setImagePreview } =
    useAddRecipe();

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-xl w-full rounded-md p-4 ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-3">
              {/* Title */}
              <div>
                <h1 className="text-xl font-semibold mb-4">Add a New Recipe</h1>
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-medium"
                >
                  Recipe Title
                </label>
                <Field
                  name="title"
                  id="title"
                  type="text"
                  className="mt-1 block w-full py-1 px-3 border-black rounded-md shadow-sm focus:border-blue-500"
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
                <label className="block text-gray-700 text-sm font-medium">
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
                            className="block w-full py-1 px-3 border-gray-300 rounded-md shadow-sm focus:border-blue-500"
                            placeholder="Enter ingredient"
                          />
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="bg-red-500 text-white hover:text-red-700 py-1 px-2 rounded-md"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push('')}
                        className="text-blue-500 hover:text-blue-700 py-1 px-2 rounded-md"
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
                <label className="block text-gray-700 text-sm font-medium">
                  Steps
                </label>
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
                            className="block w-full py-1 px-3 border-gray-300 rounded-md shadow-sm focus:border-blue-500"
                            placeholder="Enter step"
                          />
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="bg-red-500 text-white hover:text-red-700 py-1 px-2 rounded-md"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push('')}
                        className="text-blue-500 hover:text-blue-700 py-1 px-2 rounded-md"
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
                  className="block text-gray-700 text-sm font-medium"
                >
                  Preparation Time (in minutes)
                </label>
                <Field
                  name="preparationTime"
                  type="number"
                  className="mt-1 block py-1 px-3 w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500"
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
                setFieldValue={(field, value) => setFieldValue(field, value)}
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
    </div>
  );
};

export default AddRecipeForm;
