import React, { useState, useEffect } from 'react';
import ProductsDisplay from '../../components/ProductDisplay/ProductDisplay';
import { useUser } from '../../context/UserContext';
import AddProduct from '../../components/AddProduct/AddProduct';
import { useNavigate } from 'react-router-dom';


function DashboardPage() {
    const [products, setProducts] = useState([]);
    const { user } = useUser();
    const navigate = useNavigate();
    
  useEffect(() => {
  
   

const fetchProducts = async () => {
  if (user && user.token) {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/products/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': user.token
      }
    });

    if (!response.ok) {
    
      console.error("Failed to search for products:", response.statusText);
  
      return;
    }

    const data = await response.json();
    setProducts(data);
  } else {
    console.log("User token not available");
  
  }
};

    if (user) {
      fetchProducts();
    }
  }, [user]);

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <>
        <AddProduct setProducts={setProducts} user={user} />
        <ProductsDisplay products={products} user={user} setProducts={setProducts} />
        </>
      ) : (
        <>
        <p>You need to be logged in to view the products</p>
        <button onClick={handleBackToLogin}>Back To Login Page</button>
        </>
      )}
    </div>
  );
}

export default DashboardPage;
