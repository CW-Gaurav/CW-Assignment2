import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders a car from the list', () => {
  render(<App />);
  
  // Check if a specific car is rendered
  const carElement = screen.getByText(/Pratham/i); // Using a car name from the provided list
  expect(carElement).toBeInTheDocument();
});
