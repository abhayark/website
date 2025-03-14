import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import "./resort.css";
import { Reorder } from "@mui/icons-material";

export default function ResortBooking({ cart }) {
  const [resorts, setResorts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/services/resorts")
      .then((res) => res.json())
      .then((data) => setResorts(data))
      .catch((err) => console.error("Error fetching cabs:", err));
  }, []);

  const date = new Date();
  const today =
    date.getFullYear() +
    "-" +
    "0" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate();

  let yet = false;

  const datecheck = () => {
    yet = checkIn > checkOut ? false : true;
    yet = checkIn < today ? false : true;

    if (yet == true) {
      alert("Successfully Booked");
    } else {
      alert("Enter proper Date");
    }
  };

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
                alt={resort.service_name}
              />
              <h2>{resort.service_name}</h2>
              <p>{resort.description}</p>
              <p className="price">
                ₹{Number(resort.price).toLocaleString("en-IN")}
              </p>
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
          <h2>{selectedResort.service_name}</h2>
          <p>📌 {selectedResort.description}</p>
          <p className="price">
            💰 ₹{Number(selectedResort.price).toLocaleString("en-IN")}
          </p>
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
              onChange={(e) => {
                setCheckIn(e.target.value);
              }}
            />

            <label>Check-out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
              }}
            />
          </div>
          <button className="book-now" onClick={() => datecheck()}>
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
