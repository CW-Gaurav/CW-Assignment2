import React, { useState, useEffect } from 'react';

const Filter = ({ onFilterChange, carCountsByFuel }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000000);
  const [fuel, setFuel] = useState([]);

  // Apply filters whenever any filter changes
  useEffect(() => {
    if (minPrice > maxPrice) {
      alert("Start price cannot be greater than end price!");
    } else {
      onFilterChange({
        minPrice,
        maxPrice,
        fuel,
      });
    }
  }, [minPrice, maxPrice, fuel]);

  // Handle resetting all fields
  const handleReset = () => {
    setMinPrice(0);        // Reset min price to default
    setMaxPrice(5000000000);     // Reset max price to default
    setFuel([]);            // Clear fuel selection
  };

  // Handle fuel type changes
  const handleFuelChange = (fuelType) => {
    setFuel((prevFuel) => {
      if (prevFuel.includes(fuelType)) {
        return prevFuel.filter((item) => item !== fuelType);
      } else {
        return [...prevFuel, fuelType];
      }
    });
  };

  // Handle minimum price input
  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    if (value < 0) {
      alert("Minimum price cannot be negative!");
      return;
    }
    setMinPrice(value);
  };

  // Handle maximum price input
  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    if (value < 0) {
      alert("Maximum price cannot be negative!");
      return;
    }
    setMaxPrice(value);
  };

  return (
    <div className="filter">
      <div className="filter-header">
        <img 
          src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTooS0LiR6o71lcucFFTwQLJrAfhUVhjpSfLRgWwbW5ihMkIdnn" 
          alt="description" 
          style={{ width: '20px', height: '20px', marginRight: '8px' }} 
        />
        <h2 style={{ margin: 0 }}>Filters</h2>
        <button type="button" onClick={handleReset} className="clear-button" style={{ marginLeft: 'auto' }}>
          Clear All
        </button>
      </div>
      <div className="filter-group">
        <label>Price Range</label>
        <input
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          placeholder="Min Price"
          style={{ width: '100px' }}
        />
         -
        <input
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          placeholder="Max Price"
          style={{ width: '100px' }}
        />
      </div>
      <div className="filter-group">
        <label style={{ marginBottom: '8px' }}>Fuel Type</label>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {['Petrol', 'Diesel', 'CNG', 'LPG', 'EV'].map(fuelType => (
            <label key={fuelType} style={{ marginBottom: '8px' }}>
              <input
                type="checkbox"
                checked={fuel.includes(fuelType)}
                onChange={() => handleFuelChange(fuelType)}
              />
              {fuelType} ({carCountsByFuel[fuelType] || 0})
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
