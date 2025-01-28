import React from 'react';

interface AuthRedirectLinksProps {
  linkText1: string;
  linkText2: string;
  onLinkClick1: () => void;
  onLinkClick2: () => void;
}

const AuthRedirectLinks: React.FC<AuthRedirectLinksProps> = ({
  linkText1,
  linkText2,
  onLinkClick1,
  onLinkClick2,
}) => {
  return (
    <div className="mt-4 text-center">
      <p className="text-sm text-gray-600">
        <button
          onClick={onLinkClick1}
          className="text-blue-500 hover:underline"
        >
          {linkText1}
        </button>
      </p>
      <p className="text-sm text-gray-600 mt-2">
        <button
          onClick={onLinkClick2}
          className="text-blue-500 hover:underline"
        >
          {linkText2}
        </button>
      </p>
    </div>
  );
};

export default AuthRedirectLinks;
