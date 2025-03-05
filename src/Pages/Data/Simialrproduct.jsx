import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Individual.css";
import AddToCartButton from "../../Components/AddToCartButton/AddToCartButton";

export default function Similarproduct({ productsData, handleAddToCart }) {
  const goto = useNavigate();
  const [visibleCount, setVisibleCount] = useState(7);
  const shuffledProducts = [...productsData].sort(() => Math.random() - 0.5);
  const visibleProducts = shuffledProducts.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(visibleCount + 7);
  };

  return (
    <div className="scontent">
      <button className="morebtn" onClick={loadMore}>
        More
      </button>
      {visibleProducts.map((product) => (
        <div
          className="scard"
          key={product._id}
          onClick={() => {
            goto(`/products/${product._id}`);
            console.log("clicked!");
          }}
        >
          {product.img && (
            <img
              className="scard_img"
              src={
                product.img.startsWith("data:image")
                  ? product.img
                  : `http://localhost:5000/uploads/${product.img}`
              }
              alt="Uploaded Product"
            />
          )}

          <div className="scard_info">
            <p className="spname">{product.product_name}</p>
            <p className="spdes">{product.description}</p>
            <p className="sprice">
              {" "}
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>
            <div
              className="add-to-cart-btn"
              onClick={(e) => {
                e.stopPropagation(); //stops the parent class from getting called "The add button does not open the indi page"
              }}
            >
              {" "}
              <AddToCartButton onAddToCart={() => handleAddToCart(product)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
