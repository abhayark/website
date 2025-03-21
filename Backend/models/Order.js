const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  phone: String,
  service: String, // Cab, Product, Nursery, Resort
  serviceId: mongoose.Schema.Types.ObjectId,
  serviceName: String,
  price: Number,
  status: { type: String, default: "Pending" },
  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
