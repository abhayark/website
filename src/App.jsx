import React from "react";
import Home from "./Pages/Home/Home.jsx";
import Individual from "./Pages/Data/Individual.jsx";
import Signup from "./Pages/Sign_up/Signup.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="Mainframe">
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/product/:id" element={<Individual />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
