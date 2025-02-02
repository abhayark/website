import React, { useState } from "react";
import styled from "styled-components";

const allCabs = [
  {
    id: 1,
    car: "Toyota ",
    driver: "ARK",
    rating: 4.5,
    image: "/images/prius.jpg",
  },
  {
    id: 2,
    car: "Honda ",
    driver: "ARK",
    rating: 4.7,
    image: "/images/accord.jpg",
  },
  {
    id: 3,
    car: "Tesla Model 3",
    driver: "ARK",
    rating: 4.9,
    image: "/images/tesla.jpg",
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

const Container = styled.div`
  background: #07090b;
  color: #e2e7ec;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
`;

const CabGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
`;

const CabCard = styled.div`
  background: #4e4266;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const CabImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const Button = styled.button`
  background: #8c72a3;
  color: #e2e7ec;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background: #acb9c9;
  }
`;

export default function CabBooking() {
  const [selectedCab, setSelectedCab] = useState(null);
  const [paymentOption, setPaymentOption] = useState("");
  const [location, setLocation] = useState("");
  const [visibleCabs, setVisibleCabs] = useState(10);

  return (
    <Container>
      <h1>Book a Cab</h1>
      {!selectedCab ? (
        <CabGrid>
          {allCabs.slice(0, visibleCabs).map((cab) => (
            <CabCard key={cab.id} onClick={() => setSelectedCab(cab)}>
              <CabImage src={cab.image} alt={cab.car} />
              <h2>{cab.car}</h2>
              <p>Driver: {cab.driver}</p>
            </CabCard>
          ))}
        </CabGrid>
      ) : (
        <div>
          <CabImage src={selectedCab.image} alt={selectedCab.car} />
          <h2>{selectedCab.car}</h2>
          <p>Driver: {selectedCab.driver}</p>
          <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <select
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
          >
            <option value="">Select Payment Option</option>
            <option value="card">Credit/Debit Card</option>
            <option value="cash">Cash</option>
          </select>
          <Button onClick={() => alert("Cab booked successfully!")}>
            Book Now
          </Button>
          <Button onClick={() => setSelectedCab(null)}>Back to Options</Button>
        </div>
      )}
      {visibleCabs < allCabs.length && !selectedCab && (
        <div>
          <Button onClick={() => setVisibleCabs((prev) => prev + 10)}>
            Load More
          </Button>
        </div>
      )}
    </Container>
  );
}
