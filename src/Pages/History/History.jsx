import React, { useEffect, useState } from "react";
import "./History.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function History({ cart }) {
  const [orders, setOrders] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      navigate("/login");
      return;
    }

    const fetchHistory = async () => {
      try {
        console.log("Fetching history for:", email);
        const res = await fetch(
          `http://localhost:5000/api/orders/history/${email}`
        );
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching purchase history:", error);
      }
    };

    fetchHistory();
  }, [email, navigate]);

  return (
    <div className="history-container">
      <Navbar cartCount={cart.length} />
      <h1 className="history-title">Purchase History</h1>
      <div className="orders-grid">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-top">
                <img src={order.img} alt="Order" />
                {order.service === "Cab" ? (
                  <p className="order-price">Number: {order.price}</p>
                ) : (
                  <p className="order-price">Price: ₹{order.price}</p>
                )}
              </div>
              <div className="order-details">
                <p>Name: {order.serviceName}</p>
                <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p>Order ID: {order._id}</p>
              </div>
              <p className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </p>
            </div>
          ))
        ) : (
          <p>No orders found for this email.</p>
        )}
      </div>
    </div>
  );
}
