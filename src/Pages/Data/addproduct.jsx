import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./addproduct.css";
import Navbar from "../../Components/Navbar/Navbar";

const categories = ["Electronics", "Clothing", "Home-appliances", "Books"];

const SellProduct = ({ cart }) => {
  const goto = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    description: "",
    sellerName: "",
    category: categories[0],
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !product.productName ||
      !product.price ||
      !product.description ||
      !product.category ||
      !product.image
    ) {
      alert("Please fill in all required fields and upload an image.");
      return;
    }
    const formData = new FormData();
    formData.append("product_name", product.productName);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("seller", product.sellerName);
    formData.append("category", product.category);
    formData.append("img", product.image);

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Product added successfully!");
        console.log("Product added:", data);
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  const [loggedin, setloggedin] = useState(false);
  useEffect(() => {
    const login = localStorage.getItem("user");
    if (!login) {
      goto("/login");
      alert("Login first to sell products");
    } else {
      setloggedin(true);
    }
  }, [goto]);

  return (
    <>
      <Navbar cartCount={cart.length} />
      {loggedin ? (
        <div className="sell-product-container">
          <h2 className="sell-product-title">Sell Your Product</h2>
          <form onSubmit={handleSubmit} className="sell-product-form">
            <input
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              placeholder="Product Name"
              className="sell-product-input"
              required
            />
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Price"
              className="sell-product-input"
              required
            />
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Description"
              className="sell-product-input"
              required
            />
            <input
              type="text"
              name="sellerName"
              value={product.sellerName}
              onChange={handleChange}
              placeholder="Seller Name"
              className="sell-product-input"
              required
            />
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="sell-product-input-sel"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sell-product-input"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Product Preview"
                className="sell-product-image"
              />
            )}
            <button type="submit" className="sell-product-button">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </>
  );
};

export default SellProduct;
