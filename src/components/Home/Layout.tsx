import React, { ReactNode, Suspense, lazy } from 'react';

// Lazy load Navbar and Footer
const Navbar = lazy(() => import('./Navbar'));
const Footer = lazy(() => import('./Footer'));

interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout Component
 *
 * This component provides a shared layout structure for the application.
 * It includes the Navbar, main content, and Footer sections.
 * Navbar and Footer are lazy-loaded for optimized performance.
 *
 * Props:
 * - `children` (ReactNode): The main content to be displayed between Navbar and Footer.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbar />
      </Suspense>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <Suspense fallback={<div>Loading Footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Layout;
