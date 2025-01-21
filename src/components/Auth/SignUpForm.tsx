import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { signUpValidationSchema } from '@schemas/authschemas'; // Validation schema
import { signUpInitialValues } from '@constants/formInitialValues'; // Initial values
import { useSignUp } from '@hooks/useSignup'; // Custom hook for sign-up logic

const SignUpForm: React.FC = () => {
  const { handleSubmit } = useSignUp();

  return (
    <Formik
      initialValues={signUpInitialValues}
      validationSchema={signUpValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Welcome to the Recipe World! 🍳
          </h2>

          {/* First Name and Last Name Input Fields Side by Side */}
          <div className="mb-4 flex space-x-4">
            {/* First Name Field */}
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <Field
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First name"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Last Name Field */}
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last name"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
          </div>

          {/* Email Input Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Password Input Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Global Error Message */}
          {status && <div className="text-black text-sm mb-4">{status}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
