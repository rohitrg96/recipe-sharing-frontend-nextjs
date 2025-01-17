import React from "react";
import LoginForm from "@components/Auth/LoginForm"; // Import LoginForm component

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <h1 className="text-center m-5">Login to Recipe Sharing</h1>
      <LoginForm /> {/* Render the LoginForm component */}
    </div>
  );
};

export default LoginPage;
