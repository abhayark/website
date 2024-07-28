import React from 'react';
import './App.css';
import { HashRouter as Map ,Router,Route } from 'react-router-dom'
import  Home  from './Pages/Home.js'
import Signin from './Pages/Signin.js';

function App() {
  return (
    <div>
        <Map>
          <Router>
              <Route path="/" element={<Home/>} />
              <Route path="/Signin" element={<Signin/>} />
          </Router>
        </Map>
    </div>
  );
}

export default App;
