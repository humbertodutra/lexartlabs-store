import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';

function LoginForm() {
	const navigate = useNavigate();
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const { login, setIsLogged } = useUser();

	const handleLoginSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/users/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			if (!response.ok) {
				throw new Error('Login Failed');
			}

			const data = await response.json();

			login(data);
			setIsLogged(true);
			alert('Login successfully');
			navigate('/dashboard');
		} catch (error) {
			console.error('Error when logging in', error);
			alert(error.message);
		}
	};

	return (
		<form onSubmit={handleLoginSubmit}>
			<div>
				<label>Email:</label>
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
			</div>
			<div>
				<label>Senha:</label>
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
			</div>
			<button type="submit">Login</button>
		</form>
	);
}

export default LoginForm;
