import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import "./Cart.css";
import { colors } from "@mui/joy";

const Cart = ({ cart, onRemove }) => {
  const goto = useNavigate();

  return (
    <div>
      <Navbar cartCount={cart.length} />
      <div className="cart-container">
        <h2 className="title"> Your Cart 🛒</h2>
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <img
                  src={item.img}
                  alt={item.product_name}
                  className="cart-img"
                />
                <div className="cart-info">
                  <h3 className="cart-product-name">{item.product_name}</h3>
                  <p className="cart-product-price">Price: {item.price}</p>
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
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;
