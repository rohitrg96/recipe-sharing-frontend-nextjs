import { signUpUser } from '@services/authService'; // API service for sign-up
import { FormikHelpers } from 'formik';
import router from 'next/router';

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const handleSubmit = async (
    values: SignUpFormValues,
    actions: FormikHelpers<SignUpFormValues>
  ) => {
    try {
      // Call the sign-up API
      const response = await signUpUser(values);

      if (response) {
        router.push('/login');
      }

      // Reset the form on success
      actions.resetForm();
    } catch (error: any) {
      console.error('Sign-up failed:', error);
      // Display error message on the form
      actions.setStatus(
        error.response?.data?.message || 'An unexpected error occurred.'
      );
    } finally {
      actions.setSubmitting(false);
    }
  };

  const navigateToLogin = () => {
    router.push('/login'); // Navigate to the login page
  };

  const navigateToHome = () => {
    router.push('/'); // Navigate to the homepage
  };

  return { handleSubmit, navigateToLogin, navigateToHome };
};
