import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaInstagram, FaTimes, FaHeart, FaStar, FaCalendarAlt, FaCamera, FaMusic, FaUtensils } from 'react-icons/fa';
import './App.css';  


// Preloader Component
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
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

// About Section
const AboutSection = () => {
  const features = [
    { icon: <FaHeart />, title: 'Personalized Planning', desc: 'Every event is unique, and we tailor our services to your vision' },
    { icon: <FaStar />, title: 'Premium Quality', desc: 'We source only the best vendors and materials for your event' },
    { icon: <FaCalendarAlt />, title: 'Attention to Detail', desc: 'Every tiny detail is carefully considered and executed' },
    { icon: <FaCamera />, title: 'Memorable Experiences', desc: 'Creating moments that you and your guests will cherish forever' }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <div className="section-title">
              <h2>About M²</h2>
              <p>Turning your dreams into mesmerising moments since 2020</p>
            </div>
            <div className="about-text">
              <p>
                M² - Mesmerising Moments is a premier event management company dedicated to creating 
                unforgettable experiences for weddings, corporate events, and special celebrations.
              </p>
              <p>
                Our team of passionate professionals works tirelessly to transform your vision into 
                reality, ensuring every detail reflects your style and personality.
              </p>
            </div>
            <div className="about-features">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <span className="feature-icon">{feature.icon}</span>
                  <div>
                    <h4>{feature.title}</h4>
                    <p>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-image">
            <div className="image-frame">
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800" 
                alt="Elegant Event" 
              />
            </div>
            <div className="experience-badge">
              <span className="exp-number">5+</span>
              <span className="exp-text">Years of Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    { 
      icon: <FaHeart />, 
      title: 'Weddings', 
      desc: 'Full wedding planning from engagement to reception, creating your dream celebration' 
    },
    { 
      icon: <FaCalendarAlt />, 
      title: 'Corporate Events', 
      desc: 'Professional corporate gatherings, conferences, and team building events' 
    },
    { 
      icon: <FaStar />, 
      title: 'Birthday Parties', 
      desc: 'Magical birthday celebrations for all ages with personalized themes' 
    },
    { 
      icon: <FaMusic />, 
      title: 'Engagement Parties', 
      desc: "Romantic engagement ceremonies and parties you'll never forget" 
    },
    { 
      icon: <FaCamera />, 
      title: 'Anniversaries', 
      desc: 'Special anniversary celebrations to commemorate your milestones' 
    },
    { 
      icon: <FaUtensils />, 
      title: 'Private Dinners', 
      desc: 'Elegant private dinners and gatherings with exquisite catering' 
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>Comprehensive event management solutions for every occasion</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <span className="service-icon">{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Gallery Section
const GallerySection = () => {
  const galleryImages = [
    'https://images.unsplash.com/photo-1519225421980-715cb0202128?w=600',
    'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600'
  ];

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="section-title">
          <h2>Our Gallery</h2>
          <p>A glimpse into our mesmerising events</p>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div key={index} className="gallery-item">
              <img src={image} alt={`Gallery ${index + 1}`} />
              <div className="gallery-overlay">
                <span>✨</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Us Section
const WhyUsSection = () => {
  const reasons = [
    { number: '500+', label: 'Events Completed' },
    { number: '200+', label: 'Happy Clients' },
    { number: '50+', label: 'Expert Vendors' },
    { number: '100%', label: 'Satisfaction' }
  ];

  return (
    <section id="why-us" className="why-us-section">
      <div className="container">
        <div className="section-title">
          <h2>Why Choose M²</h2>
          <p>Experience the difference with our premium event management</p>
        </div>
        <div className="stats-grid">
          {reasons.map((reason, index) => (
            <div key={index} className="stat-card">
              <span className="stat-number">{reason.number}</span>
              <span className="stat-label">{reason.label}</span>
            </div>
          ))}
        </div>
        <div className="why-us-features">
          <div className="why-us-card">
            <h3>🎯 Customized Approach</h3>
            <p>We believe every event should be as unique as you are. Our personalized approach ensures your vision comes to life exactly as you imagined.</p>
          </div>
          <div className="why-us-card">
            <h3>💎 Premium Quality</h3>
            <p>From venue selection to décor, we work with only the finest vendors and suppliers to deliver exceptional quality.</p>
          </div>
          <div className="why-us-card">
            <h3>⏰ Stress-Free Experience</h3>
            <p>Let us handle all the details while you enjoy your special day. Our team manages everything from start to finish.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Priya & Rahul',
      event: 'Wedding',
      quote: 'M² made our dream wedding a reality! Every detail was perfect and the team was incredibly professional.',
      rating: 5
    },
    {
      name: 'Amit Sharma',
      event: 'Corporate Event',
      quote: 'Outstanding corporate event planning. The team went above and beyond to make our conference a success.',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      event: 'Birthday Party',
      quote: 'My 30th birthday was absolutely magical! The theme and decorations exceeded all my expectations.',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-title">
          <h2>Testimonials</h2>
          <p>What our clients say about us</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-info">
                <h4>{testimonial.name}</h4>
                <span>{testimonial.event}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', eventType: '', date: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-title">
          <h2>Get In Touch</h2>
          <p>Let's create your perfect event together</p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>Ready to start planning? Reach out to us!</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h4>Location</h4>
                  <p>Your Dream Venue</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <h4>Phone</h4>
                  <p>+91 XXXXXXXXXX</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <div>
                  <h4>Email</h4>
                  <p>hello@mesmerizingmoments.in</p>
                </div>
              </div>
            </div>
            
            <div className="social-links">
              <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaWhatsapp />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaInstagram />
              </a>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <select name="eventType" value={formData.eventType} onChange={handleChange} required>
                <option value="">Select Event Type</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate Event</option>
                <option value="birthday">Birthday Party</option>
                <option value="engagement">Engagement</option>
                <option value="anniversary">Anniversary</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-row">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            
            <textarea
              name="message"
              placeholder="Tell us about your event..."
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
            
            <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
            
            {status === 'success' && <p className="status-message success">Message sent successfully!</p>}
            {status === 'error' && <p className="status-message error">Something went wrong. Please try again.</p>}
          </form>
        </div>
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
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <WhyUsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
