import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import '../index.css'
import { TrendingUp } from "lucide-react";


function Header() {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-sm bg-white border-bottom shadow-sm ">
      <div className="container flex-sm-nowrap py-2">
        <Link className="navbar-brand navbar_logo d-flex align-items-center fw-bold fs-3" to="/">
          <TrendingUp size={28} className="me-2 text-primary" />
          JobTrack
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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item" >
              <a className="nav-link fw-semibold" href="#features">
                Features
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#pricing">
                Pricing
              </a>
            </li>

            {/* <li className="nav-item mt-2 mt-sm-0 ms-sm-3">
              <Link to="/signup" className="btn btn-outline-primary btn-md fw-medium">
                Login
              </Link>
            </li> */}

            <button onClick={()=> navigate('/signup')}>
              <span className="text-center login_text">Login</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 74 74"
                height="34"
                width="34"
              >
                <circle stroke-width="3" stroke="white" r="35.5" cy="37" cx="37"></circle>
                <path
                  fill="white"
                  d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                ></path>
              </svg>
            </button>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
