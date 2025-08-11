import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import feather from "feather-icons";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    feather.replace();
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleClick = () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("You must be logged in to view your profile.",{
        style:{minWidth: "400px"}
      });
      setTimeout(() => navigate("/login"), 400); 
      return;
    }    
  
    navigate("/profile");
  };
  
  return (
    <div id="header">
      {/* Navigation */}
      <div className="full-navbar">
        <nav className="navbar" role="navigation" aria-label="Main navigation">
          <NavLink to="/" className="logo" aria-label="IJCS Homepage">
            <svg
              className="logo-svg"
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="42" height="42" rx="8" fill="url(#logoGradient)" />
              <path
                d="M12 12h18v3H12v-3zm0 6h18v12H12V18zm3 3h12v6H15v-6z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="logoGradient"
                  x1="0"
                  y1="0"
                  x2="42"
                  y2="42"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#2563eb" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <span className="logo-text">IJSC</span>
          </NavLink>

          <div className="navbar-right">
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search articles..."
                aria-label="Search articles"
              />
              <i className="search-icon" data-feather="search" aria-hidden="true"></i>
            </div>

            <div className="auth-buttons">
              <Link to="/signup">
                <button className="btn btn-signin">Sign Up</button>
              </Link>
              <Link to="/submit">
                <button className="btn btn-submit">Submit Paper</button>
              </Link>
            </div>

            <div className="profile-icon" onClick={handleClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 80 80"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                  >
                    <circle cx="40" cy="40" r="38" stroke="black" strokeWidth="4" fill="white" />
                    <circle cx="40" cy="30" r="12" stroke="black" strokeWidth="4" fill="white" />
                    <path
                      d="M20 65c0-11 9-20 20-20s20 9 20 20"
                      stroke="black"
                      strokeWidth="4"
                      fill="white"
                    />
                  </svg>
            </div>


            <button
              className="mobile-menu-btn"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
              onClick={toggleMobileMenu}
            >
              <i data-feather="menu"></i>
            </button>
          </div>
        </nav>

        <div className="navbar-left">
          <div className="nav-links" role="menubar">
            <div className="navbar-bottom">
            <NavLink to="/" role="menuitem">Home</NavLink>
              <NavLink to="/aim" role="menuitem">Aim & Scope</NavLink>
              <NavLink to="/editorial" role="menuitem">Editorial Board</NavLink>

              {/* Dropdown */}
              <div className="dropdown" role="menuitem">
                <button className="dropbtn">
                  For Author <span className="arrow-down"></span>
                </button>
                <div className="dropdown-content">
                  <NavLink to="/author-guidelines">Author Guidelines</NavLink>
                  <NavLink to="/research-areas">Research Areas</NavLink>
                  <NavLink to="/correction-policy">Correction Policy</NavLink>
                  <NavLink to="/plagiarism-policy">Plagiarism Policy</NavLink>
                </div>
              </div>

              <NavLink to="/reviewProcess" role="menuitem">Review Process</NavLink>
              <NavLink to="/reviewerGuidelines" role="menuitem">Reviewer Guidelines</NavLink>
              <NavLink to="/ethics" role="menuitem">Ethics</NavLink>
              <NavLink to="/contact" role="menuitem">Contact Us</NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu" id="mobile-menu" role="menu">
          <div className="nav-links" role="none">
            <NavLink to="/about" role="menuitem" onClick={toggleMobileMenu}>About</NavLink>
            <NavLink to="/editorial" role="menuitem" onClick={toggleMobileMenu}>Editorial Board</NavLink>
            <NavLink to="/submissions" role="menuitem" onClick={toggleMobileMenu}>Submissions</NavLink>
            <NavLink to="/calls" role="menuitem" onClick={toggleMobileMenu}>Call for Papers</NavLink>
            <NavLink to="/contact" role="menuitem" onClick={toggleMobileMenu}>Contact</NavLink>
          </div>

          <div className="search-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search articles..."
              aria-label="Search articles"
            />
            <i className="search-icon" data-feather="search" aria-hidden="true"></i>
          </div>

          <div className="auth-buttons">
            <button className="btn btn-signin">Sign Up</button>
            <button className="btn btn-submit">Submit Paper</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
