const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  const { email, username, password, address, mobile, gender } = req.body;
  try {
    const newUser = new User({
      email,
      username,
      password,
      address,
      mobile,
      gender,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
