import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ImageUpload from './ImageUpload';

const AddRecipeForm: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
    ingredients: Yup.array().of(
      Yup.string().required('Ingredient is required')
    ),
    steps: Yup.array().of(Yup.string().required('Step is required')),
    preparationTime: Yup.number()
      .typeError('Preparation time must be a number')
      .required('Preparation time is required'),
    image: Yup.string().required('Image is required'),
  });

  // Submit Handler
  const handleSubmit = async (values: typeof initialValues) => {
    console.log(values);
    // Add logic to submit the form data to your API
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Recipe Title
            </label>
            <Field
              name="title"
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                        className="flex-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter ingredient"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push('')}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Add Ingredient
                  </button>
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
                        className="flex-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter step"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push('')}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Add Step
                  </button>
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
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
            setFieldValue={setFieldValue}
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
  );
};

export default AddRecipeForm;
