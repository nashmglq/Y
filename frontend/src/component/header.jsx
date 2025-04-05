import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminCheckerActions } from "../actions/adminActions";
import { searchYActions } from "../actions/crudActions";

const Navbar = () => {
  const [query, setSearch] = useState("");

  const nav = useNavigate();
  const dispatch = useDispatch();
  const logOut = (e) => {
    e.preventDefault();
    const removeToken = localStorage.removeItem("userInfo");
    nav("/");
  };

  const search = (e) => {
    e.preventDefault();
    const formData = { query };
    dispatch(searchYActions(formData));
    nav("/search");
  };

  const { message } = useSelector((state) => state.adminChecker);

  useEffect(() => {
    dispatch(adminCheckerActions());
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark sticky-top">
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
        <form class="d-flex" onSubmit={search}>
          <input
            class="form-control mr-sm-2 bg-light font-white text-body"
            type="search"
            placeholder="Find Y..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn" type="submit">
            Search
          </button>
        </form>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            {message == 1 ? (
              <Link to="/admin-dashboard" className="nav-link text-light">
                <h6 className="text-dark">Dashboard</h6>
              </Link>
            ) : null}
          </li>
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
          <li className="nav-item"></li>
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
