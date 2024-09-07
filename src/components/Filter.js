import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000000);
  const [fuel, setFuel] = useState([]);

  const handleFilter = () => {
    onFilterChange({
      minPrice,
      maxPrice,
      fuel,
    });
  };

  // Handle resetting all fields
  const handleReset = () => {
    setMinPrice(0);        // Reset min price to default
    setMaxPrice(5000000000);     // Reset max price to default
    setFuel([]);            // Clear fuel selection
    onFilterChange({
      minPrice: 0,
      maxPrice: 5000000000,
      fuel: [],
    });
  };

  const handleFuelChange = (fuelType) => {
    setFuel((prevFuel) => {
      if (prevFuel.includes(fuelType)) {
        return prevFuel.filter((item) => item !== fuelType);
      } else {
        return [...prevFuel, fuelType];
      }
    });
  };

  return (
    <div className="filter">
      <div className="filter-header">
        <h2>Filters</h2>
        <button type="button" onClick={handleReset} className="clear-button">Clear All</button>
      </div>
      <div className="filter-group">
        <label>Price Range</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          placeholder="Min Price"
          style={{ width: '100px' }}
        />
         -
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          placeholder="Max Price"
          style={{ width: '100px' }}
        />
      </div>
      <div className="filter-group">
        <label>Fuel Type</label>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {['Petrol', 'Diesel', 'CNG', 'LPG', 'EV'].map(fuelType => (
            <label key={fuelType}>
              <input
                type="checkbox"
                checked={fuel.includes(fuelType)}
                onChange={() => handleFuelChange(fuelType)}
              /> {fuelType}
            </label>
          ))}
        </div>
      </div>
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
};

export default Filter;
