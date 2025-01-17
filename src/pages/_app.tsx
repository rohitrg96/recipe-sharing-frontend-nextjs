import { AppProps } from "next/app"; // Import the type for Next.js app props
import "../styles/global.css"; // Import the global CSS file

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
