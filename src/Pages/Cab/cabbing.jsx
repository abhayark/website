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
    image: "/Assets/honda.jpg",
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
    image: "/Assets/mustang.jpg",
  },
  {
    id: 5,
    car: "Ford Mustang Shelby",
    driver: "ARK",
    rating: 4.3,
    image: "/Assets/mustangshelby.jpg",
  },
  {
    id: 6,
    car: "BMW M4",
    driver: "ARK",
    rating: 4.8,
    image: "/Assets/bmw.jpg",
  },
  {
    id: 7,
    car: "Mercedes-Benz SL",
    driver: "ARK",
    rating: 4.9,
    image: "/Assets/mercedes.jpg",
  },
  {
    id: 8,
    car: "Audi A6 ",
    driver: "ARK",
    rating: 4.5,
    image: "/Assets/audi.jpg",
  },
  {
    id: 9,
    car: "Nissan GT-R",
    driver: "ARK",
    rating: 4.6,
    image: "/Assets/nissan.jpg",
  },
  {
    id: 10,
    car: "Hyundai ELANTRA",
    driver: "ARK",
    rating: 4.4,
    image: "/Assets/hyundai.jpg",
  },
  {
    id: 11,
    car: "Subaru STI",
    driver: "ARK",
    rating: 4.2,
    image: "/Assets/subaru.jpg",
  },
  {
    id: 12,
    car: "hunter 350",
    driver: "Amit",
    rating: 5,
    image: "/Assets/hunter.jpg",
  },
];

export default function CabBooking({ cart }) {
  const [selectedCab, setSelectedCab] = useState(null);
  const [paymentOption, setPaymentOption] = useState("");
  const [location, setLocation] = useState("");
  const [visibleCabs, setVisibleCabs] = useState(10);

  return (
    <>
      <div className="cab-container">
        <Navbar cartCount={cart.length} />
        <h2>Book a Cab</h2>
        <p>Late or early, rain or shine, your destination’s next in line.</p>
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
            <div className="location">
              <input
                className="cab-location"
                type="text"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <label htmlFor="email" className="locationlabel">
                Enter your location
              </label>
            </div>
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
