import React, { useState, useEffect } from 'react'



function ProductsFilter({ setFiltredProducts, allProducts, filtredProducts }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [orderByPrice, setOrderByPrice] = useState('none');
    const [currentFilters, setCurrentFilters] = useState({});
    const [showFilters, setShowFilters] = useState(false);
    const [brandFilter, setBrandFilter] = useState('');
    const [modelFilter, setModelFilter] = useState('');
    const [colorFilter, setColorFilter] = useState('');
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [colors, setColors] = useState([])

    useEffect(() => {
      const brandsSet = new Set();
      const modelsSet = new Set();
      const colorsSet = new Set();

      allProducts.forEach(product => {
          brandsSet.add(product.brand);
          modelsSet.add(product.model);
          product.Variations.forEach(variation => {
              colorsSet.add(variation.color);
          });
      });

      setBrands([...brandsSet]);
      setModels([...modelsSet]);
      setColors([...colorsSet]);
  }, [allProducts]);
    
  
    // Define filterProducts outside of useEffect so it's accessible as an onClick handler
    const filterProducts = () => {
        setFiltredProducts((currentProducts) => {
          let filtered = [...currentProducts]; // Create a fresh copy of the current products
      
          if (searchTerm) {
            filtered = filtered.filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.Variations.some((variation) =>
                variation.color.toLowerCase().includes(searchTerm.toLowerCase())
              )
            );
          }
          if (brandFilter) {
            if (brandFilter !== 'All Brands'){
              filtered = allProducts
            }
            filtered = filtered.filter(product => product.brand === brandFilter);
        }

        if (modelFilter) {
            if (modelFilter !== 'All Models') {filtered = allProducts}
            filtered = filtered.filter(product => product.model === modelFilter);
        }

        if (colorFilter) {
            if (colorFilter !== 'All Colors') {filtered = allProducts}
            filtered = filtered.filter(product =>
                product.Variations.some(variation => variation.color === colorFilter)
            );
        }
      
          if (orderByPrice === 'lowToHigh') {
            filtered.sort((a, b) => {
              return Math.min(...a.Variations.map(v => v.price)) - Math.min(...b.Variations.map(v => v.price));
            });
          } else if (orderByPrice === 'highToLow') {
            filtered.sort((a, b) => {
              return Math.max(...b.Variations.map(v => v.price)) - Math.max(...a.Variations.map(v => v.price));
            });
          }
      
          return filtered; // This filtered array will be the new state
        });
      };
  
      useEffect(() => {
        setCurrentFilters({
            searchTerm,
            orderByPrice,
            brandFilter,
            modelFilter,
            colorFilter,
        });
    }, [searchTerm, orderByPrice, brandFilter, modelFilter, colorFilter]);

       const clearFilters = () => {
        setSearchTerm('');
        setOrderByPrice('none');
        setBrandFilter('');
        setModelFilter('');
        setColorFilter('');
        setCurrentFilters({});
        setFiltredProducts(allProducts);
    };
    const isFilterApplied = () => {
      return currentFilters.searchTerm || currentFilters.orderByPrice !== 'none' || currentFilters.brandFilter || currentFilters.modelFilter || currentFilters.colorFilter;
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };
  
    return (
      <div className="">
          <button onClick={toggleFilters} className="toggle-form-btn">
              {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
  
          {showFilters && (
              <>
                  <div className="filter-group">
                      <label htmlFor="search" className="filter-label">Search:</label>
                      <input
                          id="search"
                          type="text"
                          placeholder="Search by Name, Brand, Model, Color..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="filter-input"
                      />
                  </div>
  
                  <div className="filter-group">
                      <label htmlFor="brand-filter" className="filter-label">Brand:</label>
                      <select
                          id="brand-filter"
                          value={brandFilter}
                          onChange={(e) => setBrandFilter(e.target.value)}
                          className="filter-select"
                      >
                          <option value="">All Brands</option>
                          {brands.map(brand => (
                              <option key={brand} value={brand}>{brand}</option>
                          ))}
                      </select>
                  </div>
  
                  <div className="filter-group">
                      <label htmlFor="model-filter" className="filter-label">Model:</label>
                      <select
                          id="model-filter"
                          value={modelFilter}
                          onChange={(e) => setModelFilter(e.target.value)}
                          className="filter-select"
                      >
                          <option value="">All Models</option>
                          {models.map(model => (
                              <option key={model} value={model}>{model}</option>
                          ))}
                      </select>
                  </div>
  
                  <div className="filter-group">
                      <label htmlFor="color-filter" className="filter-label">Color:</label>
                      <select
                          id="color-filter"
                          value={colorFilter}
                          onChange={(e) => setColorFilter(e.target.value)}
                          className="filter-select"
                      >
                          <option value="">All Colors</option>
                          {colors.map(color => (
                              <option key={color} value={color}>{color}</option>
                          ))}
                      </select>
                  </div>
  
                  <div className="filter-group">
                      <label htmlFor="order-by-price" className="filter-label">Order by Price:</label>
                      <select
                          id="order-by-price"
                          value={orderByPrice}
                          onChange={(e) => setOrderByPrice(e.target.value)}
                          className="filter-select"
                      >
                          <option value="none">Select...</option>
                          <option value="lowToHigh">Low to High</option>
                          <option value="highToLow">High to Low</option>
                      </select>
                  </div>
  
                  <button onClick={filterProducts} className="filter-apply-btn">Apply Filters</button>
                  <button onClick={clearFilters} className="filter-clear-btn">Clear Filters</button>
              </>
          )}
  
          {isFilterApplied() && showFilters && (
              <div className="current-filters">
                  <h4>Current Filters:</h4>
                  <p>Search Term: {currentFilters.searchTerm || "None"}</p>
                  <p>Brand: {currentFilters.brandFilter || "All"}</p>
                  <p>Model: {currentFilters.modelFilter || "All"}</p>
                  <p>Color: {currentFilters.colorFilter || "All"}</p>
                  <p>Order By Price: {currentFilters.orderByPrice === 'lowToHigh' ? 'Low to High' : currentFilters.orderByPrice === 'highToLow' ? 'High to Low' : 'None'}</p>
              </div>
          )}
      </div>
  );
  
}

export default ProductsFilter;