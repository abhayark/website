import React from "react";
import "./navbar.css";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import Avatar from "@mui/joy/Avatar";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const goto = useNavigate();
  return (
    <div className="container">
      <img src="/Assets/logo.png" alt="Logo" className="img"></img>

      <ul className="func">
        <div className="home">
          <button
            onBlur={(e) => {
              if (e.relatedTarget === null) {
                e.target.focus();
              }
            }}
            onClick={() => goto("/")}
            className="homebn"
          >
            Home
          </button>
        </div>

        <div className="Basket">
          <button
            onBlur={(e) => {
              if (e.relatedTarget === null) {
                e.target.focus();
              }
            }}
            onClick={() => goto("/")}
            className="basketbn"
          >
            Basket
          </button>
        </div>

        <div className="Services">
          <button
            onBlur={(e) => {
              if (e.relatedTarget === null) {
                e.target.focus();
              }
            }}
            onClick={() => goto("/")}
            className="services"
          >
            Services
          </button>
        </div>
      </ul>

      <div className="search">
        <SearchSharpIcon
          className="searchicon"
          onClick={(e) => {
            e.target.click();
          }}
        />
        <input type="text" placeholder="What's today?" className="searchbar" />
      </div>
      <div className="register">
        <Avatar variant="plain" onClick={() => goto("/signin")} />
      </div>
    </div>
  );
}

export default Navbar;
