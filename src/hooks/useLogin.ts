import { loginUser } from "@services/authService"; // API service for login
import { FormikHelpers } from "formik";
import { setCookie } from "nookies"; // Library to manage cookies

interface LoginFormValues {
  email: string;
  password: string;
}

// Custom hook for login logic
export const useLogin = () => {
  /**
   * Handles form submission
   * @param values - Form values submitted by the user
   * @param actions - Formik helpers to manage form state
   */
  const handleSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    try {
      // Call the login API
      const response = await loginUser(values);

      // Extract the JWT token from the API response
      const { token } = response.data;

      // Store the token in cookies
      setCookie(null, "authToken", token, {
        maxAge: 30 * 24 * 60 * 60, // Token expires in 30 days
        path: "/", // Cookie accessible across the entire site
        httpOnly: false, // Can be accessed via JavaScript (set to true for increased security)
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "Lax", // Helps mitigate CSRF attacks
      });

      // Simulate storing the user token (or perform a redirect here)
      console.log("Login successful. Token stored in cookies:", token);

      // Reset form fields on successful login
      actions.resetForm();

      // Optional: Redirect the user to a protected page (e.g., dashboard)
      // router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);

      // Set a generic error message
      actions.setFieldError("email", "Invalid credentials. Please try again.");
    } finally {
      // Stop the submission loading state
      actions.setSubmitting(false);
    }
  };

  return { handleSubmit };
};
