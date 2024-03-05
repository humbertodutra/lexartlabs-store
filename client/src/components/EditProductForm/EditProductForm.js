import React, { useState, useEffect } from 'react';

function EditProductForm({ productDetails, onSave, onCancel }) {
  const [product, setProduct] = useState({ ...productDetails });

  useEffect(() => {
    setProduct({ ...productDetails });
  }, [productDetails]);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleVariationChange = (index, field, value) => {
    const updatedVariations = product.Variations.map((variation, i) => {
      if (i === index) {
        return { ...variation, [field]: value };
      }
      return variation;
    });
    setProduct(prev => ({ ...prev, Variations: updatedVariations }));
  };

  const handleAddVariation = () => {
    const newVariation = { color: '', price: 0 }; // Initialize with empty or default values
    setProduct(prev => ({
      ...prev,
      Variations: [...prev.Variations, newVariation],
    }));
  };

  const handleRemoveVariation = (index) => {
    setProduct(prev => ({
      ...prev,
      Variations: prev.Variations.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="edit-product-form">
      <input name="name" value={product.name || ''} onChange={handleProductChange} placeholder="Name" />
      <input name="brand" value={product.brand || ''} onChange={handleProductChange} placeholder="Brand" />
      <input name="model" value={product.model || ''} onChange={handleProductChange} placeholder="Model" />

      <div>
        {product.Variations && product.Variations.map((variation, index) => (
          <div key={index}>
            <input name={`color-${index}`} value={variation.color || ''} onChange={(e) => handleVariationChange(index, 'color', e.target.value)} placeholder="Color" />
            <input name={`price-${index}`} type="number" value={variation.price || 0} onChange={(e) => handleVariationChange(index, 'price', parseInt(e.target.value, 10))} placeholder="Price" />
            <button type="button" onClick={() => handleRemoveVariation(index)}>Remove Variation</button>
          </div>
        ))}
        <button type="button" onClick={handleAddVariation}>Add Variation</button>
      </div>

      <button type="button" onClick={() => onSave(product)}>Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default EditProductForm;
