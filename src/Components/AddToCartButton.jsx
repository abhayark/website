import React from "react";

const AddToCartButton = ({ onAddToCart }) => {
  return (
    <button className="pbtn" onClick={onAddToCart}>
      Add to Basket 🛒
    </button>
  );
};

export default AddToCartButton;
