import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import "./nursery.css";

export default function Nursery({ cart }) {
  const [plants, setNursery] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/services/nursery")
      .then((res) => res.json())
      .then((data) => setNursery(data))
      .catch((err) => console.error("Error fetching cabs:", err));
  }, []);

  const [selectedPlant, setSelectedPlant] = useState(null);
  return (
    <>
      <div className="nursery-container">
        <Navbar cartCount={cart.length} />
        <div className="nursery-wrapper">
          <div className="header">
            <h1> Garden </h1>
            <p>Discover the wonders of flora.</p>
          </div>
          {!selectedPlant ? (
            <div className="plant-showcase">
              {plants.map((plant) => (
                <div
                  key={plant._id}
                  className="plant-item"
                  onClick={() => setSelectedPlant(plant)}
                >
                  <img src={plant.image} alt={plant.service_name} />
                  <div className="overlay">
                    <h2>{plant.service_name}</h2>
                    <p className="price">
                      ₹{Number(plant.price).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="plant-details">
              <div className="plant-image">
                <img
                  src={selectedPlant.image}
                  alt={selectedPlant.service_name}
                />
              </div>
              <div className="plant-info">
                <h2>{selectedPlant.service_name}</h2>
                <p>{selectedPlant.description}</p>
                <p className="price">
                  ₹{Number(selectedPlant.price).toLocaleString("en-IN")}
                </p>

                <button onClick={() => setSelectedPlant(null)}>← Back</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
