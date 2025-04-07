import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import "./resort.css";

export default function ResortBooking({ cart }) {
  const [resorts, setResorts] = useState([]);
  const [selectedResort, setSelectedResort] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [paymentOption, setPaymentOption] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/services/resorts")
      .then((res) => res.json())
      .then((data) => setResorts(data))
      .catch((err) => console.error("Error fetching cabs:", err));
  }, []);

  const handleResortBooking = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in to book a resort.");
      return;
    }
    if (!selectedResort || !checkIn || !checkOut) {
      alert("Please select a resort and enter check-in/out dates.");
      return;
    }
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      alert("Check-in date must be today or later.");
      return;
    }
    if (checkOutDate <= checkInDate) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    const orderData = {
      customerName: user.username || "Unknown User",
      email: user.email,
      img: selectedResort.image,
      phone: user.mobile || "N/A",
      service: "Resort",
      serviceId: selectedResort._id,
      serviceName: selectedResort.service_name,
      price: selectedResort.price,
      paymentMethod: paymentOption,
      checkIn,
      checkOut,
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Resort booked successfully!");
      } else {
        alert("Failed to book resort: " + result.error);
      }
    } catch (error) {
      console.error("Error booking resort:", error);
    }
  };

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
              key={resort._id}
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
            <select
              className="cab-payment"
              value={paymentOption}
              onChange={(e) => setPaymentOption(e.target.value)}
            >
              <option value="">Select Payment Option</option>
              <option value="card">Credit/Debit Card</option>
              <option value="cash">Cash</option>
            </select>
          </div>
          <button className="book-now" onClick={handleResortBooking}>
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
