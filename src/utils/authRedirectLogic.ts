import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export const checkAuthAndRedirect = async (
  context: GetServerSidePropsContext
) => {
  const cookies = parseCookies(context);
  const token = cookies.authToken;

  if (token) {
    return {
      redirect: {
        destination: '/', // Redirect to the homepage
        permanent: false,
      },
    };
  }

  return { props: {} };
};
