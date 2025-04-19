import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AllItemsAdmin.css";

export default function AllItemsAdmin() {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Failed to fetch products:", err));

    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then(setServices)
      .catch((err) => console.error("Failed to fetch services:", err));
  }, []);

  const handleDelete = async (type, id) => {
    const confirmation = prompt("To confirm deletion, type 'remove':");

    if (confirmation !== "remove") {
      alert("Deletion cancelled.");
      return;
    }

    const endpoint =
      type === "product" ? `/api/products/${id}` : `/api/services/${id}`;
    try {
      await fetch(`http://localhost:5000${endpoint}`, { method: "DELETE" });
      type === "product"
        ? setProducts(products.filter((item) => item._id !== id))
        : setServices(services.filter((item) => item._id !== id));
    } catch (err) {
      console.error(`Error deleting ${type}:`, err);
    }
  };

  const renderTable = (data, type) => (
    <div className="table-container">
      <h2 className="table-title">
        {type === "product" ? "📦 Products" : "🛠️ Services"}
      </h2>
      {data.length === 0 ? (
        <p className="no-data">No {type}s found.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>{type === "product" ? "Seller" : "Provider"}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.product_name || item.service_name}</td>
                <td>{item.category}</td>
                <td>₹{item.price}</td>
                <td>{item.seller || item.provider}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(type, item._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const renderServiceTables = () => {
    if (services.length === 0)
      return <p className="no-data">No services found.</p>;

    const grouped = services.reduce((acc, service) => {
      const cat = service.category || "Other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(service);
      return acc;
    }, {});

    return Object.entries(grouped).map(([category, items]) => {
      const isCab = category === "Cab Driver";

      return (
        <div className="table-container" key={category}>
          <h2 className="table-title">🛠️ {category} Services</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>{isCab ? "Driver Number" : "Price"}</th>
                <th>Provider</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.service_name}</td>
                  <td>{item.category}</td>
                  <td>{isCab ? item.price : `₹${item.price}`}</td>
                  <td>{item.provider}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete("service", item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    });
  };

  return (
    <div className="all-items-admin">
      <div className="header">
        <h1>Admin: All Data</h1>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {renderTable(products, "product")}
      {renderServiceTables()}
    </div>
  );
}
