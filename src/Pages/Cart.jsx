import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import "./Cart.css";

const Cart = ({ cart, onRemove }) => {
  const goto = useNavigate();

  const totalPrice = cart.reduce(
    (sum, product) => sum + Number(product.price),
    0
  );

  return (
    <div>
      <Navbar cartCount={cart.length} />
      <div className="cart-container">
        <h2 className="title"> Your Cart 🛒</h2>
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <ul className="cart-list">
            {cart.map((product, index) => (
              <li
                key={product._id}
                className="cart-item"
                onClick={() => {
                  goto(`/products/${product._id}`);
                  console.log("clicked!");
                }}
              >
                <img
                  src={product.img}
                  alt={product.product_name}
                  className="cart-img"
                />
                <div className="cart-info">
                  <h3 className="cart-product-name">{product.product_name}</h3>
                  <p className="cart-product-price">
                    Price: ₹{Number(product.price).toLocaleString("en-IN")}
                  </p>
                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(index);
                      console.log("clicked!");
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="cart-product-price">
          <strong>Total: ₹{Number(totalPrice).toLocaleString("en-IN")}</strong>
        </p>
        <button className="continue-shopping-btn" onClick={() => goto("/")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;
