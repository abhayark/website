import React from "react";
import "./Contact.css";
import Navbar from "../../Components/Navbar/Navbar.jsx";

export default function ContactUs({ cart }) {
  return (
    <>
      <Navbar cartCount={cart.length} />
      <div className="contact-container">
        <div className="contact-info">
          <h2 className="contact-detail">Contact Us</h2>
          <p>Email, call, or complete the form to get in touch with us.</p>
          <p className="contact-detail">Email:Urbanoaiss@ark.com</p>
          <p className="contact-detail">Phone: +91 9699523953</p>
          <p className="contact-detail">Customer Support: Available 24/7</p>
        </div>
        <div className="contact-form">
          <h2 style={{ color: "white" }}>Get in Touch</h2>

          <input
            className="contact-input"
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />
          <input
            className="contact-input"
            type="email"
            name="email"
            placeholder="Your Email"
            required
          />
          <input
            className="contact-input"
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
          />
          <textarea
            className="contact-textarea"
            name="message"
            rows="4"
            placeholder="Your Message"
            required
          />
          <button className="contact-submit" type="submit">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
