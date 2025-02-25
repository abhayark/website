import React, { useState } from "react";
import "./addproduct.css";
import Navbar from "../../Components/Navbar/Navbar";

const categories = ["electronics", "clothing", "home appliances", "books"];

const SellProduct = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Submitted", product);
  };

  return (
    <>
      <Navbar></Navbar>
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
    </>
  );
};

export default SellProduct;
