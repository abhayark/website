import React, { useState } from "react";
import "./Sign_up/Signup.css";
import { Email } from "@mui/icons-material";
import { colors } from "@mui/joy";

function Signup() {
  return (
    <div>
      <div className="signupFrm" id="form">
        <form action="" className="form">
          <img src="/Assets/logo.png" alt="Logo" className="logo" />
          <h1 className="title">Create a account</h1>

          <div className="inputContainer">
            <input
              type="email"
              className="input"
              id="email"
              placeholder="Email"
            />
            <label htmlFor="" className="label">
              Email
            </label>
            <small>email</small>
          </div>

          <div className="inputContainer">
            <input
              type="text"
              className="input"
              id="username"
              placeholder="Username"
            />
            <label htmlFor="" className="label">
              Username
            </label>
            <small>Username</small>
          </div>

          <div className="inputContainer">
            <input
              type="new-password"
              className="input"
              id="password"
              placeholder="Password"
            />
            <label htmlFor="" className="label">
              Password
            </label>
            <small>password</small>
          </div>

          <div className="inputContainer">
            <input
              type="new-password"
              className="input"
              id="passwordcm"
              placeholder="Confirm"
            />
            <label htmlFor="" className="label">
              Confirm Password
            </label>
            <small>passwordcm</small>
          </div>

          <button type="button" className="submitBtn">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
export default Signup;
