import React, { useState, useEffect } from 'react';
import ProductsDisplay from '../../components/ProductDisplay/ProductDisplay';
import { useUser } from '../../context/UserContext';
import AddProduct from '../../components/AddProduct/AddProduct';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import ProductsFilter from '../../components/ProductFilter/ProductFilter';


function DashboardPage() {
    const [products, setProducts] = useState([]);
    const [filtredProducts, setFiltredProducts] = useState([]);
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
    setFiltredProducts(data);
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
    <div className="dashboard-container"> {/* Added class name for styling */}
    <h1>Dashboard</h1>
    {user ? (
       <div>
            <AddProduct setProducts={setProducts} user={user} />
            <ProductsFilter allProducts={products} filtredProducts={filtredProducts} setFiltredProducts={setFiltredProducts} />
            <ProductsDisplay products={filtredProducts} user={user} setProducts={setProducts} />
      </div>
    ) : (
        <>
            <p>You need to be logged in to view the products</p>
            <button onClick={handleBackToLogin} className="back-to-login-btn">Back To Login Page</button>
        </>
    )}
</div>
  );
}

export default DashboardPage;
