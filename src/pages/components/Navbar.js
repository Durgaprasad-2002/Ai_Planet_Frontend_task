import React from "react";
import "../styles.css";
import { FaPlayCircle } from "react-icons/fa";

export default function Navbar({ onRunClick }) {
  return (
    <nav className="navbar">
      <div className="title-container">
        <h3 className="brandname">AI Planet</h3>
      </div>
      <div className="links-container container">
        <button className="btn btn-1">Deploy</button>
        <button className="btn btn-2" onClick={onRunClick}>
          <FaPlayCircle />
          Run
        </button>
      </div>
    </nav>
  );
}
