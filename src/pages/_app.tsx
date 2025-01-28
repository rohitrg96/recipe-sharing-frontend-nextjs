import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { wrapper } from '@/store/store'; // Import the wrapper
import '../styles/global.css'; // Import global styles
import { ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from '@components/ErrorBoundry/ErrorBoundary'; // Import ErrorBoundary
import Head from 'next/head'; // Import the Head component

function MyApp({ Component, pageProps }: AppProps) {
  // Initialize React Query client
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ErrorBoundary>
      {/* Global meta tags */}
      <Head>
        <title>Recipe Sharing Platform</title>
        <meta
          name="description"
          content="A platform for sharing and discovering recipes."
        />
        <meta
          name="keywords"
          content="recipes, cooking, food, sharing, ratings, comments"
        />
        <meta name="author" content="Rohit" />
        <meta property="og:title" content="Tasty Tales" />
        <meta
          property="og:description"
          content="A platform for sharing and discovering recipes."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/ddaq6new3/image/upload/v1738040886/tasty-tales-images/yldiyagwj0peq0b862cw.pngttps://your-image-url.com/og-image.jpg"
        />
        <meta property="og:url" content="https://your-website.com" />
      </Head>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* React Query Provider */}
      <QueryClientProvider client={queryClient}>
        {/* Render the page component */}
        <Component {...pageProps} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

// Export with Redux wrapper for Next.js SSR/CSR compatibility
export default wrapper.withRedux(MyApp);
