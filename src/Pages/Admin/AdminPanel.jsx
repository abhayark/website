import React, { useState, useEffect } from "react";
import "./AdminPanel.css";

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) {
        const result = await response.json();
        alert("Error updating status: " + result.error);
        return;
      }
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleRemoveOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const result = await response.json();
        alert("Error deleting order: " + result.error);
        return;
      }
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredOrders =
    selectedCategory === "All"
      ? orders
      : orders.filter((order) => order.service === selectedCategory);

  const groupedOrders = filteredOrders.reduce((groups, order) => {
    const service = order.service;
    if (!groups[service]) {
      groups[service] = [];
    }
    groups[service].push(order);
    return groups;
  }, {});

  const getColumns = (service) => {
    switch (service) {
      case "Product":
        return [
          "Product Name",
          "Customer Name",
          "Customer Email",
          "Customer Phone",
          "Order ID",
          "Price",
          "Payment Method",
          "Status",
          "Change Status",
          "Actions",
          "Date",
        ];
      case "Cab":
        return [
          "Customer Name",
          "Customer Email",
          "Customer Phone",
          "Order ID",
          "Cab Name",
          "Driver Number", // price used as driver number
          "Payment Method",
          "Status",
          "Change Status",
          "Actions",
          "Date",
        ];
      case "Nursery":
        return [
          "Order ID",
          "Customer Name",
          "Customer Email",
          "Customer Phone",
          "Plant Name",
          "Price",
          "Payment Method",
          "Status",
          "Change Status",
          "Actions",
          "Date",
        ];
      case "Resort":
        return [
          "Order ID",
          "Customer Name",
          "Customer Email",
          "Customer Phone",
          "Resort Name",
          "Price",
          "Payment Method",
          "Status",
          "Change Status",
          "Actions",
          "Date",
        ];
      default:
        return [
          "Order ID",
          "Customer Name",
          "Customer Email",
          "Customer Phone",
          "Service Name",
          "Price",
          "Payment Method",
          "Status",
          "Change Status",
          "Actions",
          "Date",
        ];
    }
  };

  // Render a row for an order with a status dropdown and remove button
  const renderRow = (order, service) => (
    <tr key={order._id}>
      <td>{order.serviceName || "-"}</td>
      <td>{order.customerName}</td>
      <td>{order.email}</td>
      <td>{order.phone}</td>
      <td>{order.serviceId}</td>
      <td>{service === "Cab" ? order.price : `₹${order.price}`}</td>
      <td>{order.paymentMethod || "N/A"}</td>
      <td>
        <span className={`status ${order.status.toLowerCase()}`}>
          {order.status}
        </span>
      </td>
      <td>
        <select
          className="status-dropdown"
          value={order.status}
          onChange={(e) => handleStatusChange(order._id, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Delivering">Delivering</option>
          <option value="Complete">Complete</option>
        </select>
      </td>
      <td>
        <button className="delete" onClick={() => handleRemoveOrder(order._id)}>
          Remove
        </button>
      </td>
      <td>{new Date(order.orderDate).toLocaleDateString()}</td>
    </tr>
  );

  return (
    <>
      <div className="admin-panel">
        <h1>All Orders</h1>
        <div className="filter-container">
          <h2>Filter by Category: </h2>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Product">Product</option>
            <option value="Cab">Cab</option>
            <option value="Nursery">Nursery</option>
            <option value="Resort">Resort</option>
          </select>
        </div>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders available.</p>
        ) : (
          Object.keys(groupedOrders)
            .sort((a, b) => (a === "Product" ? -1 : b === "Product" ? 1 : 0))
            .map((service) => (
              <div key={service} className="order-group">
                <h2>{service} Orders</h2>
                <table className="item-table">
                  <thead>
                    <tr>
                      {getColumns(service).map((col, index) => (
                        <th key={index}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {groupedOrders[service].map((order) =>
                      renderRow(order, service)
                    )}
                  </tbody>
                </table>
              </div>
            ))
        )}
      </div>
    </>
  );
}
