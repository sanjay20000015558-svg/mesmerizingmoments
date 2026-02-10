import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaTimes } from 'react-icons/fa';
import { MdEvent, MdCardGiftcard, MdCorporateFare, MdCake, MdFormatColorFill, MdLightbulb } from 'react-icons/md';
import './App.css';

// API Configuration
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Preloader Component
const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

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

        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
        
        {/* Stats Section */}
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number" data-count="500">0</span>
            <span className="stat-label">Events Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" data-count="400">0</span>
            <span className="stat-label">Happy Clients</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" data-count="5">0</span>
            <span className="stat-label">Years Experience</span>
          </div>
        </div>
        
        {/* Buttons Section */}
        <div className="hero-buttons">
          <a href="#contact" className="btn btn-primary">Book Your Event</a>
          <a href="#gallery" className="btn btn-secondary">View Our Work</a>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => (
  <section id="about" className="about-section">
    <div className="container">
      <div className="about-grid">
        <div className="about-content">
          <div className="section-title">
            <h2>About M²</h2>
            <p>Where Dreams Meet Elegance</p>
          </div>
          <div className="about-text">
            <p>
              Welcome to <strong>M² – Mesmerising Moments</strong>, where we transform ordinary 
              occasions into extraordinary memories. Founded with a passion for creativity 
              and excellence, we have established ourselves as a premier event management 
              company dedicated to crafting unique experiences.
            </p>
            <p>
              Our team of expert designers and event planners combines artistic vision 
              with meticulous attention to detail, ensuring every event reflects your 
              personality and exceeds your expectations. From intimate gatherings to 
              grand celebrations, we bring the same level of dedication and innovation 
              to every project we undertake.
            </p>
            <div className="about-features">
              <div className="feature-item">
                <span className="feature-icon">🎨</span>
                <span>Creative Excellence</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💎</span>
                <span>Premium Quality</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⏰</span>
                <span>On-Time Delivery</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💝</span>
                <span>Personalized Touch</span>
              </div>
            </div>
          </div>
        </div>
        <div className="about-image">
          <div className="image-frame">
            <img 
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600" 
              alt="M² Event Planning"
            />
          </div>
          <div className="experience-badge">
            <span className="exp-number">5+</span>
            <span className="exp-text">Years of Excellence</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Services Section
const ServicesSection = () => {
  const services = [
    {
      icon: <MdEvent />,
      title: 'Wedding Planning & Decoration',
      description: 'Create your dream wedding with our exquisite decorations and meticulous planning.',
      color: '#6B46C1',
    },
    {
      icon: <MdCorporateFare />,
      title: 'Corporate Events',
      description: 'Professional and elegant corporate events that impress clients and employees.',
      color: '#20B2AA',
    },
    {
      icon: <MdCake />,
      title: 'Birthday & Private Parties',
      description: 'Fun, vibrant, and memorable celebrations tailored to your style.',
      color: '#FF6B6B',
    },
    {
      icon: <MdFormatColorFill />,
      title: 'Stage & Theme Decor',
      description: 'Stunning stage designs and themed decorations that transform venues.',
      color: '#FFD700',
    },
    {
      icon: <MdCardGiftcard />,
      title: 'Floral & Lighting Design',
      description: 'Beautiful floral arrangements and dramatic lighting for magical ambiance.',
      color: '#FF69B4',
    },
    {
      icon: <MdLightbulb />,
      title: 'Customized Event Concepts',
      description: 'Unique and innovative event concepts designed just for you.',
      color: '#9F7AEA',
    },
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>Comprehensive event solutions tailored to your vision</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card" style={{ '--accent-color': service.color }}>
              <div className="service-icon" style={{ background: service.color }}>
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#contact" className="service-link">Enquire Now →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Gallery Section with Event Photos
const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'wedding', label: 'Weddings' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'birthday', label: 'Birthdays' },
    { id: 'stage', label: 'Stage Decor' },
    { id: 'floral', label: 'Floral' },
  ];

  const galleryImages = [
    // Weddings
    { id: 1, category: 'wedding', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600', title: 'Royal Wedding' },
    { id: 2, category: 'wedding', url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600', title: 'Garden Wedding' },
    { id: 3, category: 'wedding', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600', title: 'Beach Wedding' },
    { id: 4, category: 'wedding', url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600', title: 'Traditional Wedding' },
    // Corporate Events
    { id: 5, category: 'corporate', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600', title: 'Corporate Gala' },
    { id: 6, category: 'corporate', url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600', title: 'Tech Conference' },
    { id: 7, category: 'corporate', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600', title: 'Product Launch' },
    // Birthdays
    { id: 8, category: 'birthday', url: 'https://images.unsplash.com/photo-1530103862676-de3c9ef59af2?w=600', title: 'Sweet 16 Party' },
    { id: 9, category: 'birthday', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', title: 'Anniversary Celebration' },
    { id: 10, category: 'birthday', url: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600', title: 'Birthday Bash' },
    // Stage Decor
    { id: 11, category: 'stage', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600', title: 'Concert Stage' },
    { id: 12, category: 'stage', url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600', title: 'Award Ceremony' },
    // Floral
    { id: 13, category: 'floral', url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600', title: 'Floral Arch' },
    { id: 14, category: 'floral', url: 'https://images.unsplash.com/photo-1561842533-377c7991743d?w=600', title: 'Flower Backdrop' },
    { id: 15, category: 'floral', url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600', title: 'Table Centerpiece' },
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="section-title">
          <h2>Our Gallery</h2>
          <p>A glimpse of our mesmerising creations</p>
        </div>
        
        <div className="gallery-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="gallery-item"
              onClick={() => setSelectedImage(image)}
            >
              <img src={image.url} alt={image.title} />
              <div className="gallery-overlay">
                <span>{image.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
            <FaTimes />
          </button>
          <img src={selectedImage.url} alt={selectedImage.title} />
          <p>{selectedImage.title}</p>
        </div>
      )}
    </section>
  );
};

// Why Choose Us Section
const WhyChooseUsSection = () => {
  const features = [
    {
      icon: '💡',
      title: 'Unique Concepts',
      description: 'Innovative and creative event concepts that stand out from the ordinary.',
    },
    {
      icon: '💎',
      title: 'Premium Materials',
      description: 'Only the finest quality decor materials for luxurious results.',
    },
    {
      icon: '⏰',
      title: 'On-Time Execution',
      description: 'Punctual delivery with meticulous timeline management.',
    },
    {
      icon: '🎯',
      title: 'Personalized Designs',
      description: 'Every event uniquely tailored to your vision and style.',
    },
    {
      icon: '👥',
      title: 'Professional Team',
      description: 'Experienced planners and decorators at your service.',
    },
    {
      icon: '🤝',
      title: 'Client Satisfaction',
      description: 'Our priority is making your dream event a reality.',
    },
  ];

  return (
    <section id="why-us" className="why-us-section">
      <div className="container">
        <div className="section-title">
          <h2>Why Choose M²</h2>
          <p>What makes us the preferred choice for unforgettable events</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <span className="feature-icon-large">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
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
      rating: 5,
      message: 'M² transformed our wedding into a fairy tale! Every detail was perfect. The team was professional and made our dream wedding come true.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    },
    {
      name: 'Rajesh Kumar',
      event: 'Corporate Event',
      rating: 5,
      message: 'Outstanding corporate event planning! The stage design and lighting were incredible. Our clients were thoroughly impressed.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    },
    {
      name: 'Ananya Sharma',
      event: 'Birthday Party',
      rating: 5,
      message: 'My daughters birthday was absolutely magical! The decorations exceeded all expectations. Highly recommend M²!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    },
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-title">
          <h2>What Our Clients Say</h2>
          <p>Real reviews from real clients</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <img src={testimonial.image} alt={testimonial.name} />
                <div>
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.event}</span>
                </div>
              </div>
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              <p className="testimonial-message">"{testimonial.message}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section with Event Date
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', eventType: '', eventDate: '', message: '' });
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-logo">
              <Logo />
            </div>
            <div className="section-title">
              <h2>Get In Touch</h2>
              <p>Let's create your mesmerising moment together</p>
            </div>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon location">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4>Location</h4>
                  <p>26, Ranga Nagar 1st Street, Saraswathypuram, Chromepet, Chennai-600044</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon phone">
                  <FaPhone />
                </div>
                <div>
                  <h4>Phone</h4>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon email">
                  <FaEnvelope />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>hello@mesmerisingmoments.com</p>
                </div>
              </div>
              
              <div className="social-links">
                <a href="#" className="social-link"><FaWhatsapp /></a>
                <a href="#" className="social-link"><FaInstagram /></a>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            {submitted ? (
              <div className="success-message">
                <h3>Thank You! 🎉</h3>
                <p>Your enquiry has been received. We'll get back to you soon!</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Event Type</label>
                    <select 
                      name="eventType" 
                      value={formData.eventType} 
                      onChange={handleChange} 
                      required
                    >
                      <option value="">Select Event Type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Event Date</label>
                    <input 
                      type="date" 
                      name="eventDate" 
                      value={formData.eventDate} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Your Message</label>
                  <textarea 
                    name="message" 
                    rows="5" 
                    value={formData.message} 
                    onChange={handleChange}
                    placeholder="Tell us about your dream event..."
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-brand">
          <Logo />
          <p>Crafting magical experiences for your special moments</p>
        </div>
        
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </div>
        
        <div className="footer-services">
          <h4>Our Services</h4>
          <a href="#services">Wedding Planning</a>
          <a href="#services">Corporate Events</a>
          <a href="#services">Birthday Parties</a>
          <a href="#services">Stage Decor</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 M² - Mesmerising Moments. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// Main App Component
function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Counter animation effect
  useEffect(() => {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
      const target = +counter.getAttribute('data-count');
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + '+';
        }
      };
      
      updateCounter();
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });
    
    counters.forEach(counter => observer.observe(counter));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      <Preloader />
      <Navbar isScrolled={isScrolled} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
