import React, { useState } from 'react';
import EditProductForm from '../EditProductForm/EditProductForm';

function ProductsDisplay({ products, onEdit, onDelete, user, setProducts }) {
	const [ editingProductId, setEditingProductId ] = useState(null);
  const [ detailsShownProductId, setDetailsShownProductId ] = useState(null);
  const toggleDetails = (productId) => {
		setDetailsShownProductId(detailsShownProductId === productId ? null : productId);
	};


	const handleEdit = (productId) => {
		setEditingProductId(productId);
	};

	const handleSave = async (updatedProduct) => {
		const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/products/${updatedProduct.productId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: user.token
			},
			body: JSON.stringify(updatedProduct)
		});

		if (response.ok) {
			alert('Product updated successfully');
		} else {
			console.error('Failed to update product:', await response.text());
		}
	};

	const handleCancel = () => {
		setEditingProductId(null);
	};

	const handleDelete = async (productId) => {
		const confirmDelete = window.confirm('Are you sure you want to delete this product?');
		if (confirmDelete) {
			try {
				const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/products/${productId}`, {
					method: 'DELETE',
					headers: {
						Authorization: user.token
					}
				});

				if (response.ok) {
					alert('Product deleted successfully');
					const updatedProducts = products.filter((product) => product.productId !== productId);
					setProducts(updatedProducts);
				} else {
					const error = await response.text();
					console.error('Failed to delete product:', error);
					alert('Failed to delete product');
				}
			} catch (error) {
				console.error('Error:', error);
				alert('An error occurred while deleting the product');
			}
		}
	};

	return (
<div className="products-container">
			{products.map((product) => (
				<div key={product.productId} className="product-row">
					<h2>{product.name}</h2>
					<button onClick={() => toggleDetails(product.productId)}>
						{detailsShownProductId === product.productId ? 'Hide Details' : 'Show Details'}
					</button>
					{detailsShownProductId === product.productId && (
						<>
							<p>Brand: {product.brand}</p>
							<p>Model: {product.model}</p>
							{product.Variations.map((variation, index) => (
								<div key={index} className="product-variation">
									<p>Color: {variation.color}</p>
									<p>Price: {variation.price} Euros</p>
								</div>
							))}
							<button className="edit-btn" onClick={() => handleEdit(product.productId)}>Edit</button>
							<button className="delete-btn" onClick={() => handleDelete(product.productId)}>Delete</button>
							{/* Conditionally render EditProductForm */}
							{editingProductId === product.productId && (
								<EditProductForm productDetails={product} onSave={handleSave} onCancel={handleCancel} />
							)}
						</>
					)}
				</div>
			))}
		</div>)
}

export default ProductsDisplay;
