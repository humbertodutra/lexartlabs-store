import React, { useState } from 'react';
import EditProductForm from '../EditProductForm/EditProductForm'; // Ensure the path is correct

function ProductsDisplay({ products, onEdit, onDelete, user, setProducts }) {
  const [editingProductId, setEditingProductId] = useState(null);

  const handleEdit = (productId) => {
    setEditingProductId(productId);
  };

  const handleSave = async (updatedProduct) => {
  
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/products/${updatedProduct.productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': user.token,
      },
      body: JSON.stringify(updatedProduct),
    });
  
    if (response.ok) {
      alert("Product updated successfully");
   
    } else {
      console.error('Failed to update product:', await response.text()); // Log more detailed error
    }
  };

  const handleCancel = () => {
    setEditingProductId(null); // Reset the editing product ID
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': user.token, // Make sure the authorization token is included
          },
        });
  
        if (response.ok) {
          // Successfully deleted the product
          alert("Product deleted successfully");
          // Optionally: remove the deleted product from the state to update UI
          const updatedProducts = products.filter(product => product.productId !== productId);
          setProducts(updatedProducts); // Assuming you have a state called products to store the product list
          // setProducts(updatedProducts); // Assuming you have a state called products to store the product list
          console.log("Product deleted:", productId);
        } else {
          // Handle failure
          const error = await response.text();
          console.error('Failed to delete product:', error);
          alert("Failed to delete product");
        }
      } catch (error) {
        console.error('Error:', error);
        alert("An error occurred while deleting the product");
      }
    }
  };
  

  return (
    <div>
      {products.map(product => (
        <div key={product.productId}>
          <h2>{product.name}</h2>
          <p>Brand: {product.brand}</p>
          <p>Model: {product.model}</p>
          {product.Variations.map((variation, index) => (
            <div key={index}>
              <p>Color: {variation.color}</p>
              <p>Price: {variation.price} Euros</p>
            </div>
          ))}
          <button onClick={() => handleEdit(product.productId)}>Edit</button>
          <button onClick={() => handleDelete(product.productId)}>Delete</button>
          {/* Render EditProductForm below the buttons for the currently editing product */}
          {editingProductId === product.productId && (
            <EditProductForm
              productDetails={product}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ProductsDisplay;
