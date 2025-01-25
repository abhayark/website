import React from "react";
import "./App.css";
import Home from "./Pages/Home/Home.js";
import Individual from "./Pages/Data/Individual.js";
import Signup from "./Pages/Sign_up/Signup.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/product/:id" element={<Individual />} />
      </Routes>
    </div>
  );
}

export default App;
