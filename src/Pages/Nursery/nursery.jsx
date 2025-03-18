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

  const handlePlantOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in to order a plant.");
      return;
    }

    if (!selectedPlant) {
      alert("Please select a plant.");
      return;
    }

    const orderData = {
      customerName: user.username || "Unknown User",
      email: user.email,
      phone: user.mobile || "N/A",
      service: "Nursery",
      serviceId: selectedPlant._id,
      serviceName: selectedPlant.service_name,
      price: selectedPlant.price,
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Plant ordered successfully!");
      } else {
        alert("Failed to order plant: " + result.error);
      }
    } catch (error) {
      console.error("Error ordering plant:", error);
    }
  };

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
                <button onClick={handlePlantOrder}>Order Plant</button>

                <button onClick={() => setSelectedPlant(null)}>← Back</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
