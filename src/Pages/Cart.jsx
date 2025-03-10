import React, { useState } from "react";
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
    <>
      <Navbar cartCount={cart.length} />
      <div className="cart-container">
        <h2 className="title"> Your Cart 🛒</h2>
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <div className="cart-layout">
            <div className="cart-left-column">
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
                    <div className="cart-left">
                      <img
                        src={product.img}
                        alt={product.product_name}
                        className="cart-img"
                      />
                      <div className="cart-info">
                        <h3 className="cart-product-name">
                          {product.product_name}
                        </h3>
                        <h3 className="cart-product-seller">
                          {product.seller}
                        </h3>
                      </div>
                    </div>
                    <div className="cart-right">
                      <p className="cart-product-price">
                        Price: ₹{Number(product.price).toLocaleString("en-IN")}
                      </p>

                      <button
                        className="remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemove(index);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cart-right-column">
              <h3>Extra Info</h3>
              <p>Shipping options, discount codes, etc.</p>
              <h3>Total: ₹{Number(totalPrice).toLocaleString("en-IN")}</h3>
              <button
                className="checkout-btn"
                onClick={() => goto("/checkout")}
              >
                Buy
              </button>
            </div>
          </div>
        )}
        <button className="continue-shopping-btn" onClick={() => goto("/")}>
          Continue Shopping
        </button>
      </div>
    </>
  );
};

export default Cart;
