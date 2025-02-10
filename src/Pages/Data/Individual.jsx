import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import AddToCartButton from "../../Components/AddToCartButton/AddToCartButton";
import "./Individual.css";

function Individual(handleAddToCart) {
  const { id } = useParams(); // Extract the dynamic parameter
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  console.log("Product ID from URL:", id);

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
          <p className="product-description">{product.description}</p>
          <p className="seller-name">Sold by {product.seller}</p>
          <p className="product-price">{product.price}</p>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
        <img
          src={`http://localhost:5000/images/${product.img}`}
          alt={product.product_name}
          className="product-detail-img"
        />
      </div>
      <Similarproduct productsData={similarProducts} />
    </div>
  );
}

const Similarproduct = ({ productsData }) => {
  const goto = useNavigate();
  const [products, setProducts] = useState([]);
  const [visibleCount] = useState(6);

  useEffect(() => {
    setProducts(productsData.slice(0, visibleCount));
  }, [productsData, visibleCount]);

  return (
    <div className="scontent">
      {products.map((product) => (
        <div
          className="scard"
          key={product.id}
          onClick={() => {
            goto(`/product/${product.id}`);
          }}
        >
          <img
            className="scard_img"
            src={product.img}
            alt={product.product_name}
          />
          <div className="scard_info">
            <p className="spname">{product.product_name}</p>
            <p className="spdes">{product.description}</p>
            <p className="sprice">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Individual;
