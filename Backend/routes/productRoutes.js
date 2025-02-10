const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Fetch all products (GET)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new product (POST)
router.post("/", async (req, res) => {
  try {
    const { product_name, description, price, img, seller } = req.body;

    // Ensure all required fields are provided
    if (!product_name || !description || !price || !img) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProduct = new Product({
      product_name,
      description,
      price,
      img,
      seller: seller || "Unknown",
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/", (req, res) => {
  res.status(201).json({ message: "Product added successfully!" });
});
module.exports = router;
