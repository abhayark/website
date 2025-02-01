import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Individual from "./Pages/Data/Individual.jsx";
import Signup from "./Pages/Sign_up/Signup.jsx";
import Cart from "./Pages/Cart.jsx";
import "./App.css";
import Form from "./Pages/Sign_up/Form.jsx";

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
            element={<Cart cart={cart} onRemove={handleRemoveFromCart} />}
          />
          <Route path="/product/:id" element={<Individual />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
