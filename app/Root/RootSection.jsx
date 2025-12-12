"use client";

import { FaLeaf, FaBullseye, FaEye } from "react-icons/fa";
import "./RootSection.css";

export default function RootsSection() {
  return (
    <section className="roots-new">

      <div className="roots-inner">

        {/* LEFT SIDE CONTENT */}
        <div className="roots-text">

          <h3 className="roots-tag">OUR STORY</h3>

          <h1 className="roots-title">
            Redefining Beauty With  
            <span> Natural Elegance.</span>
          </h1>

          <p className="roots-para">
            For over 15 years, Local Wala Unisex Salon has embraced the essence 
            of nature-driven beauty. Every service is crafted with precision,
            purity, and a commitment to elevating your confidence with luxurious care.
          </p>

          {/* ICON STRIP */}
          <div className="roots-icons">
            <div><FaLeaf /></div>
            <div><FaBullseye /></div>
            <div><FaEye /></div>
          </div>

          <div className="roots-mv">
            <div className="mv-item">
              <h4>Our Mission</h4>
              <p>Deliver premium, sustainable & personalized salon experiences.</p>
            </div>

            <div className="mv-item">
              <h4>Our Vision</h4>
              <p>Become the most trusted & trendsetting unisex salon brand.</p>
            </div>
          </div>

        </div>

        {/* RIGHT GLOWING CARD */}
        <div className="roots-feature">
          <div className="feature-card">
            <h2>Premium • Pure • Professional</h2>
            <p>
              Experience world-class styling, luxury treatments,
              and unrivaled perfection crafted by certified experts.
            </p>
            <button>Explore Services</button>
          </div>
        </div>

      </div>

    </section>
  );
}
