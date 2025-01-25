import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import '../styles/global.css'; // Import the global CSS file
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      {/* ToastContainer for global toast notifications */}
      <ToastContainer
        position="top-right" // Default position for toasts
        autoClose={3000} // Auto-close after 3 seconds
        hideProgressBar={false} // Show the progress bar
        newestOnTop={true} // Display newest toast on top
        closeOnClick // Close toast when clicked
        rtl={false} // Enable/disable right-to-left layout
        pauseOnFocusLoss // Pause toast auto-close on window focus loss
        draggable // Allow dragging to dismiss
        pauseOnHover // Pause toast auto-close on hover
        theme="light" // Set the theme (light/dark)
      />

      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
