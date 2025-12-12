"use client";
import  { useState, useEffect } from "react";
import "./Hero.css";



const HeroSection = () => {
  const images = [
  "/Assets/basic.jpg",
  "/Assets/bridal.jpg",
  "/Assets/fringe.jpg",
  "/Assets/hairspa.jpg",
  "/Assets/manicure.jpg"
];


  const [index, setIndex] = useState(0);
  const [slide, setSlide] = useState(false);

  // Slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(true);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setSlide(false);
      }, 800); // slide animation duration
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="hero">
      
      <div className="hero-left">
        <h1>
          Look Good, <br /> <span>Feel Incredible.</span>
        </h1>

        <p className="hero-text">
          Elevate your personal style with our expert touch. We combine
          15+ years of mastery with natural products to ensure you step out
          feeling refreshed and confident.
        </p>

        <div className="stats">
          <div className="stat-item">
            <h2>15+</h2>
            <p>Years Experience</p>
          </div>

          <div className="stat-item">
            <h2>1k+</h2>
            <p>Happy Customers</p>
          </div>

          <div className="stat-item">
            <h2>Top-Rated</h2>
            <p>Quality Service</p>
          </div>
        </div>

        <div className="hero-buttons">
          <button className="btn-primary">Explore Full Menu</button>
          <button className="btn-outline">Get a Free Consultation</button>
        </div>
      </div>

      {/* RIGHT SLIDER */}
      <div className="hero-right">
        <img
          src={images[index]}
          alt="Slide"
          className={`hero-img ${slide ? "slide-transition" : ""}`}
        />
      </div>

    </div>
  );
};

export default HeroSection;
