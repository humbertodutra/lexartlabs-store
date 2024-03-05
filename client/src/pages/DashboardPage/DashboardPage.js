import React, { useState, useEffect } from 'react';
import ProductsDisplay from '../../components/ProductDisplay/ProductDisplay';
import { useUser } from '../../context/UserContext';
import AddProduct from '../../components/AddProduct/AddProduct';

function DashboardPage() {
  const [products, setProducts] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    console.log('userrrrrrrrrrrrrrrrr', user);
   

const fetchProducts = async () => {
  if (user && user.token) {
    const response = await fetch('http://localhost:5000/api/products/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': user.token
      }
    });

    if (!response.ok) {
    
      console.error("Falha ao buscar produtos:", response.statusText);
  
      return;
    }

    const data = await response.json();
    console.log('data', data);
    setProducts(data);
  } else {
    console.log("Token de usuário não disponível");
  
  }
};

    if (user) {
      fetchProducts();
    }
  }, [user]);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <>
        <AddProduct setProducts={setProducts} user={user} />
        <ProductsDisplay products={products} user={user} setProducts={setProducts} />
        </>
      ) : (
        <p>Você precisa estar logado para ver os produtos.</p>
      )}
    </div>
  );
}

export default DashboardPage;
