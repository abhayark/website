import React, { useEffect, useState } from "react";
import "./History.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function History() {
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
        const res = await fetch(`http://localhost:5000/api/orders/history/${email}`);
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
    <>
      <Navbar />
      <div className="market-container">
        <h1 className="history-title">Purchase History</h1>
        <div className="service-grid">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="service-card">
                <img src="/Assets/order.jpg" alt="Order" />
                <div className="order-details">
                  <h3>Order ID: {order._id}</h3>
                  <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                  <p>Total: ${order.price?.toFixed(2)}</p>
                  <p>Status: {order.status}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No orders found for this email.</p>
          )}
        </div>
      </div>
    </>
  );
}
