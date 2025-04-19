const express = require("express");
const Service = require("../models/Service");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/resorts", async (req, res) => {
  try {
    const resort = await Service.find({ category: "Resorts" });
    res.json(resort);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/nursery", async (req, res) => {
  try {
    const nursery = await Service.find({ category: "Nursery products" });
    res.json(nursery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/cabs", async (req, res) => {
  try {
    const cabs = await Service.find({ category: "Cab Driver" }); // Match exact category
    res.json(cabs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("Received data:", req.body);
    console.log("Uploaded file:", req.file); // Debugging log

    const { service_name, description, price, provider, category } = req.body;

    if (!service_name || !description || !price || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Service image is required" });
    }

    const imageBase64 = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    const newService = new Service({
      service_name,
      description,
      price,
      provider: provider || "Unknown",
      category,
      image: imageBase64,
    });

    await newService.save();
    res
      .status(201)
      .json({ message: "Service added successfully!", service: newService });
  } catch (err) {
    console.error("Error processing request:", err);
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Service not found" });
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete service" });
  }
});


module.exports = router;
