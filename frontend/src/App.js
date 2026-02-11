import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaTimes } from 'react-icons/fa';
import { MdEvent, MdCardGiftcard, MdCorporateFare, MdCake, MdFormatColorFill, MdLightbulb } from 'react-icons/md';
import './App.css';

// Preloader Component
const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="preloader">
      <div className="preloader-content">
        <div className="preloader-logo">
          <img src={process.env.PUBLIC_URL + '/logo.ico'} alt="M² Logo" />
        </div>
        <div className="preloader-text">M² - Mesmerising Moments</div>
      </div>
    </div>
  );
};

// Logo Component
const Logo = () => (
  <div className="logo-container">
    <div className="logo-square">
      <img src={process.env.PUBLIC_URL + '/logo.ico'} alt="M² Logo" className="logo-image" />
    </div>
    <div className="logo-text-full">
      <span className="brand-name">M²</span>
      <span className="brand-tagline">Mesmerising Moments</span>
    </div>
  </div>
);

// Navigation Component
const Navbar = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-content">
        <a href="#home" className="navbar-logo">
          <Logo />
        </a>

        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </a>
          ))}
          <a href="#contact" className="nav-book-btn">Book Now</a>
        </div>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : '☰'}
        </button>
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?w=1920',
      title: 'Turning Your Dreams Into',
      subtitle: 'Mesmerising Moments',
    },
    {
      image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1920',
      title: 'Creating Unforgettable',
      subtitle: 'Luxury Experiences',
    },
    {
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920',
      title: 'Where Every Detail',
      subtitle: 'Tells Your Story',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section id="home" className="hero-section">
      <div className="hero-slides">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>

      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-badge">✨ Premium Event Management</div>
        <h1 className="hero-title">
          {slides[currentSlide].title}
          <br />
          <span className="gradient-text">{slides[currentSlide].subtitle}</span>
        </h1>

        <p className="hero-description">
          Crafting magical experiences for weddings, corporate events, and special celebrations
        </p>

        <div className="hero-buttons">
          <a href="#contact" className="btn btn-primary">Book Your Event</a>
          <a href="#gallery" className="btn btn-secondary">View Our Work</a>
        </div>
      </div>
    </section>
  );
};

// Contact Section (ONLY FIXED PART SHOWN HERE)
const ContactSection = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="social-links">
        <button type="button" className="social-link" aria-label="WhatsApp">
          <FaWhatsapp />
        </button>
        <button type="button" className="social-link" aria-label="Instagram">
          <FaInstagram />
        </button>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-bottom">
        <p>&copy; 2024 M² - Mesmerising Moments. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// Main App Component
function App() {
  return (
    <div className="App">
      <Preloader />
      <Navbar />
      <HeroSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
