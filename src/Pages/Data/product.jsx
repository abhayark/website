import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "../../Components/AddToCartButton/AddToCartButton";

const Product = ({ productsData, handleAddToCart }) => {
  const goto = useNavigate();

  const [visibleCount, setVisibleCount] = useState(7);
  const shuffledProductsRef = useRef(null);

  if (!shuffledProductsRef.current && productsData.length > 0) {
    shuffledProductsRef.current = [...productsData].sort(
      () => Math.random() - 0.5
    );
  }

  const visibleProducts = shuffledProductsRef.current
    ? shuffledProductsRef.current.slice(0, visibleCount)
    : [];

  const categoryName =
    visibleProducts.length > 0 ? visibleProducts[0].category : "Products";

  const loadMore = () => {
    setVisibleCount(visibleCount + 7);
    console.log(visibleProducts);
    console.log(visibleCount);
  };

  return (
    <div className="content">
      <div className="more-container">
        <button className="morebtn" onClick={loadMore}>
          More
        </button>
        <span className="category-label">{categoryName}</span>
      </div>
      {visibleProducts.map((product) => (
        <div
          className="card"
          key={product._id}
          onClick={() => {
            goto(`/products/${product._id}`);
          }}
        >
          {product.img && (
            <img
              className="card_img"
              src={
                product.img.startsWith("data:image")
                  ? product.img
                  : `http://localhost:5000/uploads/${product.img}`
              }
              alt="Uploaded Product"
            />
          )}

          <div className="card_info">
            <p className="pname">{product.product_name}</p>
            <p className="pdes">{product.description}</p>
            <p
              className="price" //converted to num and then into indian format
            >
              {" "}
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>
            <div
              className="pbtn"
              onClick={(e) => {
                e.stopPropagation(); //stops the parent class from getting called "The add button does not open the indi page"
              }}
            >
              <AddToCartButton onAddToCart={() => handleAddToCart(product)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
