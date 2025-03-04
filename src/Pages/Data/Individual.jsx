import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./Individual.css";

export default function Individual({ cart }) {
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
            {" "}
            ₹{Number(product.price).toLocaleString("en-IN")}
          </p>
          <button className="add-to-cart-btn">Add to Cart</button>
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
      <Similarproduct productsData={similarProducts} />
    </div>
  );
}

const Similarproduct = ({ productsData, handleAddToCart }) => {
  const goto = useNavigate();
  const [visibleCount, setVisibleCount] = useState(7);
  const visibleProducts = productsData.slice(0, visibleCount);

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
            <button
              className="pbtn"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              add to cart{" "}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
