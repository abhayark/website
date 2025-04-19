import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LocalLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (username === "ark" && password === "ark") {
      localStorage.setItem("user", JSON.stringify({ username }));
      alert("Login successful!");
      navigate("/admin");
    } else {
      setMessage("Invalid username or password.");
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit} className="log_form">
        <img src="/Assets/logo.png" alt="Logo" className="logo" />
        <h1 className="ftitle">Admin Login</h1>

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
            required
          />
          <label htmlFor="password" className="label">
            Password
          </label>
        </div>

        <button type="submit" className="submitBtn">
          Login
        </button>

        {message && <p style={{ color: "red" }}>{message}</p>}
      </form>
    </div>
  );
};

export default LocalLogin;
