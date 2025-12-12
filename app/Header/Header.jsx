"use client";

import Link from "next/link"; 
import "./Header.css";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar">
      <div className="container-fluid">
        
        <Link className="navbar-brand fw-bold" href="#">
          Salon
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
          <ul className="navbar-nav ms-auto mb-lg-0">
            
            <li className="nav-item">
              <Link className="nav-link" href="#home">
                Home
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Services
              </Link>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="#courses">
                    Packages
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#courses">
                    Women's Styling
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#courses">
                    Men's Grooming
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" href="#whyus">
                Why Us
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" href="#about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" href="#contact">
                Contact
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link login-btn" href="#">
                Log In
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
