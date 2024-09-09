import React from 'react';

const ProductList = ({ cars }) => {
  // Default fallback image URL
  const defaultImageUrl = "https://via.placeholder.com/300x225?text=No+Image";

  return (
    <div className="product-list grid-container">
      {cars.map((car) => (
        <div key={car.id} className="card">
          <div className="product">
            <img
              src={car.imageUrl}
              alt={car.name}
              onError={(e) => {
                e.target.onerror = null; // Prevents infinite loop in case default image also fails
                e.target.src = defaultImageUrl; // Set fallback image
              }}
            />
            <h3>{car.name}</h3>
            <h5 style={{ color: 'grey' }}>
              {car.km} km | {car.fuel} | {car.cityName}
            </h5>
            <h2>Rs: {car.carPrice}</h2>
            <h4
              style={{
                color: 'white',
                backgroundColor: 'red',
                textAlign: 'center',
                padding: '10px',
              }}
            >
              Get Seller Details
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
