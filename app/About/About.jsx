"use client"; 
import { useEffect } from "react";
import "./About.css";
import { FaLeaf, FaUserTie, FaShieldAlt, FaClock, FaGift, FaGem } from "react-icons/fa";

const ADVANTAGES = [
  {
    icon: <FaLeaf />,
    title: "100% Natural Premium Products",
    desc: "We choose only pure, organic, and chemical-free formulations to protect your skin and hair.",
  },
  {
    icon: <FaUserTie />,
    title: "Certified Master Stylists",
    desc: "Experience the touch of professionals with years of expertise and advanced training.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Trusted by Thousands",
    desc: "Long-term trust built through transparent pricing, hygiene standards, and personalized care.",
  },
  {
    icon: <FaClock />,
    title: "Efficient & Relaxing Service",
    desc: "Quick scheduling, minimal wait times, and a deeply calm experience every visit.",
  },
  {
    icon: <FaGift />,
    title: "Exclusive Member Rewards",
    desc: "Special discounts, loyalty points, and exclusive monthly offers for regular clients.",
  },
  {
    icon: <FaGem />,
    title: "Luxury Pampering Experience",
    desc: "High-end ambience, soothing music, and curated premium services for total relaxation.",
  },
];

export default function AdvantageSection() {

  // Scroll Reveal Animation
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".adv-card, .adv-title, .adv-subtitle"
    );

    const revealOnScroll = () => {
      elements.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight - 80;

        if (top < windowHeight) {
          el.classList.add("reveal");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return (
    <section className="adv-section">
      <h2 className="adv-title">Why Choose Local Wala Salon?</h2>
      <p className="adv-subtitle">
        A premium salon experience crafted with love, luxury, and unmatched professionalism.
      </p>

      <div className="adv-grid">
        {ADVANTAGES.map((item, i) => (
          <div className="adv-card" key={i}>
            <div className="adv-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
