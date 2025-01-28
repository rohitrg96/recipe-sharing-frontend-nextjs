import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { wrapper } from '@/store/store'; // Import the wrapper
import '../styles/global.css'; // Import global styles
import { ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from '@components/ErrorBoundry/ErrorBoundary'; // Import ErrorBoundary

function MyApp({ Component, pageProps }: AppProps) {
  // Initialize React Query client
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ErrorBoundary>
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
