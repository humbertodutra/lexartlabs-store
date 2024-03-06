import React, { useState } from 'react';

function AddProduct({ setProducts, user }) {
  const [showForm, setShowForm] = useState(false); // State to control the form's visibility
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    model: '',
    color: '', // Assuming a single variation for simplicity
    price: ''  // Assuming a single variation for simplicity
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...newProduct,
      Variations: [{ color: newProduct.color, price: parseFloat(newProduct.price) }] 
    };

    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/products/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': user.token
      },
      body: JSON.stringify(productData)
    });

    if (response.ok) {
      const createdProduct = await response.json()
      setProducts(prevProducts => [...prevProducts, createdProduct]);
      setNewProduct({ name: '', brand: '', model: '', color: '', price: '' }); // Reset form fields
      setShowForm(false);
      alert("Product added successfully");
    } else {
      console.error("Failed to add product:", await response.text());
    }
  };

  return (
    <div className="add-product-container">
      <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Add Product Form' : 'Show Add Product Form'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group">
            <input name="name" value={newProduct.name} onChange={handleChange} placeholder="Name" required />
          </div>
          <div className="form-group">
            <input name="brand" value={newProduct.brand} onChange={handleChange} placeholder="Brand" required />
          </div>
          <div className="form-group">
            <input name="model" value={newProduct.model} onChange={handleChange} placeholder="Model" required />
          </div>
          <div className="form-group">
            <input name="color" value={newProduct.color} onChange={handleChange} placeholder="Color" required />
          </div>
          <div className="form-group">
            <input name="price" type="number" value={newProduct.price} onChange={handleChange} placeholder="Price" required />
          </div>
          <button type="submit" className="submit-btn">Add Product</button>
        </form>
      )}
    </div>
  );
}

export default AddProduct;
