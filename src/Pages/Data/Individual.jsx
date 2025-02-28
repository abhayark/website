import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./Individual.css";

function Individual() {
  const { id } = useParams(); // Extract the dynamic parameter
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  console.log("Product ID from URL:", id);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => console.error("Error fetching product:", err));

    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const filteredProducts = data.filter((item) => item._id !== id); // Exclude current product
        setSimilarProducts(filteredProducts.slice(0, 6)); // Limit to 6 items
      })
      .catch((err) => console.error("Error fetching similar products:", err));
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-detail-container">
      <Navbar />
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
          <p className="product-price"> ₹{product.price}</p>
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
            <p className="sprice"> ₹{product.price}</p>
            <button className="pbtn">add to cart </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Individual;
