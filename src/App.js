  import React, { useState, useEffect } from 'react';
  import Filter from './components/Filter';
  import Sorting from './components/Sorting';
  import ProductList from './components/ProductList';
  import './App.css';
  import axios from "axios";

  function App() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [sortOrder, setSortOrder] = useState('');

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

          setCars(carList);
          setFilteredCars(carList);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);

    const calculateCarCountsByFuel = (cars) => {
      const counts = {};
      cars.forEach((car) => {
        counts[car.fuel] = (counts[car.fuel] || 0) + 1;
      });
      return counts;
    };

    const carCountsByFuel = calculateCarCountsByFuel(cars);

    const handleFilterChange = (filters) => {
      let updatedCars = cars
        .filter(car => car.price >= filters.minPrice && car.price <= filters.maxPrice)
        .filter(car => filters.fuel.length === 0 || filters.fuel.includes(car.fuel));

      if (sortOrder === 'lowToHigh') {
        updatedCars = updatedCars.sort((a, b) => a.price - b.price);
      } else if (sortOrder === 'highToLow') {
        updatedCars = updatedCars.sort((a, b) => b.price - a.price);
      }

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
