import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <Link to="/home">
        <img src="Y-final-bg.png" alt="Y logo" style={{ height: 80 }} />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link to="/profile" className="nav-link text-light">
              <h6 className="text-dark">Profile</h6>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/information" className="nav-link text-light">
              <h6 className="text-dark">Information</h6>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;