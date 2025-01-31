import React from "react";
import "./AddToCartButton.css";
const AddToCartButton = ({ onAddToCart }) => {
  return (
    <button className="add-to-cart" onClick={onAddToCart}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
