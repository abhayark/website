import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

export default function ResortSearch({ cart }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query")?.toLowerCase() || "";
  const goto = useNavigate();
  const [resorts, setResorts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/services/resorts")
      .then((res) => res.json())
      .then((data) => setResorts(data))
      .catch((err) => console.error("Error fetching resorts:", err));
  }, []);

  const filteredResort = resorts.filter((resort) =>
    resort.service_name.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      <div className="cab-container">
        <Navbar cartCount={cart?.length || 0} />
        <h2>Search Results for "{searchQuery}"</h2>
        <div className="cab-grid">
          {filteredResort.length > 0 ? (
            filteredResort.map((resort) => (
              <div
                key={resort._id}
                className="cab-card"
                onClick={() => {
                  goto("/resort", { state: { selectedCab: resort } });
                }}
              >
                <img
                  className="cab-image"
                  src={resort.image}
                  alt={resort.resort}
                />
                <h2>{resort.service_name}</h2>
                <p>Driver: {resort.description}</p>
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
