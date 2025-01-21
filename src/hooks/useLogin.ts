import { loginUser } from '@services/authService'; // API service for login
import { FormikHelpers } from 'formik';
import { setCookie } from 'nookies'; // Library to manage cookies

interface LoginFormValues {
  userName: string;
  password: string;
}

// Custom hook for login logic
export const useLogin = () => {
  const handleSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    try {
      // Call the login API
      const response = await loginUser(values);

      // Extract the JWT token from the API response
      const token = response.data.data.token;
      console.log(response.data, 123456);

      // Store the token in cookies
      setCookie(null, 'authToken', token, {
        maxAge: 30 * 24 * 60 * 60, // Token expires in 30 days
        path: '/', // Cookie accessible across the entire site
      });

      // Reset form fields on successful login
      actions.resetForm();

      console.log('Login successful. Token stored in cookies:', token);
      // Redirect to the dashboard or another protected route
      // router.push("/dashboard");
    } catch (error: any) {
      console.error('Login failed:', error);

      // Set the error message from the caught error to Formik's status
      actions.setStatus(
        error.message || 'An unexpected error occurred. Please try again.'
      );
    } finally {
      // Stop the submission loading state
      actions.setSubmitting(false);
    }
  };

  return { handleSubmit };
};
