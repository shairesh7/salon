"use client"; 
import "./Contact.css";
import { FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section className="contact-section">

      <h2 className="contact-title">Ready for Your Transformation?</h2>
      <p className="contact-subtitle">
        Book an appointment, ask a question, or simply say hello.  
        We look forward to welcoming you.
      </p>

      <div className="contact-grid">

        {/* LEFT SIDE */}
        <div className="contact-left">

          {/* CALL US */}
          <div className="contact-card">
            <div className="card-header">
              <FaPhoneAlt className="icon" />
              <h3>Call Us</h3>
            </div>
            <p className="contact-info">+91 6385637410</p>
          </div>

          {/* LOCATION */}
          <div className="contact-card">
            <div className="card-header">
              <FaMapMarkerAlt className="icon" />
              <h3>Our Location</h3>
            </div>
            <p>Location not set</p>

            <div className="map-box"></div>
          </div>

          {/* BUSINESS HOURS */}
          <div className="contact-card">
            <div className="card-header">
              <FaClock className="icon" />
              <h3>Business Hours</h3>
            </div>

            <ul className="hours-list">
              {[
                "Sunday","Monday","Tuesday","Wednesday",
                "Thursday","Friday","Saturday",
              ].map((day, index) => (
                <li key={index}>
                  <span>{day}:</span>
                  <span className={day === "Tuesday" ? "open" : "closed"}>
                    {day === "Tuesday" ? "Open" : "Closed"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
        <div className="contact-right">
          <div className="contact-form-card">
            <input type="text" placeholder="Your Name" />
            <input type="text" placeholder="Phone Number" />
            <textarea placeholder="Your Message (Optional)" />

            <button className="send-btn">
              Send Message <span>✈</span>
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}
