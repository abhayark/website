import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import product_card from "./product_data";
import Navbar from "../../Components/Navbar/Navbar";
import "./Individual.css";

function Individual() {
  const Similarproduct = ({ productsData }) => {
    const goto = useNavigate();
    const [products, setProducts] = useState([]);
    const [visibleCount] = useState(6);

    useEffect(() => {
      setProducts(productsData.slice(0, visibleCount));
    }, [productsData, visibleCount]);

    return (
      <div className="scontent">
        {products.map((item) => (
          <div
            className="scard"
            key={item.id}
            onClick={() => {
              goto(`/product/${item.id}`);
            }}
          >
            <img className="scard_img" src={item.img} alt={item.product_name} />
            <div className="scard_info">
              <p className="spname">{item.product_name}</p>
              <p className="spdes">{item.description}</p>
              <p className="sprice">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const { id } = useParams(); // Extract the dynamic parameter
  const product = product_card.find((item) => item.id === parseInt(id)); // Find the product by ID

  if (!product) {
    return <p>Product not found</p>; // Handle invalid IDs
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
          src={product.img}
          alt={product.product_name}
          className="product-detail-img"
        />
      </div>
      <Similarproduct productsData={product_card} />
    </div>
  );
}

export default Individual;
