const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  img: { type: String, required: true },
  seller: { type: String, default: "Unknown" },
});

// Create the Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
