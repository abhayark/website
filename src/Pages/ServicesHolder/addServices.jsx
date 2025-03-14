import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./addServices.css";
import Navbar from "../../Components/Navbar/Navbar";

export default function ListService({ cart }) {
  const serviceoption = ["Cab Driver", "Nursery products", "Resorts"];
  const fields = {
    "Cab Driver": [
      "Car image",
      "Car Model/Name",
      "Driver Name",
      "Driver Number",
    ],
    Resorts: ["Resort image", "Resort Name", "Address", "Price (per Night)"],
    "Nursery products": ["Plant image", "Plant Name", "Description", "Price"],
  };

  const goto = useNavigate();
  const [selectedService, setSelectedService] = useState("");
  const [service, setService] = useState({
    category: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loggedin, setLoggedin] = useState(false);
  const [providerName, setProviderName] = useState("");

  useEffect(() => {
    const loginData = localStorage.getItem("user");
    if (!loginData) {
      goto("/login");
      alert("Login first to enlist a service.");
    } else {
      const user = JSON.parse(loginData);
      setProviderName(user.username);
      setLoggedin(true);
    }
  }, [goto]);

  const handleServiceChange = (e) => {
    const serviceType = e.target.value;
    setSelectedService(serviceType);

    const initialFields = fields[serviceType].reduce((acc, field) => {
      acc[field] = "";
      return acc;
    }, {});

    setService({ ...initialFields, category: serviceType });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setService((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!service.category) {
      alert("Please select a service category.");
      return;
    }

    const formData = new FormData();
    if (service.category === "Cab Driver") {
      formData.append("service_name", service["Car Model/Name"] || "");
      formData.append("description", service["Driver Name"] || "");
      formData.append("price", service["Driver Number"] || "");
    } else if (service.category === "Resorts") {
      formData.append("service_name", service["Resort Name"] || "");
      formData.append("description", service["Address"] || "");
      formData.append("price", service["Price (per Night)"] || "");
    } else if (service.category === "Nursery products") {
      formData.append("service_name", service["Plant Name"] || "");
      formData.append("description", service["Description"] || "");
      formData.append("price", service["Price"] || "");
    }
    formData.append("provider", providerName);
    formData.append("category", service.category);

    if (service.image) {
      formData.append("image", service.image);
    } else {
      alert("Please upload an image.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/services", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      alert("Service listed successfully!");
      console.log("Service added:", data);
      goto("/services");
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to list service.");
    }
  };

  useEffect(() => {
    const login = localStorage.getItem("user");
    if (!login) {
      goto("/login");
      alert("Login first to enlist a service.");
    } else {
      setLoggedin(true);
    }
  }, [goto]);

  return (
    <>
      <Navbar cartCount={cart.length} />
      {loggedin ? (
        <div>
          <div className="service-container">
            <h2 className="service-title">Enlist Your Service</h2>
            <div className="service-category-container">
              <select
                name="category"
                value={selectedService}
                onChange={handleServiceChange}
                className="service-category"
              >
                <option value="" disabled>
                  Select a Service Type
                </option>
                {serviceoption.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {selectedService && (
            <form onSubmit={handleSubmit} className="service-form">
              {fields[selectedService].map((field) => (
                <div key={field} style={{ backgroundColor: "transparent" }}>
                  {field.toLowerCase().includes("image") ? (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="service-input"
                    />
                  ) : (
                    <input
                      type="text"
                      name={field}
                      value={service[field] || ""}
                      onChange={handleChange}
                      placeholder={`Enter ${field}`}
                      className="service-input"
                      required
                    />
                  )}
                </div>
              ))}

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Service Preview"
                  className="sell-service-image"
                />
              )}

              <div className="service-button-container">
                <button
                  onClick={() => goto("/services")}
                  className="service-button"
                >
                  Back to Marketplace
                </button>
                <button type="submit" className="service-button">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </>
  );
}
