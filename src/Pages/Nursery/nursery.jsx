import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import "./nursery.css";

export default function Nursery({ cart }) {
  return (
    <>
      <Navbar cartCount={cart.length} />
    </>
  );
}
