import React, { useState } from 'react';

function AddProduct({ setProducts, user }) {
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    model: '',
    Variations: [{ color: '', price: '' }] 
  });

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleVariationChange = (index, e) => {
    const updatedVariations = newProduct.Variations.map((variation, i) => { 
      if (i === index) {
        return { ...variation, [e.target.name]: e.target.value };
      }
      return variation;
    });
    setNewProduct(prev => ({ ...prev, Variations: updatedVariations })); 
  };
  
  const addVariation = () => {
    setNewProduct(prev => ({
      ...prev,
      Variations: [...prev.Variations, { color: '', price: '' }] 
    }));
  };

  const removeVariation = (index) => {
    setNewProduct(prev => ({
      ...prev,
      Variations: prev.Variations.filter((_, i) => i !== index)
    }));
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Remove empty variations before submission
    const filteredVariations = newProduct.Variations.filter(variation => variation.color && variation.price);
    
    const productData = { ...newProduct, Variations: filteredVariations };

    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/products/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': user.token
      },
      body: JSON.stringify(productData)
    });

    if (response.ok) {
      const createdProduct = await response.json();
      setProducts(prevProducts => [...prevProducts, createdProduct]);
      alert("Product added successfully");
      setNewProduct({ name: '', brand: '', model: '', Variations: [{ color: '', price: '' }] });
      setShowForm(false);
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
            <input name="name" value={newProduct.name} onChange={handleProductChange} placeholder="Name" required />
          </div>
          <div className="form-group">
            <input name="brand" value={newProduct.brand} onChange={handleProductChange} placeholder="Brand" required />
          </div>
          <div className="form-group">
            <input name="model" value={newProduct.model} onChange={handleProductChange} placeholder="Model" required />
          </div>
          {newProduct.Variations.map((variation, index) => (
            <div key={index} className="form-group variation-group">
              <input name="color" value={variation.color} onChange={(e) => handleVariationChange(index, e)} placeholder="Color" required />
              <input name="price" type="number" value={variation.price} onChange={(e) => handleVariationChange(index, e)} placeholder="Price" required />
              {newProduct.Variations.length > 1 && (
                <button type="button" onClick={() => removeVariation(index)} className="remove-variation-btn">Remove</button>
              )}
              {newProduct.Variations.length - 1 === index && (
                <button type="button" onClick={addVariation} className="add-variation-btn">Add Another Variation</button>
              )}
            </div>
          ))}
          <button type="submit" id="submit-btn-product">Save Product</button>
        </form>
      )}
    </div>
  );
  
}

export default AddProduct;
