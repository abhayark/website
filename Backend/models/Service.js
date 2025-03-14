const mongoose = require("mongoose");

// Define the Service schema
const serviceSchema = new mongoose.Schema({
  service_name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  provider: { type: String, default: "Unknown" },
  category: { type: String, required: true },
});

// Create the Service model
const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
