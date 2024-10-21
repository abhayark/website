import React, { useRef, useEffect } from "react";
import "./navbar.css";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import Avatar from "@mui/joy/Avatar";
import { useNavigate, Link } from "react-router-dom";
import "./navbar.css";
import { BorderBottomTwoTone } from "@mui/icons-material";

function Navbar() {
  const buttonRef = useRef(null);
  const goto = useNavigate();

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.style.outline = "none";
      buttonRef.current.focus();
    }
  }, []);

  return (
    <div className="container">
      <img src="/Assets/logo.png" alt="Logo" className="img"></img>

      <ul className="func">
        <div className="home">
          <button
            ref={buttonRef}
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
        <input
          type="input"
          className="searchbar"
          onBlur={(e) => {
            if (e.relatedTarget === null) {
              e.target.focus();
            }
          }}
        />
        <SearchSharpIcon className="searchicon" fontSize="large" />
      </div>
      <div className="register">
        <Avatar variant="plain" onClick={() => goto("/signin")} />
      </div>
    </div>
  );
}

export default Navbar;
