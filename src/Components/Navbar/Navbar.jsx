import React, { useState, useRef, useEffect } from "react";
import "./navbar.css";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import Avatar from "@mui/joy/Avatar";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Navbar({ cartCount }) {
  const buttonRef = useRef(null);
  const goto = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const sbar = () => {
    document.getElementById("searchbar").setAttribute("class", "searchchange");
  };

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  return (
    <div className="container">
      <img src="/Assets/logo.png" alt="Logo" className="img"></img>

      <ul className="func">
        <div className="home">
          <button
            onClick={() => goto("/")}
            className={`homebn ${activeTab === "/" ? "active" : ""}`}
          >
            Home
          </button>
        </div>

        <div className="cart">
          <button
            onClick={() => goto("/cart")}
            className={`cartbn ${activeTab === "/cart" ? "active" : ""}`}
          >
            Cart{" "}
            {cartCount > 0 && <span className="bcount">[{cartCount}]</span>}
          </button>
        </div>

        <div className="Services">
          <button
            onClick={() => goto("/services")}
            className={`services ${activeTab === "/services" ? "active" : ""}`}
          >
            Services
          </button>
        </div>
      </ul>

      <div className="search">
        <button onClick={() => sbar(true)} className="searchbutton">
          <SearchSharpIcon className="searchicon" fontSize="large" />
        </button>
        <input
          type="input"
          id="searchbar"
          className="searchbar"
          onBlur={(e) => {
            if (e.relatedTarget === null) {
              e.target.focus();
            }
          }}
        />
      </div>
      <div className="register">
        <Link to="/signup">
          <Avatar variant="plain" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
