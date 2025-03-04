import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./Searchpage.css";

export default function SearchPage({ cart }) {
  const [productsData, setProductsData] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query")?.toLowerCase() || "";
  const goto = useNavigate();

  // Fetch product data from API
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProductsData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter products based on search query
  const filteredProducts = productsData.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      <Navbar cartCount={cart.length} />
      <div className="search-container">
        <h2 className="search-title">Search Results for "{searchQuery}"</h2>
        <div className="search-results">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="search-card"
                onClick={() => {
                  goto(`/products/${product._id}`);
                }}
              >
                <img
                  className="search-card-img"
                  src={
                    product.img.startsWith("http")
                      ? product.img
                      : `${product.img}`
                  }
                  alt={product.product_name}
                />
                <div className="search-card-info">
                  <p className="search-card-name">{product.product_name}</p>
                  <p className="search-card-price">₹{product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No products found.</p>
          )}
        </div>
      </div>
    </>
  );
}
