"use client";
import "./Profile.css";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function ProfileModal({ onClose, onOpenServices }) {
  const user = JSON.parse(localStorage.getItem("userData") || "{}");

  return (
    <div className="profile-overlay">
      <div className="profile-card">

        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-phone">📞 {user.phone}</p>

        <button className="profile-btn">📩 My Enquiries</button>

        <hr />

        <h4 className="section-title">MY PRICES</h4>

        <div
          className="profile-row clickable"
          onClick={() => onOpenServices("packages")}
        >
          <span>Packages</span>
          <span className="active-badge">ACTIVE</span>
        </div>

        <div
          className="profile-row clickable"
          onClick={() => onOpenServices("women")}
        >
          <span>Women's Styling</span>
          <span className="active-badge">ACTIVE</span>
        </div>

        <div
          className="profile-row clickable"
          onClick={() => onOpenServices("men")}
        >
          <span>Men's Grooming</span>
          <span className="active-badge">ACTIVE</span>
        </div>

        <hr />

        <h4 className="section-title">MY SOCIAL HANDLES</h4>

        <p className="profile-link social">
          <FaInstagram className="social-icon instagram" /> Instagram
        </p>

        <p className="profile-link social">
          <FaFacebookF className="social-icon facebook" /> Facebook
        </p>

        <hr />

        <h4 className="section-title">LOCATIONS & HOURS</h4>

        <p className="profile-link">🏠 Home Location</p>
        <p className="profile-link">🏢 Business Location</p>
        <p className="profile-link">⏰ Business Hours</p>

        <button className="close-profile" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
