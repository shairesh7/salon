"use client";
import "./Footer.css";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-col">
          <h3 className="footer-title">Harish</h3>
          <p className="footer-text">
           Where beauty meets perfection. Experience luxury grooming and personalized care crafted to make you look and feel your absolute best.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/services">Our Services</a></li>
            <li><a href="/why-us">Why Us</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Popular */}
        <div className="footer-col">
          <h3 className="footer-title">Popular Courses</h3>
          <ul className="footer-links">
            <li><a href="/women">Women's Styling</a></li>
            <li><a href="/men">Men's Grooming</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h3 className="footer-title">Reach Us</h3>
          <p className="footer-info"><FaPhoneAlt className="footer-icon" /> 6385637410</p>
          <p className="footer-info"><FaMapMarkerAlt className="footer-icon" /> - </p>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="footer-bottom">
        © 2025 Harish. All Rights Reserved.
      </div>
    </footer>
  );
}
