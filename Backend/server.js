const express = require("express");
const app = express();

// Mock Product Data
const products = [
  {
    _id: "1",
    product_name: "Example Product",
    description: "An example product.",
    price: "100",
    img: "example.jpg",
  },
  // Add more products here...
];

// API Route
app.get("/api/products", (req, res) => {
  res.json(products); // Respond with JSON data
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
