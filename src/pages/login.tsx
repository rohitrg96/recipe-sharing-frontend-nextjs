import { GetServerSideProps } from "next";
import { parseCookies } from "nookies"; // To handle cookies
import LoginForm from "@components/Auth/LoginForm"; // Import LoginForm component

// Server-side props (for SSR)
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context); // Parse cookies from the request
  const token = cookies.authToken; // Retrieve the token from cookies

  if (token) {
    try {
      return {
        redirect: {
          destination: "/", // Redirect to a protected route
          permanent: false,
        },
      };
    } catch (error) {
      console.error("Invalid or expired token:", error);
    }
  }

  // If no token or invalid token, render the login page
  return {
    props: {}, // Pass props as required
  };
};

// LoginPage Component
const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
