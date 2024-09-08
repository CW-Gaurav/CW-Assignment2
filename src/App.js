import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Sorting from './components/Sorting';
import ProductList from './components/ProductList';
import './App.css';
import axios from "axios"

const cars = [
  {
    id: "D2102346",
    name: "BMW 5-Series 520d Sedan",
    dealerId: 3753,
    rootId: 20,
    rootName: "5-Series",
    url: "/used/bmw-5-series-cars-in-mumbai/5b8eda5200508173628/",
    makeYear: 2011,
    carPrice: "10.95 Lakh",
    price: 1095000,
    km: "60,000",
    fuel: "Diesel",
    cityName: "Mumbai",
    imageUrl: "https://imgd.aeplcdn.com/300x225/cw/ucp/stockApiImg/VV0KWND_1890100_1_16441946.jpeg",
    transmission: "Automatic",
    sellerName: "Closed Bonnet"
  },
  {
    id: "D2066263",
    name: "Maruti Suzuki Wagon R LXi",
    dealerId: 30258,
    rootId: 313,
    rootName: "Wagon R",
    url: "/used/maruti-suzuki-wagon-r-cars-in-mumbai/a7bc9a7200508173539/",
    makeYear : 2012,
    carPrice: "2.64 Lakh",
    price: 264000,
    km: "62,000",
    fuel: "Petrol",
    cityName: "Mumbai",
    imageUrl: "https://imgd.aeplcdn.com/300x225/cw/ucp/stockApiImg/W4IBVQB_1850858_1_15978694.jpeg",
    transmission: "Manual",
    sellerName: "CarTrade"
  },
  {
    id: "D2100030",
    name: "Mercedes-Benz C-Class 230 Avantgarde",
    dealerId: 22479,
    rootId: 65,
    rootName: "C-Class",
    url: "/used/mercedes-benz-c-class-cars-in-mumbai/b65c6af200508173617/",
    makeYear: 2009,
    carPrice: "6.95 Lakh",
    price: 695000,
    km: "47,074",
    fuel: "Petrol",
    cityName: "Mumbai",
    imageUrl: "https://imgd.aeplcdn.com/300x225/cw/ucp/stockApiImg/8H051H7_1887562_1_16419965.jpeg",
    transmission: "Automatic",
    sellerName: "Navnit Motors"
  },
  {
    id: "D2111947",
    name: "Honda City 1.5 V MT",
    dealerId: 7293,
    rootId: 74,
    rootName: "City",
    url: "/used/honda-city-cars-in-pune/509d806200508173743/",
    makeYear: 2013,
    carPrice: "4 Lakh",
    price:400000,
    km: "41,000",
    fuel: "Petrol",
    cityName: "Pune",
    imageUrl: "https://imgd.aeplcdn.com/300x225/cw/ucp/stockApiImg/ACSNR3P_1900574_1_16564367.jpeg",
    transmission: "Manual",
    sellerName: "Standard Motors"
  },
  {
    id: "D2113521",
    name: "Nissan Terrano XE (D)",
    dealerId: 9622,
    rootId: 294,
    rootName: "Terrano",
    url: "/used/nissan-terrano-cars-in-bhopal/ab62d94200508173802/",
    makeYear: 2014,
    carPrice: "5.25 Lakh",
    price: 525000,
    km: "75,000",
    fuel: "Diesel",
    cityName: "Bhopal",
    imageUrl: "https://imgd.aeplcdn.com/300x225/cw/ucp/stockApiImg/FOGH83I_1902243_1_16583391.jpeg",
    transmission: "Manual",
    sellerName: "Rajdhani Car Zone"
  },
  {
    id: "D2124006",
    name: "Land Rover Range Rover Sport V8 SC Autobiography",
    dealerId: 21570,
    rootId: 240,
    rootName: "Range Rover Sport",
    url: "/used/landrover-range-rover-sport-cars-in-gurgaon/ae7822c200508174041/",
    makeYear: 2018 ,
    carPrice: "1.6 Crore",
    price: 16000000,
    km: "6,000",
    fuel: "Petrol",
    cityName: "Gurgaon",
    imageUrl: "https://imgd.aeplcdn.com/300x225/cw/ucp/stockApiImg/ACSNR3P_1900574_1_16564367.jpeg",
    transmission: "Automatic",
    sellerName: "Land Rover"
  }
];


function App() {
  const [filteredCars, setFilteredCars] = useState(cars);
  const [sortOrder, setSortOrder] = useState(''); // lowToHigh or highToLow

  // Function to calculate car counts by fuel type
  const calculateCarCountsByFuel = (cars) => {
    const counts = {};
    cars.forEach((car) => {
      counts[car.fuel] = (counts[car.fuel] || 0) + 1;
    });
    return counts;
  };

  // Calculate the fuel counts based on the filtered cars
  const carCountsByFuel = calculateCarCountsByFuel(cars);

  const handleFilterChange = (filters) => {
    let updatedCars = cars
      .filter(car => car.price >= filters.minPrice && car.price <= filters.maxPrice)
      .filter(car => filters.fuel.length === 0 || filters.fuel.includes(car.fuel));
    setFilteredCars(updatedCars);
  };

  const handleSortChange = (order) => {
    const sortedCars = [...filteredCars].sort((a, b) =>
      order === 'lowToHigh' ? a.price - b.price : b.price - a.price
    );
    setSortOrder(order);
    setFilteredCars(sortedCars);
  };

  return (
    <div className="app">
      <Sorting onSortChange={handleSortChange} />
      <div className="main-content">
        <Filter onFilterChange={handleFilterChange} carCountsByFuel={carCountsByFuel} />
        <ProductList cars={filteredCars} />
      </div>
    </div>
  );
}

export default App;