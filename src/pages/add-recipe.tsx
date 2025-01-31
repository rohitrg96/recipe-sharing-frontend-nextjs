import Layout from '@/components/Home/Layout';
import AddRecipeForm from '@components/AddRecipe/AddRecipeForm';
import MetaTags from '@/components/AddRecipe/MetaTags';
import { GetServerSideProps } from 'next';
import { wrapper } from '@/store/store';
import { login } from '@/store/slices/authSlice';
import { parseCookies } from 'nookies';

const AddRecipePage: React.FC = () => {
  return (
    <>
      <MetaTags
        title="Add a New Recipe - Recipe Sharing Platform"
        description="Share your delicious recipe with the community. Fill in details like title, ingredients, steps, and preparation time."
        ogTitle="Add a New Recipe"
        ogDescription="Share your delicious recipe with others and inspire the cooking community."
        ogImage="https://res.cloudinary.com/ddaq6new3/image/upload/v1738040886/tasty-tales-images/yldiyagwj0peq0b862cw.png"
      />
      <Layout>
        <AddRecipeForm />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const cookies = parseCookies(context);
    const token = cookies.authToken;

    // Dispatch the login action if token is available
    if (token) {
      store.dispatch(login({ token }));
      return { props: {} }; // No additional props required
    } else {
      return {
        redirect: {
          destination: '/login', // Path to the login page
          permanent: false, // Indicates this is not a permanent redirect (308 vs 302)
        },
      };
    }
  });

export default AddRecipePage;
