const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/history/:email', async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ error: 'Email parameter is required' });
  }

  try {
    const orders = await Order.find({ email });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      service,
      serviceId,
      serviceName,
      price,
      paymentMethod,
    } = req.body;

    if (
      !customerName ||
      !email ||
      !phone ||
      !service ||
      !serviceId ||
      !serviceName ||
      !price ||
      !paymentMethod
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newOrder = new Order({
      customerName,
      email,
      phone,
      service,
      serviceId,
      serviceName,
      price,
      paymentMethod,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order updated", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
