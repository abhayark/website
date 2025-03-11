import React, { useState } from "react";
import "./Services.css";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";

const allServices = [
  {
    id: 1,
    name: "Merry Voyage",
    image: "/Assets/cab.jpg",
    url: "cab",
  },
  {
    id: 2,
    name: "Floral Eclipse ",
    image: "/Assets/nursery.jpg",
    url: "nursery",
  },
  {
    id: 3,
    name: "List your services",
    image: "/Assets/cab.jpg",
    url: "cab",
  },
  {
    id: 4,
    name: "List your product",
    image: "/Assets/selling.jpg",
    url: "selling",
  },
  {
    id: 5,
    name: "Contact Us",
    image: "/Assets/ContactUs.jpg",
    url: "contact",
  },
];

export default function Services({ cart }) {
  const [selectedService, setSelectedService] = useState(null);

  const goto = useNavigate();

  return (
    <>
      <div className="market-container">
        <Navbar cartCount={cart.length} />
        <h2 className="market-title">The Oasis's Marketplace</h2>
        {!selectedService ? (
          <div className="market-grid">
            {allServices.map((service) => (
              <div
                className="market-card"
                key={service.id}
                onClick={() => setSelectedService(service)}
              >
                <img
                  className="market-image"
                  src={service.image}
                  alt={service.name}
                />
                <h2 className="service-title">{service.name}</h2>
              </div>
            ))}
          </div>
        ) : (
          <div className="service-detail">
            <img
              className="detail-image"
              src={selectedService.image}
              alt={selectedService.name}
            />
            <h2 className="service-title">{selectedService.name}</h2>

            <button
              className="visit-btn"
              onClick={() => goto("/" + selectedService.url)}
            >
              Visit
            </button>
            <button
              className="back-btn"
              onClick={() => setSelectedService(null)}
            >
              Back to Marketplace
            </button>
          </div>
        )}
      </div>
    </>
  );
}
