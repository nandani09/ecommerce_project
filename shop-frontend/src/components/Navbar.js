import React from "react";
import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <nav
      style={{
        background: "#333",
        color: "white",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        <img src="logo.png" alt="MyEcommerce Logo" style={{ height: "50px", width: "auto" }} />
      </Link>
      <div style={{ marginTop: "10px" }}>
        <Link to="/login" style={{ color: "white", margin: "0 10px" }}>
          Login
        </Link>
        
        <Link to="/cart" style={{ color: "white", margin: "0 10px", position: "relative" }}>
          🛒 Cart{" "}
          {cartCount > 0 && (
            <span
              style={{
                background: "red",
                borderRadius: "50%",
                padding: "3px 7px",
                fontSize: "12px",
                position: "absolute",
                top: "-10px",
                right: "-10px",
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
