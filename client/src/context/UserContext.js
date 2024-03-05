// src/contexts/UserContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const verifyToken = async () => {
    const storedUser = localStorage.getItem('user');
    console.log('storedUser', storedUser)
    if (storedUser) {
      const { token } = JSON.parse(storedUser);
      console.log('token', token)

      try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/users/verifyToken`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': token
          },
        });

        console.log(response);
        setIsLogged(true)

        if (!response.ok) {
          throw new Error('Token validation failed');
        }

        // If the token is still valid, update the user state
        setUser(JSON.parse(storedUser));
        console.log(user)
      } catch (error) {
        console.error('Error verifying token:', error);
        logout(); // Logout the user if token verification fails
      }
    }
  };

  useEffect(() => {
    console.log('UserProvider mounted');
    console.log('Verifying token...');

    verifyToken();
    console.log('Token verified');
    console.log(user)

  }, []);

  const login = (userData) => {
    const { email, token } = userData;
    const userInfo = { email, token, isLogged: true };
    setUser(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLogged,setIsLogged }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
