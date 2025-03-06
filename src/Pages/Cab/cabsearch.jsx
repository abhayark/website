import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./cabbing.css";

const allCabs = [
  {
    id: 1,
    car: "Toyota Camry",
    driver: "John Doe",
    rating: 4.5,
    image: "/Assets/toyota.jpg",
  },
  {
    id: 2,
    car: "Honda Accord",
    driver: "Jane Smith",
    rating: 4.7,
    image: "/Assets/honda.jpg",
  },
  {
    id: 3,
    car: "Tesla Model 3",
    driver: "Alice Brown",
    rating: 4.9,
    image: "/Assets/tesla.jpg",
  },
];

export default function CabSearch({ cart }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query")?.toLowerCase() || "";
  const goto = useNavigate();

  const filteredCabs = allCabs.filter((cab) =>
    cab.car.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      <div className="cab-container">
        <Navbar cartCount={cart?.length || 0} />
        <h2>Search Results for "{searchQuery}"</h2>
        <div className="cab-grid">
          {filteredCabs.length > 0 ? (
            filteredCabs.map((cab) => (
              <div
                key={cab.id}
                className="cab-card"
                onClick={() => {
                  goto(`/cab`);
                }}
              >
                <img className="cab-image" src={cab.image} alt={cab.car} />
                <h2>{cab.car}</h2>
                <p>Driver: {cab.driver}</p>
                <p>Rating: {cab.rating}</p>
              </div>
            ))
          ) : (
            <p>No cabs found.</p>
          )}
        </div>
      </div>
    </>
  );
}
