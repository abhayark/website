const express = require("express");
const Service = require("../models/Service");
const multer = require("multer");

const router = express.Router();

// ✅ Configure `multer` to handle image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ GET route: Fetch all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST route: Add a new service
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

    // ✅ Convert image to Base64
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

module.exports = router;
