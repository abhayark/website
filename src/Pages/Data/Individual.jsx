import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./Individual.css";
import AddToCartButton from "../../Components/AddToCartButton/AddToCartButton";
import Similarproduct from "./Simialrproduct";

export default function Individual({ cart, handleAddToCart }) {
  const { id } = useParams(); // Extract the dynamic parameter
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [expanded, setExpanded] = useState(false);
  console.log("Product ID from URL:", id);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        return fetch(
          `http://localhost:5000/api/products?category=${data.category}`
        );
      })
      .then((res) => res.json())
      .then((filteredProducts) => {
        setSimilarProducts(
          filteredProducts.filter((item) => item._id.toString() !== id)
        );
      })
      .catch((err) =>
        console.error("Error fetching product or similar products:", err)
      );
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const handleBuyNow = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in to purchase this product.");
      return;
    }

    const orderData = {
      customerName: user.username || "Unknown User",
      email: user.email,
      phone: user.mobile || "N/A",
      service: "Product",
      serviceId: product._id,
      serviceName: product.product_name,
      price: product.price,
    };
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Product ordered successfully!");
      } else {
        alert("Failed to create order: " + result.error);
      }
    } catch (error) {
      console.error("Error ordering product:", error);
    }
  };
  return (
    <div className="product-detail-container">
      <Navbar cartCount={cart.length} />
      <div className="product-detail-card">
        <div className="product-detail-info">
          <h1 className="product-name">{product.product_name}</h1>
          <p
            className={`product-description ${
              expanded ? "expanded" : "product-description"
            }`}
            onClick={() => setExpanded(!expanded)}
          >
            {product.description}
          </p>
          <p className="seller-name">Sold by {product.seller}</p>
          <p className="product-price">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </p>
          <div className="pbtn">
            <AddToCartButton onAddToCart={() => handleAddToCart(product)} />
            <button className="add-to-cart" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
        {product.img && (
          <img
            src={
              product.img.startsWith("data:image")
                ? product.img
                : `http://localhost:5000/uploads/${product.img}`
            }
            alt="Uploaded Product"
            className="product-detail-img"
          />
        )}
      </div>
      <Similarproduct
        productsData={similarProducts}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
}
