// src/pages/auth/sign-up.tsx
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies'; // To check cookies for authentication
import SignUpForm from '@components/Auth/SignUpForm';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);

  // Check if user is already logged in (e.g., has a valid authToken)
  if (cookies.authToken) {
    return {
      redirect: {
        destination: '/login', // Redirect to a protected page
        permanent: false,
      },
    };
  }

  return {
    props: {}, // No specific props needed for now
  };
};

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
