import React from "react";
import "./AddToCartButton.css";

export default function AddToCartButton({ onAddToCart }) {
  return (
    <button className="add-to-cart" onClick={onAddToCart}>
      Add to Cart
    </button>
  );
}
