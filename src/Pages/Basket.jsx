import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import "./Basket.css";

const Basket = ({ cart, onRemove }) => {
  const goto = useNavigate();

  return (
    <div>
      <Navbar cartCount={cart.length} />
      <div className="basket-container">
        <h2>Your Basket 🛒</h2>
        {cart.length === 0 ? (
          <p className="empty-basket">Your basket is empty.</p>
        ) : (
          <ul className="basket-list">
            {cart.map((item, index) => (
              <li key={index} className="basket-item">
                <img src={item.img} alt={item.name} className="basket-img" />
                <div className="basket-info">
                  <h3>{item.name}</h3>
                  <p>Price: {item.price}</p>
                  <button
                    className="remove-btn"
                    onClick={() => onRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button className="continue-shopping-btn" onClick={() => goto("/")}>
          Continue Shopping 🛍️
        </button>
      </div>
    </div>
  );
};

export default Basket;
