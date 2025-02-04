import React, { useState } from "react";
import "./cabbing.css";
import Navbar from "../../Components/Navbar/Navbar";

const allCabs = [
  {
    id: 1,
    car: "Toyota ",
    driver: "ARK",
    rating: 4.5,
    image: "/Assets/toyota.jpg",
  },
  {
    id: 2,
    car: "Honda ",
    driver: "ARK",
    rating: 4.7,
    image: "/images/honda.jpg",
  },
  {
    id: 3,
    car: "Tesla Model 3",
    driver: "ARK",
    rating: 4.9,
    image: "/Assets/tesla.jpg",
  },
  {
    id: 4,
    car: "Ford Mustang",
    driver: "ARK",
    rating: 4.6,
    image: "/images/mustang.jpg",
  },
  {
    id: 5,
    car: "Ford Mustang",
    driver: "ARK",
    rating: 4.3,
    image: "/images/mustang.jpg",
  },
  {
    id: 6,
    car: "BMW X5",
    driver: "ARK",
    rating: 4.8,
    image: "/images/bmw.jpg",
  },
  {
    id: 7,
    car: "Mercedes-Benz ",
    driver: "ARK",
    rating: 4.9,
    image: "/images/mercedes.jpg",
  },
  {
    id: 8,
    car: "Audi ",
    driver: "ARK",
    rating: 4.5,
    image: "/images/audi.jpg",
  },
  {
    id: 9,
    car: "Nissan ",
    driver: "ARK",
    rating: 4.6,
    image: "/images/nissan.jpg",
  },
  {
    id: 10,
    car: "Hyundai",
    driver: "ARK",
    rating: 4.4,
    image: "/images/hyundai.jpg",
  },
  {
    id: 11,
    car: "Subaru",
    driver: "ARK",
    rating: 4.2,
    image: "/images/subaru.jpg",
  },
];

export default function CabBooking() {
  const [selectedCab, setSelectedCab] = useState(null);
  const [paymentOption, setPaymentOption] = useState("");
  const [location, setLocation] = useState("");
  const [visibleCabs, setVisibleCabs] = useState(10);

  return (
    <>
      <div className="cab-container">
        <Navbar />
        <h1>Book a Cab</h1>
        {!selectedCab ? (
          <div className="cab-grid">
            {allCabs.slice(0, visibleCabs).map((cab) => (
              <div
                className="cab-card"
                key={cab.id}
                onClick={() => setSelectedCab(cab)}
              >
                <img className="cab-image" src={cab.image} alt={cab.car} />
                <h2>{cab.car}</h2>
                <p>{cab.rating}</p>
                <p>Driver: {cab.driver}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="sel-cab-container">
            <img
              className="sel-cab-image"
              src={selectedCab.image}
              alt={selectedCab.car}
            />
            <h2 className="sel-cab-name">{selectedCab.car}</h2>
            <p className="sel-cab-drname">Driver: {selectedCab.driver}</p>
            <input
              className="cab-location"
              type="text"
              placeholder="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
            <button
              className="book-cab"
              onClick={() => alert("Cab booked successfully!")}
            >
              Book Now
            </button>
            <button className="book-cab" onClick={() => setSelectedCab(null)}>
              Back to Options
            </button>
          </div>
        )}
        {visibleCabs < allCabs.length && !selectedCab && (
          <div className="book-cab-container">
            <button
              className="book-cab"
              onClick={() => setVisibleCabs((prev) => prev + 10)}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
}
