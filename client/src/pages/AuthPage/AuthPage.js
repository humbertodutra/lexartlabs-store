import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SingupForm/SingupForm';
import { useUser } from '../../context/UserContext';

function AuthPage() {
	const [ isLoginMode, setIsLoginMode ] = useState(true);
	const { isLogged } = useUser();

	const toggleMode = () => {
		setIsLoginMode(!isLoginMode);
	};

	const onSignupSuccess = () => {
		setIsLoginMode(true);
	};

	return (
		<div>
			{isLoginMode ? <LoginForm /> : <SignupForm onSignupSuccess={onSignupSuccess} />}
			<button onClick={toggleMode}>{isLoginMode ? 'Create Account' : 'I already have an account'}</button>
		</div>
	);
}

export default AuthPage;
