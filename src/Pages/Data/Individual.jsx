import React from "react";
import { useParams } from "react-router-dom";
import product_card from "./product_data";

function Individual() {
  const { id } = useParams(); // Extract the dynamic parameter
  const product = product_card.find((item) => item.id === parseInt(id)); // Find the product by ID

  if (!product) {
    return <p>Product not found</p>; // Handle invalid IDs
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <img
          src={product.img}
          alt={product.product_name}
          className="product-detail-img"
        />
        <div className="product-detail-info">
          <h1>{product.product_name}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-price">{product.price}</p>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Individual;
