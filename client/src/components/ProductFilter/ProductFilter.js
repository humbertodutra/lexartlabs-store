import React, { useState, useEffect } from 'react'
import "./ProductsFilter.css"


function ProductsFilter({ setFiltredProducts, allProducts }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [orderByPrice, setOrderByPrice] = useState('none');
    const [currentFilters, setCurrentFilters] = useState({});
    const [showFilters, setShowFilters] = useState(false);
  
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
      // Update currentFilters whenever searchTerm or orderByPrice changes
      setCurrentFilters({
        searchTerm: searchTerm,
        orderByPrice: orderByPrice,
      });
    }, [searchTerm, orderByPrice]);
  
    const clearFilters = () => {
      setSearchTerm('');
      setOrderByPrice('none');
      setCurrentFilters({});
      setFiltredProducts(allProducts);
    };
  
    const isFilterApplied = () => {
      return currentFilters.searchTerm || currentFilters.orderByPrice !== 'none';
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };
  
    return (
        <div className="products-filter-container">
            <button onClick={toggleFilters} className="toggle-filters-btn">
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            {showFilters && ( // Conditional rendering based on showFilters state
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

            {isFilterApplied() && showFilters && ( // Show current filters only if filters are visible
                <div className="current-filters">
                    <h4>Current Filters:</h4>
                    <p>Search Term: {currentFilters.searchTerm || "None"}</p>
                    <p>Order By Price: {currentFilters.orderByPrice === 'lowToHigh' ? 'Low to High' : currentFilters.orderByPrice === 'highToLow' ? 'High to Low' : 'None'}</p>
                </div>
            )}
        </div>
    );
}

export default ProductsFilter;