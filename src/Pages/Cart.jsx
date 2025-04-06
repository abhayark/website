import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Buy from "../Components/Buy/Buy";
import "./Cart.css";

const Cart = ({ cart, onRemove, clearCart }) => {
  const goto = useNavigate();

  const totalPrice = cart.reduce(
    (sum, product) => sum + Number(product.price),
    0
  );

  const [pay, setPay] = useState("Cash");
  const [loggedin, setloggedin] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setloggedin(true);
    }
  }, []);

  return (
    <>
      <Navbar cartCount={cart.length} />
      {loggedin ? (
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
                          Price: ₹
                          {Number(product.price).toLocaleString("en-IN")}
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
                {user && (
                  <div className="user-info">
                    <p>
                      <strong>Name:</strong> {user.username}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Address:</strong> {user.address}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {user.mobile}
                    </p>
                  </div>
                )}
                <select
                  className="status-dropdown"
                  value={pay}
                  onChange={(e) => setPay(e.target.value)}
                >
                  <option value="cash">Cash On Delivery</option>
                  <option value="upi">UPI</option>
                  <option value="card">Credit/Debit Card</option>
                </select>
                <h3>Total: ₹{Number(totalPrice).toLocaleString("en-IN")}</h3>
                <Buy cart={cart} clearCart={clearCart} pay={pay} />
              </div>
            </div>
          )}
          <button className="continue-shopping-btn" onClick={() => goto("/")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-container">
          <p className="title">Login to Access Cart</p>
          <button className="continue-shopping-btn" onClick={() => goto("/")}>
            Continue Shopping
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
