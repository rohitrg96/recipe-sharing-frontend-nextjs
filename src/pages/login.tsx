import LoginForm from '@components/Auth/LoginForm'; // Import LoginForm component
import { AuthRedirect } from '@components/Auth/AuthRedirect';
import { checkAuthAndRedirect } from '@utils/authRedirectLogic';
import { GetServerSideProps } from 'next';

// LoginPage Component
const LoginPage = () => {
  return (
    <AuthRedirect>
      <LoginForm />
    </AuthRedirect>
  );
};

// Use the shared logic
export const getServerSideProps: GetServerSideProps = async (context) => {
  return await checkAuthAndRedirect(context); // Reuse the logic here
};

export default LoginPage;
