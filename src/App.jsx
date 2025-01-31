import React, { useState } from "react";
import Home from "./Pages/Home/Home.jsx";
import Individual from "./Pages/Data/Individual.jsx";
import Signup from "./Pages/Sign_up/Signup.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Basket from "./Pages/Basket.jsx";

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
          <Route path="/Signup" element={<Signup />} />
          <Route
            path="/cart"
            element={<Basket cart={cart} onRemove={handleRemoveFromCart} />}
          />
          <Route path="/product/:id" element={<Individual />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
