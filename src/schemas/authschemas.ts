import * as Yup from "yup";

// Validation schema for login form
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address") // Validate email format
    .required("Email is required"), // Ensure email is not empty
  password: Yup.string()
    .min(6, "Password must be at least 6 characters") // Validate minimum password length
    .required("Password is required"), // Ensure password is not empty
});
