import { GetServerSideProps } from 'next';
import { checkAuthAndRedirect } from '@utils/authRedirectLogic';
import SignUpForm from '@components/Auth/SignUpForm';
import { AuthPosition } from '@/components/Auth/AuthPosition';

const SignUpPage = () => {
  return (
    <AuthPosition>
      <SignUpForm />
    </AuthPosition>
  );
};

// Use the shared logic
export const getServerSideProps: GetServerSideProps = async (context) => {
  return await checkAuthAndRedirect(context); // Reuse the logic here
};

export default SignUpPage;
