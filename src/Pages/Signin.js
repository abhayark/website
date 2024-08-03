import React, { useState } from "react";
import "./Sign_up/Signup.css";
import { Email } from "@mui/icons-material";
import validate from "./Sign_up/Inspector";
import { colors } from "@mui/joy";

function Signup() {
  const [values, setValues] = useState({
    email: " ",
    username: " ",
    password: " ",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});

  function inputHandler(event) {
    const newObj = { ...values, [event.target.username]: event.target.value };
    setValues(newObj);
  }

  function handlevalidation(event) {
    event.preventDefault();
    setErrors(validate(values));
  }

  return (
    <body>
      <div class="signupFrm">
        <form action="" class="form" onSubmit={handlevalidation}>
          <img src="/Assets/logo.png" alt="Logo" className="logo" />
          <h1 className="title">Create a account</h1>

          <div class="inputContainer">
            <input
              type="text"
              class="input"
              placeholder="Email"
              onChange={inputHandler}
            />
            {errors.email && <p className="inputerrors">{errors.email}</p>}
            <label for="" class="label">
              Email
            </label>
          </div>

          <div class="inputContainer">
            <input
              type="text"
              class="input"
              placeholder="Username"
              onChange={inputHandler}
            />
            {errors.username && (
              <p style={{ color: "red" }}>{errors.username}</p>
            )}
            <label for="" class="label">
              Username
            </label>
          </div>

          <div class="inputContainer">
            <input
              type="text"
              class="input"
              placeholder="Password"
              onChange={inputHandler}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
            <label for="" class="label">
              Password
            </label>
          </div>

          <div class="inputContainer">
            <input
              type="text"
              class="input"
              placeholder="Confirm"
              onChange={inputHandler}
            />
            {errors.confirm_password && (
              <p style={{ color: "red" }}>{errors.confirm_password}</p>
            )}
            <label for="" class="label">
              Confirm Password
            </label>
          </div>

          <button type="submit" class="submitBtn">
            Sign up
          </button>
        </form>
      </div>
    </body>
  );
}

export default Signup;
