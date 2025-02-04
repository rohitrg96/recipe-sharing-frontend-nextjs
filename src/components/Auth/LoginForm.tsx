import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { loginValidationSchema } from '@schemas/authschemas';
import { loginInitialValues } from '@constants/formInitialValues';
import { useLogin } from '@hooks/useLogin';
import AuthRedirectLinks from './Navigation';

const LoginForm: React.FC = () => {
  const { handleSubmit, navigateToSignUp, navigateToHome } = useLogin();

  return (
    <Formik
      initialValues={loginInitialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Welcome Back! 👋
          </h2>
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
              id="userName"
              name="userName"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
            <ErrorMessage
              name="userName"
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
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
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
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          <AuthRedirectLinks
            linkText1="Don't have an account? Click here to Sign up!"
            linkText2="Not logging in? Head back to the homepage"
            onLinkClick1={navigateToSignUp} // Navigate to login page
            onLinkClick2={navigateToHome} // Navigate to homepage
          />
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
