import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Individual from "./Pages/Data/Individual.jsx";
import Login from "./Pages/Userhandling/Login.jsx";
import Cart from "./Pages/Cart.jsx";
import "./App.css";
import Form from "./Pages/Userhandling/Form.jsx";
import CabBooking from "./Pages/Cab/cabbing.jsx";

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div className="Mainframe">
      <>
        <Routes>
          <Route
            path="/"
            element={<Home handleAddToCart={handleAddToCart} cart={cart} />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/cart"
            element={<Cart cart={cart} onRemove={handleRemoveFromCart} />}
          />
          <Route path="/products/:_id" element={<Individual />} />
          <Route path="/signup" element={<Form />} />
          <Route path="/cab" element={<CabBooking />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
