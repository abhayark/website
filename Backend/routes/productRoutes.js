const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

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
router.post("/", upload.single("img"), async (req, res) => {
  try {
    const { product_name, description, price, seller, category } = req.body;

    if (!product_name || !description || !price || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Product image is required" });
    }
    const imageBase64 = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    const newProduct = new Product({
      product_name,
      description,
      price,
      img: imageBase64,
      seller: seller || "Unknown",
      category,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully!", product: newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
