import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const nav = useNavigate("/");
  const logOut = (e) => {
    e.preventDefault();
    const removeToken = localStorage.removeItem("userInfo");
    nav("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <Link to="/home">
        <img src="Y-final-bg.png" alt="Y logo" style={{ height: 60 }} />
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
          </li>
          <li className="nav-item">
            <Link
              to="/information"
              onClick={logOut}
              className="nav-link text-light"
            >
              <h6 className="text-dark">Log out</h6>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
