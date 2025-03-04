import React, { useState, useRef, useEffect } from "react";
import "./navbar.css";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import Avatar from "@mui/joy/Avatar";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Navbar({ cartCount }) {
  const goto = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      goto(`/search?query=${searchQuery}`);
    }
  };

  const sbar = () => {
    document.getElementById("searchbar").setAttribute("class", "searchchange");
  };

  useEffect(() => {
    setActiveTab(location.pathname);
    const storedUser = localStorage.getItem("user");
    setIsLoggedIn(storedUser !== null);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from storage
    setIsLoggedIn(false);
    setDropdownOpen(false);
    goto("/login"); // Redirect to login
  };

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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          onBlur={(e) => {
            if (e.relatedTarget === null) {
              e.target.focus();
            }
          }}
        />
      </div>
      <div className="user-menu">
        <Avatar
          variant="plain"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        />

        <div className="user-dropdown">
          {isLoggedIn ? (
            <div className="loginoption">
              <a href="/selling">Sell Product</a>
              <a onClick={handleLogout}>Logout</a>
            </div>
          ) : (
            <a href="/login">Login</a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
