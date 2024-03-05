import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser(); 


const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:5000/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Falha no login!');
      }

      const data = await response.json();
      console.log(data);
      login(data);

    } catch (error) {
      console.error('Erro ao fazer login:', error);
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
