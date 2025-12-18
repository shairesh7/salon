"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./Header.css";

import Login from "../Login/Login";
import ProfileModal from "../Profile/Profile";
import Portal from "../Portal/Portal";
import WomensPortal from "../WomenPortal/WomensPortal";

export default function Header() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [serviceType, setServiceType] = useState(null);
  const [user, setUser] = useState(null);
  
useEffect(() => {
  console.log("serviceType =", serviceType);
}, [serviceType]);


  // Load user from localStorage
  useEffect(() => {
    const updateUser = () => {
      const u = localStorage.getItem("userData");
      setUser(u ? JSON.parse(u) : null);
    };

    updateUser();
    window.addEventListener("storage", updateUser);

    return () => window.removeEventListener("storage", updateUser);
  }, []);

  // Logout
  const logout = () => {
    localStorage.removeItem("userData");
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      {/* NAVBAR */}
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
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-lg-0">

              <li className="nav-item"><Link className="nav-link" href="#home">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" href="#whyus">Why Us</Link></li>
              <li className="nav-item"><Link className="nav-link" href="#about">About</Link></li>
              <li className="nav-item"><Link className="nav-link" href="#contact">Contact</Link></li>

              {!user && (
                <li className="nav-item">
                  <button
                    className="nav-link login-btn btn-link"
                    onClick={() => setOpenLogin(true)}
                  >
                    Log In
                  </button>
                </li>
              )}

             {user && (
  <li className="nav-item profile-wrapper">

    {/* MY PROFILE */}
    <div
      className="profile-action"
      onClick={() => setOpenProfile(true)}
    >
      <span className="profile-icon">
        {user.name.charAt(0).toUpperCase()}
      </span>
      <span className="profile-text">My Profile</span>
    </div>

    {/* LOGOUT */}
    <div
      className="profile-action logout"
      onClick={logout}
    >
      <span className="logout-icon">⏻</span>
      <span className="profile-text">Logout</span>
    </div>

  </li>
)}

            </ul>
          </div>
        </div>
      </nav>

      {/* LOGIN MODAL */}
      {openLogin && (
        <Portal>
          <Login onClose={() => setOpenLogin(false)} />
        </Portal>
      )}

      {/* PROFILE MODAL */}
      {openProfile && (
        <Portal>
          <ProfileModal
            onClose={() => setOpenProfile(false)}
            onOpenServices={(type) => {
              setServiceType(type);     // "women" | "men" | "packages"
              setOpenProfile(false);
              setOpenServices(true);
            }}
          />
        </Portal>
      )}

      {/* WOMENS PORTAL */}
      {openServices && serviceType === "women" && (
        <Portal>
          <WomensPortal
            onClose={() => {
              setOpenServices(false);
              setServiceType(null);
            }}
          />
        </Portal>
      )}
    </>
  );
}
