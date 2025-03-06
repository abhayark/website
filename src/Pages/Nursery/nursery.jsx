import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import "./nursery.css";

const plants = [
  {
    id: 1,
    name: "Arcane Oak",
    description: "A tree infused with ancient magic.",
    image: "/Assets/oak.jfif",
  },
  {
    id: 2,
    name: "Mystic Rose",
    description: "Glows softly in the moonlight.",
    image: "/Assets/rose.jfif",
  },
  {
    id: 3,
    name: "Shadow Vine",
    description: "A creeping vine that moves at dusk.",
    image: "/Assets/vine.jpg",
  },
  {
    id: 4,
    name: "Crystal Bloom",
    description: "Its petals shimmer like diamonds.",
    image: "/Assets/bloom.jpg",
  },
  {
    id: 5,
    name: "Phoenix Fern",
    description: "Said to burst into flames and be reborn.",
    image: "/Assets/fern.jpg",
  },
];
export default function Nursery({ cart }) {
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
                  key={plant.id}
                  className="plant-item"
                  onClick={() => setSelectedPlant(plant)}
                >
                  <img src={plant.image} alt={plant.name} />
                  <div className="overlay">
                    <h2>{plant.name}</h2>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="plant-details">
              <div className="plant-image">
                <img src={selectedPlant.image} alt={selectedPlant.name} />
              </div>
              <div className="plant-info">
                <h2>{selectedPlant.name}</h2>
                <p>{selectedPlant.description}</p>
                <button onClick={() => setSelectedPlant(null)}>← Back</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
