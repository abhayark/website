import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import "./Cart.css";

const Cart = ({ cart, onRemove, clearCart }) => {
  const goto = useNavigate();

  const totalPrice = cart.reduce(
    (sum, product) => sum + Number(product.price),
    0
  );

  const [loggedin, setloggedin] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setloggedin(true);
    }
  }, []);

  const handleCheckout = async () => {
    if (!user) {
      alert("Please log in to complete your purchase.");
      return;
    }

    try {
      for (const product of cart) {
        const orderData = {
          customerName: user.username || "Unknown User",
          email: user.email,
          phone: user.mobile || "N/A",
          service: "Product",
          serviceId: product._id,
          serviceName: product.product_name,
          price: product.price,
        };

        const response = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          const result = await response.json();
          alert("Error ordering product: " + result.error);
          return;
        }
      }
      alert("Order placed successfully!");
      clearCart();
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred while placing your order.");
    }
  };

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
                <p>//todo extra</p>
                <h3>Total: ₹{Number(totalPrice).toLocaleString("en-IN")}</h3>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Buy
                </button>
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
