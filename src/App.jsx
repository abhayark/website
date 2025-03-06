import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home.jsx";
import Individual from "./Pages/Data/Individual.jsx";
import Login from "./Pages/Userhandling/Login.jsx";
import Cart from "./Pages/Cart.jsx";
import Form from "./Pages/Userhandling/Form.jsx";
import CabBooking from "./Pages/Cab/cabbing.jsx";
import AddProduct from "./Pages/Data/addproduct.jsx";
import Services from "./Pages/ServicesHolder/Serviecs.jsx";
import Nursery from "./Pages/Nursery/nursery.jsx";
import ContactUs from "./Pages/Contact/Contact.jsx";
import SearchPage from "./Pages/Data/Searchpage.jsx";
import CabSearch from "./Pages/Cab/cabsearch.jsx";

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };
  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);

  return (
    <div className="Mainframe">
      <>
        <Routes>
          <Route
            path="/"
            element={<Home handleAddToCart={handleAddToCart} cart={cart} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Form />} />
          <Route
            path="/cart"
            element={<Cart cart={cart} onRemove={handleRemoveFromCart} />}
          />

          <Route
            path="/products/:id"
            element={
              <Individual handleAddToCart={handleAddToCart} cart={cart} />
            }
          />

          <Route path="services" element={<Services cart={cart} />} />

          <Route path="/cab" element={<CabBooking cart={cart} />} />
          <Route path="/cab-search" element={<CabSearch />} />
          <Route path="/nursery" element={<Nursery cart={cart} />} />

          <Route path="/selling" element={<AddProduct cart={cart} />} />

          <Route path="/contact" element={<ContactUs cart={cart} />} />

          <Route path="/search" element={<SearchPage cart={cart} />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
