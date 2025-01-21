import { GetServerSideProps } from 'next';
import { checkAuthAndRedirect } from '@utils/authRedirectLogic';
import SignUpForm from '@components/Auth/SignUpForm';
import { AuthRedirect } from '@components/Auth/AuthRedirect';

const SignUpPage = () => {
  return (
    <AuthRedirect>
      <SignUpForm />
    </AuthRedirect>
  );
};

// Use the shared logic
export const getServerSideProps: GetServerSideProps = async (context) => {
  return await checkAuthAndRedirect(context); // Reuse the logic here
};

export default SignUpPage;
