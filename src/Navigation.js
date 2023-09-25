import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navigation({ setIsEditing, isEditing }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest(".menu")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <div className="menu">
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>
      {menuOpen && (
        <div className="dropdown">
          <Link to="/addcard">Lägg till kort</Link>
          <Link to="/cards">Visa alla kort</Link>
          <span className="edit" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Klar" : "Redigera"}
          </span>
        </div>
      )}
    </div>
  );
}

export default Navigation;
