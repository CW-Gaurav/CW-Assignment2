import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Sorting from './components/Sorting';
import ProductList from './components/ProductList';
import './App.css';
import axios from "axios";

function App() {
  const [cars, setCars] = useState([]);  // cars state
  const [filteredCars, setFilteredCars] = useState([]);
  const [sortOrder, setSortOrder] = useState(''); // lowToHigh or highToLow

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://stg.carwale.com/api/stocks/');
        const carList = res.data.stocks.map(tem => ({
          id: tem.profileId,
          name: tem.carName,
          carPrice: tem.price,
          price: tem.priceNumeric,
          km: tem.km,
          fuel: tem.fuel,
          cityName: `${tem.areaName} ${tem.cityName}`,
          imageUrl: tem.imageUrl,
        }));

        setCars(carList); // Set the fetched car list to state
        setFilteredCars(carList); // Initialize filteredCars with all cars
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function
  }, []); // No dependencies, only run on mount

  // Function to calculate car counts by fuel type
  const calculateCarCountsByFuel = (cars) => {
    const counts = {};
    cars.forEach((car) => {
      counts[car.fuel] = (counts[car.fuel] || 0) + 1;
    });
    return counts;
  };

  const carCountsByFuel = calculateCarCountsByFuel(cars); // Calculate fuel counts

  // Handle filtering based on user input
  const handleFilterChange = (filters) => {
    let updatedCars = cars
      .filter(car => car.price >= filters.minPrice && car.price <= filters.maxPrice)
      .filter(car => filters.fuel.length === 0 || filters.fuel.includes(car.fuel));

    // Apply current sort order after filtering
    if (sortOrder === 'lowToHigh') {
      updatedCars = updatedCars.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      updatedCars = updatedCars.sort((a, b) => b.price - a.price);
    }

    setFilteredCars(updatedCars);
  };

  // Handle sorting changes
  const handleSortChange = (order) => {
    const sortedCars = [...filteredCars].sort((a, b) =>
      order === 'lowToHigh' ? a.price - b.price : b.price - a.price
    );
    setSortOrder(order); // Set the sort order
    setFilteredCars(sortedCars); // Update filtered cars with sorted ones
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
