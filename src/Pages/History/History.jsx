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

  const requestCancellation = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Cancel Requested" }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        alert("Error: " + result.error);
        return;
      }

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status: "Cancel Requested" }
            : order
        )
      );
    } catch (err) {
      console.error("Cancellation request failed:", err);
    }
  };

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
                <div className="order-status-info">
                  {order.service === "Cab" ? (
                    <p className="order-price">Number: {order.price}</p>
                  ) : (
                    <p className="order-price">Price: ₹{order.price}</p>
                  )}
                  <p className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </p>
                  {(order.status === "Pending" ||
                    order.status === "Delivering") && (
                    <button
                      className="cancel-button"
                      onClick={() => requestCancellation(order._id)}
                    >
                      Request Cancel
                    </button>
                  )}
                  {order.status === "Cancel Requested" && (
                    <p className="cancel-info">Cancel requested</p>
                  )}
                </div>
              </div>
              <div className="order-details">
                <p>Name: {order.serviceName}</p>
                <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p>Order ID: {order._id}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found for this email.</p>
        )}
      </div>
    </div>
  );
}
