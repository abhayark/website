import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    address: "",
    mobile: "",
    gender: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        alert("Signup successful! You can now log in.");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="signup_form">
      <form className="form" onSubmit={handleSubmit}>
        <img src="/Assets/logo.png" alt="Logo" className="logo" />
        <h1 className="ftitle">Create an Account</h1>
        <div className="inputContainer">
          <input
            type="email"
            name="email"
            className="input"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email" className="label">
            Email
          </label>
        </div>

        <div className="inputContainer">
          <input
            type="text"
            name="username"
            className="input"
            id="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="username" className="label">
            Username
          </label>
        </div>

        <div className="inputContainer">
          <input
            type="password"
            name="password"
            className="input"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="password" className="label">
            Password
          </label>
        </div>

        <div className="inputContainer">
          <input
            type="text"
            name="address"
            className="input"
            id="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <label htmlFor="address" className="label">
            Address
          </label>
        </div>

        <div className="inputContainer">
          <input
            type="text"
            name="mobile"
            className="input"
            id="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
          />
          <label htmlFor="mobile" className="label">
            Mobile Number
          </label>
        </div>

        <select
          className="selectfield"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option className="seloption" value="">
            Select Gender
          </option>
          <option className="seloption" value="Male">
            Male
          </option>
          <option className="seloption" value="Female">
            Female
          </option>
        </select>

        <button className="submitBtn" type="submit">
          Sign Up
        </button>
        {message && <p className="message-text">{message}</p>}
      </form>
    </div>
  );
};

export default SignupForm;
