import { GetServerSideProps } from "next";
import LoginForm from "@components/auth/LoginForm"; // Import LoginForm component

// Server-side props (for SSR)
export const getServerSideProps: GetServerSideProps = async (context) => {
  // You can fetch data here or initialize session state
  // For instance, checking if the user is already logged in, etc.

  const user = null; // Example: Check if the user is logged in, set as null if not

  return {
    props: {
      user,
    },
  };
};

// LoginPage Component
const LoginPage = ({ user }: { user: any }) => {
  if (user) {
    // Redirect user if already logged in
    return (
      <div>
        <h1>Redirecting to dashboard...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
