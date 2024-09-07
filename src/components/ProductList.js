import React from 'react';

const ProductList = ({ cars }) => {
  return (
    <div className="product-list grid-container">
      {cars.map((car) => (
        <div class="card">
        <div key={car.id} className="product">
          <img src={car.imageUrl}/>   
          <h3>{car.name}</h3>
          <h5 style={{color:'grey'}}>{car.km} km | {car.fuel} |{car.cityName}</h5>
          <h2>Rs: {car.carPrice}</h2>
          <h4 style={{ color: 'white', backgroundColor: 'red', textAlign: 'center', padding: '10px' }}>Get Seller Details</h4>
        </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
