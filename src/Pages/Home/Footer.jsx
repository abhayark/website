import React from "react";
import "./Footer.css";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src="/Assets/logo.png" alt="Logo" className="footer-logo" />
        <p className="tagline">Your One-Stop Online Shop</p>{" "}
      </div>

      <div className="footer-links">
        <h4>Quick Links</h4>
        <a href="/">Home</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
        <a href="/login">Login</a>
      </div>

      <div className="footer-social">
        <h4>Follow Us</h4>
        <div className="social-icons">
          <a href="https://github.com/abhayark" target="_blank">
            <FaGithub className="sicon" />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Urban Oasis. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
