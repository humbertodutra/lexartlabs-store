import React, { useState } from 'react';

function SignupForm({ onSignupSuccess }) { // Destructure the onSignupSuccess prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("The passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Signup Failed, your email is already used!');
      }

      await response.json();
      alert('Registration completed successfully!');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      onSignupSuccess();
    } catch (error) {
      console.error('Error when registering', error);
      alert(error.message);
    }
  };

  
  return (
    <form onSubmit={handleSignupSubmit}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>Confirm your password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default SignupForm;