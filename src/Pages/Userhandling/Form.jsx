import React, { useState } from "react";
import "./Form.css";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    passwordcm: "",
    address: "",
    mobile: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    passwordcm: "",
    address: "",
    mobile: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validate = () => {
    const { email, username, password, passwordcm, address, mobile, gender } =
      formData;
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{7,}$/;

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 7 characters and contain a number, a lowercase, and an uppercase letter";
    }
    if (password !== passwordcm) {
      newErrors.passwordcm = "Passwords do not match";
    }
    if (!address) {
      newErrors.address = "Address is required";
    }
    if (!mobile) {
      newErrors.mobile = "Mobile number is required";
    }
    if (!gender) {
      newErrors.gender = "Please select your gender";
    }
    if (!username) {
      newErrors.username = "Username is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) {
      console.log("Form contains errors:", errors);
      return;
    }

    console.log("Form submitted successfully!", formData);
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

          <div className="inputContainer">
            <input
              type="email"
              className="input"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email" className="label">
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
            <label htmlFor="username" className="label">
              Username
            </label>
            <small className="errorMessage">{errors.username}</small>
          </div>

          <div className="inputContainer">
            <input
              type="text"
              className="input"
              id="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <label htmlFor="address" className="label">
              Address
            </label>
            <small className="errorMessage">{errors.address}</small>
          </div>

          <div className="inputContainer">
            <input
              type="text"
              className="input"
              id="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />
            <label htmlFor="mobile" className="label">
              Mobile Number
            </label>
            <small className="errorMessage">{errors.mobile}</small>
          </div>

          <div className="inputContainer">
            <select
              className="input"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <label htmlFor="gender" className="label">
              Gender
            </label>
            <small className="errorMessage">{errors.gender}</small>
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
            <label htmlFor="password" className="label">
              Password
            </label>
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
            <label htmlFor="passwordcm" className="label">
              Confirm Password
            </label>
            <small className="errorMessage">{errors.passwordcm}</small>
          </div>

          <button type="submit" className="submitBtn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
export default Signup;
