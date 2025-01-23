import * as Yup from 'yup';

// Validation schema for login form
export const loginValidationSchema = Yup.object({
  userName: Yup.string()
    .email('Invalid email address') // Validate email format
    .required('Email is required'), // Ensure email is not empty
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters') // Validate minimum password length
    .required('Password is required'), // Ensure password is not empty
});

export const signUpValidationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
