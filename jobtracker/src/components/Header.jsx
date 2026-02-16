import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";



function Header() {
  return (
    <nav className="navbar navbar-expand-sm bg-white border-bottom shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <img src={logo} alt="Logo" style={{ height: "45px", width: "auto" }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#jobtrackNavbar"
          aria-controls="jobtrackNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

       {/* NavLink */}
        <div className="collapse navbar-collapse" id="jobtrackNavbar">
          <ul className="navbar-nav ms-auto align-items-sm-center">
            <li className="nav-item" >
              <a className="nav-link fw-medium" href="#features">
                Features
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-medium" href="#pricing">
                Pricing
              </a>
            </li>

            <li className="nav-item mt-2 mt-sm-0 ms-sm-3">
              <Link to="/signup" className="btn btn-outline-primary btn-md fw-medium">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
