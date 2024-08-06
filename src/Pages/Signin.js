import React, { useState } from "react";
import "./Sign_up/Signup.css";
import { Email } from "@mui/icons-material";
import { colors } from "@mui/joy";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    passwordcm: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    passwordcm: "",
  });

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

    if (!username) {
      newErrors.username = "Username is required";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 7 characters and contain a number, a lowercase and an uppercase letter";
    }
    if (password !== passwordcm) {
      newErrors.passwordcm = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form data is valid:", formData);
      // Proceed with form submission (e.g., API call)
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
          <h1 className="title">Create a account</h1>

          <div className="inputContainer">
            <input
              type="email"
              className="input"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="" className="label">
              Email
            </label>
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
            <label htmlFor="" className="label">
              Username
            </label>
            <small className="errorMessage">{errors.username}</small>
          </div>

          <div className="inputContainer">
            <input
              type="new-password"
              className="input"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="" className="label">
              Password
            </label>
            <small className="errorMessage">{errors.password}</small>
          </div>

          <div className="inputContainer">
            <input
              type="new-password"
              className="input"
              id="passwordcm"
              placeholder="Confirm"
              value={formData.passwordcm}
              onChange={handleChange}
            />
            <label htmlFor="" className="label">
              Confirm Password
            </label>
            <small className="errorMessage">{errors.passwordcm}</small>
          </div>

          <button type="submit" className="submitBtn">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
export default Signup;
