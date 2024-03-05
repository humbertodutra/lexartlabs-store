import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SingupForm/SingupForm';
import { useUser } from '../../context/UserContext';


function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
const  {isLogged } = useUser();


  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };


  // Function to be called on successful signup
  const onSignupSuccess = () => {
    setIsLoginMode(true); // Switch back to login form
  };

  return (
    <div>
      {isLoginMode ? (
        <LoginForm />
      ) : (
        <SignupForm onSignupSuccess={onSignupSuccess} />
      )}
      <button onClick={toggleMode}>
        {isLoginMode ? 'Create Account' : 'Já tenho uma conta'}
      </button>
    </div>
  );
}

export default AuthPage;
