import React from 'react';

/**
 * LoginModal Component
 * A modal prompting the user to log in before accessing recipe details.
 * Props:
 * - `onClose`: Function to close the modal.
 * - `onLogin`: Function to redirect the user to the login page.
 */
const LoginModal: React.FC<{ onClose: () => void; onLogin: () => void }> = ({
  onClose,
  onLogin,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-96 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          You need to log in!
        </h2>
        <p className="text-gray-600 mb-6">
          Please log in to view the details of this recipe.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            data-testid="login-redirect"
            onClick={onLogin}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
