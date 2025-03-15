import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./cabbing.css";

export default function CabSearch({ cart }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query")?.toLowerCase() || "";
  const goto = useNavigate();
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/services/cabs")
      .then((res) => res.json())
      .then((data) => setCabs(data))
      .catch((err) => console.error("Error fetching cabs:", err));
  }, []);

  const filteredCabs = cabs.filter((cab) =>
    cab.service_name.toLowerCase().includes(searchQuery)
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
                key={cab._id}
                className="cab-card"
                onClick={() => {
                  goto("/cab", { state: { selectedCab: cab } });
                }}
              >
                <img className="cab-image" src={cab.image} alt={cab.car} />
                <h2>{cab.service_name}</h2>
                <p>Driver: {cab.description}</p>
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
