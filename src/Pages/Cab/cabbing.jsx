import React, { useState, useEffect } from "react";
import "./cabbing.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useLocation } from "react-router-dom";

export default function CabBooking({ cart }) {
  const [cabs, setCabs] = useState([]);
  const [selectedCab, setSelectedCab] = useState(null);
  const [paymentOption, setPaymentOption] = useState("");
  const [location, setLocation] = useState("");
  const [visibleCabs, setVisibleCabs] = useState(10);

  const locationHook = useLocation();

  useEffect(() => {
    if (locationHook.state?.selectedCab) {
      setSelectedCab(locationHook.state.selectedCab);
    }
  }, [locationHook.state]);

  useEffect(() => {
    fetch("http://localhost:5000/api/services/cabs")
      .then((res) => res.json())
      .then((data) => setCabs(data))
      .catch((err) => console.error("Error fetching cabs:", err));
  }, []);

  const handleCabBooking = async () => {
    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in to book a cab.");
      return;
    }

    if (!selectedCab || !location) {
      alert("Please select a cab and enter your location.");
      return;
    }
    const orderData = {
      customerName: user.username || "Unknown User",
      email: user.email,
      img: selectedCab.image,
      category: selectedCab.category,
      phone: user.mobile || "N/A",
      service: "Cab",
      serviceId: selectedCab._id,
      serviceName: selectedCab.service_name,
      price: selectedCab.price,
      paymentMethod: paymentOption,
    };
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Cab booked successfully!");
      } else {
        alert("Failed to book cab: " + result.error);
      }
    } catch (error) {
      console.error("Error booking cab:", error);
    }
  };

  return (
    <>
      <div className="cab-container">
        <Navbar cartCount={cart.length} />
        <h2>Book a Cab</h2>
        <p>Late or early, rain or shine, your destination’s next in line.</p>
        {!selectedCab ? (
          <div className="cab-grid">
            {cabs.slice(0, visibleCabs).map((cab) => (
              <div
                className="cab-card"
                key={cab.id}
                onClick={() => setSelectedCab(cab)}
              >
                <img
                  className="cab-image"
                  src={cab.image}
                  alt={cab.service_name}
                />

                <h2>{cab.service_name}</h2>
                <p>Driver: {cab.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="sel-cab-container">
            <img
              className="sel-cab-image"
              src={selectedCab.image}
              alt={selectedCab.service_name}
            />
            <h2 className="sel-cab-name">{selectedCab.service_name}</h2>
            <p className="sel-cab-drname">Driver: {selectedCab.description}</p>
            <p className="sel-cab-drname">Driver Number: {selectedCab.price}</p>
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
            <button className="book-cab" onClick={() => handleCabBooking()}>
              Book Now
            </button>
            <button className="book-cab" onClick={() => setSelectedCab(null)}>
              Back to Options
            </button>
          </div>
        )}
        {visibleCabs < cabs.length && !selectedCab && (
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
