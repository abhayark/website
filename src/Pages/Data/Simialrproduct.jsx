import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Individual.css";
import AddToCartButton from "../../Components/AddToCartButton/AddToCartButton";

export default function Similarproduct({ productsData, handleAddToCart }) {
  const goto = useNavigate();
  const [visibleCount, setVisibleCount] = useState(8);
  const shuffledProductsRef = useRef(null);

  if (!shuffledProductsRef.current && productsData.length > 0) {
    shuffledProductsRef.current = [...productsData].sort(
      () => Math.random() - 0.5
    );
  }

  const visibleProducts = shuffledProductsRef.current
    ? shuffledProductsRef.current.slice(0, visibleCount)
    : [];
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
              className="pbtn"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <AddToCartButton onAddToCart={() => handleAddToCart(product)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
