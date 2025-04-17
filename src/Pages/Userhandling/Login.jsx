import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("email", data.user.email);

        console.log("Saved email:", data.user.email);
        alert("Login successful!");

        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit} className="log_form">
        <img src="/Assets/logo.png" alt="Logo" className="logo" />
        <h1 className="ftitle">Welcome back</h1>
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
            type={showPassword ? "text" : "password"}
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
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              cursor: "pointer",
              color: "#ff4d4d",
              fontSize: "0.9rem",
            }}
          >
            👁
          </span>
        </div>
        <button type="submit" className="submitBtn">
          Login
        </button>
        <button className="submitBtn" onClick={() => navigate("/signup")}>
          Create an Account
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
