import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    passwordcm: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validate = () => {
    const { email, username, password, passwordcm } = formData;
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{7,}$/;

    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Enter a valid email";

    if (!password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(password))
      newErrors.password =
        "Password must be at least 7 characters with a number, a lowercase and an uppercase letter";

    if (password !== passwordcm)
      newErrors.passwordcm = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/signup",
          formData
        );
        console.log("Signup Successful:", response.data);
        setSuccessMessage("Signup successful! Redirecting...");
      } catch (error) {
        console.error("Signup failed:", error.response?.data || error.message);
        setErrors({ general: "Signup failed. Try again." });
      }
    }
  };

  return (
    <div className="main">
      <div
        className={`inputContainer ${
          errors.username ? "inputContainer_error" : ""
        }`}
      >
        <form onSubmit={handleSubmit} className="form" id="form">
          <img src="/Assets/logo.png" alt="Logo" className="logo" />
          <h1 className="title">Create an Account</h1>

          {successMessage && <p className="successMessage">{successMessage}</p>}
          {errors.general && <p className="errorMessage">{errors.general}</p>}

          <div className="inputContainer">
            <input
              type="email"
              className="input"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <label className="label">Email</label>
            <small className="errorMessage">{errors.email}</small>
          </div>

          <div className="inputContainer">
            <input
              type="text"
              className="input"
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <label className="label">Username</label>
            <small className="errorMessage">{errors.username}</small>
          </div>

          <div className="inputContainer">
            <input
              type="password"
              className="input"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <label className="label">Password</label>
            <small className="errorMessage">{errors.password}</small>
          </div>

          <div className="inputContainer">
            <input
              type="password"
              className="input"
              id="passwordcm"
              placeholder="Confirm Password"
              value={formData.passwordcm}
              onChange={handleChange}
            />
            <label className="label">Confirm Password</label>
            <small className="errorMessage">{errors.passwordcm}</small>
          </div>

          <button type="submit" className="signupBtn">
            Signup
          </button>

          <Link className="linking" to="/">
            <button type="submit" className="loginBtn">
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
