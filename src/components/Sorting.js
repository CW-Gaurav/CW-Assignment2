import React from 'react';

const Sorting = ({ onSortChange }) => {
  return (
    <div className="sorting">
      <label>Sort by:</label>
      <select onChange={(e) => onSortChange(e.target.value)}>
        <option value="">Best Match</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>
    </div>
  );
};

export default Sorting;
