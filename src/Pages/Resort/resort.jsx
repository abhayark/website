import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import "./resort.css";

const resorts = [
  {
    id: 1,
    name: "Paradise Cove",
    location: "Bali, Indonesia",
    rating: 4.8,
    image: "/Assets/resor.jpg",
    price: "₹50,000/night",
  },
  {
    id: 2,
    name: "Crystal Lagoon",
    location: "Maldives",
    rating: 4.9,
    image: "/Assets/resor.jpg",
    price: "₹20,000/night",
  },
  {
    id: 3,
    name: "Sky Retreat",
    location: "Santorini, Greece",
    rating: 4.7,
    image: "/Assets/resor.jpg",
    price: "₹35,000/night",
  },
  {
    id: 4,
    name: "Jungle Escape",
    location: "Costa Rica",
    rating: 4.6,
    image: "/Assets/resor.jpg",
    price: "₹40,000/night",
  },
];

export default function ResortBooking({ cart }) {
  const [selectedResort, setSelectedResort] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  return (
    <div className="resort-container">
      <Navbar cartCount={cart.length} />
      <h1>Resort Booking</h1>
      <p>Luxury stays, unforgettable experiences.</p>

      {!selectedResort ? (
        <div className="resort-grid">
          {resorts.map((resort) => (
            <div
              className="resort-card"
              key={resort.id}
              onClick={() => setSelectedResort(resort)}
            >
              <img
                className="resort-image"
                src={resort.image}
                alt={resort.name}
              />
              <h2>{resort.name}</h2>
              <p>{resort.location}</p>
              <p>⭐ {resort.rating}</p>
              <p className="price">{resort.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="resort-details">
          <img
            className="resort-detail-image"
            src={selectedResort.image}
            alt={selectedResort.name}
          />
          <h2>{selectedResort.name}</h2>
          <p>📌 {selectedResort.location}</p>
          <p>⭐ {selectedResort.rating}</p>
          <p className="price">💰 {selectedResort.price}</p>

          <div className="booking-form">
            <label>Guests: </label>
            <input
              type="number"
              min="1"
              max="10"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
            />

            <label>Check-in: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />

            <label>Check-out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <button
            className="book-now"
            onClick={() => alert("Resort booked successfully!")}
          >
            Book Now
          </button>
          <button className="back" onClick={() => setSelectedResort(null)}>
            ⬅ Back
          </button>
        </div>
      )}
    </div>
  );
}
