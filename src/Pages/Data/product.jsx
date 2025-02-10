import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "../../Components/AddToCartButton/AddToCartButton";

const Product = ({ productsData, handleAddToCart }) => {
  const goto = useNavigate();
  const [visibleCount, setVisibleCount] = useState(7);
  const visibleProducts = productsData.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(visibleCount + 7);
  };

  return (
    <div className="content">
      <button className="morebtn" onClick={loadMore}>
        More
      </button>
      {visibleProducts.map((product) => (
        <div
          className="card"
          key={product._id}
          onClick={() => {
            goto(`/products/${product._id}`);
            console.log("clicked!");
          }}
        >
          <img
            className="card_img"
            src={`${product.img}`}
            alt={product.product_name}
          />

          <div className="card_info">
            <p className="pname">{product.product_name}</p>
            <p className="pdes">{product.description}</p>
            <p className="price">{product.price}</p>
            <button
              className="pbtn"
              onClick={(e) => {
                e.stopPropagation(); //stops the parent class from getting called "The add button does not open the indi page"
              }}
            >
              <AddToCartButton onAddToCart={() => handleAddToCart(product)} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
