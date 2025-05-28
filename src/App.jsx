import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaShoppingCart,
  FaMobileAlt,
  FaChartLine,
  FaUsers,
  FaWarehouse,
  FaUserTie,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [currentInstallation, setCurrentInstallation] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active tab based on scroll position
      const sections = [
        "home",
        "products",
        "services",
        "about",
        "contact",
        "installations",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveTab(sectionId);
    }
  };

  const handleViewProductsClick = () => {
    scrollToSection("products");
  };

  const handleRequestDemoClick = () => {
    setShowDemoModal(true);
  };

  const closeModal = () => {
    setShowDemoModal(false);
    setExpandedProduct(null);
  };

  const toggleProductDetails = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  const nextInstallation = () => {
    setCurrentInstallation((prev) =>
      prev === installationsData.length - 1 ? 0 : prev + 1
    );
  };

  const prevInstallation = () => {
    setCurrentInstallation((prev) =>
      prev === 0 ? installationsData.length - 1 : prev - 1
    );
  };

  return (
    <Router>
      <div className="app">
        {/* Animated Background Elements */}
        <div className="bg-elements">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-circle"
              initial={{ y: Math.random() * 100, x: Math.random() * 100 }}
              animate={{
                y: [0, Math.random() * 50 - 25, 0],
                x: [0, Math.random() * 50 - 25, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
          <motion.div
            className="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              src="/assets/nexusIcon.png"
              className="logo-image"
              alt="logo-picture"
            />
          </motion.div>
          <div className="nav-links">
            {[
              "home",
              "products",
              "installations",
              "services",
              "about",
              "contact",
            ].map((item) => (
              <Link
                key={item}
                to={`#${item}`}
                className={`nav-link ${activeTab === item ? "active" : ""}`}
                onClick={() => scrollToSection(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </div>
          {/* Mobile menu button */}
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <span>☰</span>}
          </button>

          {/* Mobile menu links - shown only when isMenuOpen is true */}
          <div className={`mobile-nav-links ${isMenuOpen ? "open" : ""}`}>
            {[
              "home",
              "products",
              "installations",
              "services",
              "about",
              "contact",
            ].map((item) => (
              <Link
                key={item}
                to={`#${item}`}
                className={`nav-link ${activeTab === item ? "active" : ""}`}
                onClick={() => {
                  scrollToSection(item);
                  setIsMenuOpen(false);
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
            <a
              href="https://wa.me/+263783556354"
              className="whatsapp-button mobile-whatsapp"
            >
              <FaWhatsapp /> Contact Us
            </a>
          </div>
          <motion.a
            href="https://wa.me/+263783556354"
            className="whatsapp-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp /> Contact Us
          </motion.a>
        </nav>

        {/* Demo Request Modal */}
        {showDemoModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button className="close-modal" onClick={closeModal}>
                <FaTimes />
              </button>
              <h2>Request a Demo</h2>
              <p>
                Contact us on WhatsApp to schedule a demo of our POS systems
              </p>
              <motion.a
                href="https://wa.me/+263783556354"
                className="whatsapp-contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp /> Chat on WhatsApp: +263783556354
              </motion.a>
            </motion.div>
          </motion.div>
        )}

        {/* Product Details Modal */}
        {expandedProduct !== null && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="product-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal" onClick={closeModal}>
                <FaTimes />
              </button>
              <div className="modal-product-details">
                <h3>
                  {productsData.find((p) => p.id === expandedProduct)?.name}
                </h3>
                <ul>
                  {productsData
                    .find((p) => p.id === expandedProduct)
                    ?.specs?.map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Hero Section */}
        <section id="home" className="hero">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>Revolutionize Your Business with NEXUS Smart POS Solutions</h1>
            <p>
              Cloud-based POS systems with real-time inventory tracking and
              remote management
            </p>
            <div className="hero-buttons">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="primary-button"
                onClick={handleViewProductsClick}
              >
                View Products
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="secondary-button"
                onClick={handleRequestDemoClick}
              >
                Request Demo
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <img src="/assets/imagesys.jpg" alt="POS Device" />
          </motion.div>
        </section>

        {/* Products Section */}
        <section id="products" className="products-section">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Products
          </motion.h2>
          <div className="products-grid">
            {productsData.map((product, index) => (
              <motion.div
                key={product.id}
                className="product-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <p className="price">${Number(product.price).toFixed(2)}</p>
                <p className="description">{product.description}</p>
                <button
                  className="product-button"
                  onClick={() => toggleProductDetails(product.id)}
                >
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Installations Section */}
        <section id="installations" className="installations-section">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Installations
          </motion.h2>

          <motion.div
            className="installation-slider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button className="slider-arrow left" onClick={prevInstallation}>
              <FaChevronLeft />
            </button>

            <motion.div
              className="installation-card"
              key={currentInstallation}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="installation-image">
                <img
                  src={installationsData[currentInstallation].image}
                  alt={`Installation at ${installationsData[currentInstallation].location}`}
                />
              </div>
              <div className="installation-info">
                <h3>{installationsData[currentInstallation].location}</h3>
                <p>{installationsData[currentInstallation].description}</p>
              </div>
            </motion.div>

            <button className="slider-arrow right" onClick={nextInstallation}>
              <FaChevronRight />
            </button>
          </motion.div>

          <div className="installation-dots">
            {installationsData.map((_, index) => (
              <button
                key={index}
                className={`dot ${
                  index === currentInstallation ? "active" : ""
                }`}
                onClick={() => setCurrentInstallation(index)}
              />
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="services-section">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.h2>
          <div className="services-grid">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                className="service-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Company */}
        <section id="about" className="about-section">
          <div className="about-content">
            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2>About Our Company</h2>
              <p>
                Nexus POS is a leading provider of innovative point-of-sale
                solutions designed to help businesses streamline operations,
                improve efficiency, and enhance customer experiences. With our
                cloud-based technology, business owners can manage their
                operations from anywhere in the world.
              </p>
              <p>
                Our mission is to empower small scale businesses (SMEs) with
                affordable, user-friendly POS systems that provide real-time
                insights and control over sales and inventory.
              </p>
            </motion.div>
            <motion.div
              className="about-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img src="/assets/nexuscoverpos.png" alt="Our Team" />
            </motion.div>
          </div>

          {/* About Owner */}
          <div className="owner-section">
            <motion.div
              className="owner-image"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img src="/assets/jermaine.jpg" alt="Company Owner" />
            </motion.div>
            <motion.div
              className="owner-info"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2>About The Owner</h2>
              <h3>Germany Mangezi</h3>
              <p>
                With vast experience in retail technology and software
                innovation, Germany founded Nexus POS to address the challenges
                he saw small and medium businesses facing with traditional POS
                systems. His vision was to create an affordable, cloud-based
                solution that gives business owners real control and visibility
                over their operations.
              </p>
            </motion.div>
          </div>

          {/* Directors */}
          <div className="directors-section">
            <h2>Our Directors</h2>
            <div className="directors-grid">
              {directorsData.map((director, index) => (
                <motion.div
                  key={director.id}
                  className="director-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <img src={director.image} alt={director.name} />
                  <h3>{director.name}</h3>
                  <p>{director.position}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.h2>
          <div className="contact-container">
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3>Get in Touch</h3>
              <div className="contact-item">
                <strong>Email:</strong> gkmangezi09@gmail.com
              </div>
              <div className="contact-item">
                <strong>Phone:</strong> +263 783 556 354
              </div>
              <div className="contact-item">
                <strong>Address:</strong> 02 Dawlish Ave,Paddonhurst, Bulawayo,
                Zimbabwe
              </div>
              <motion.a
                href="https://wa.me/+263783556354"
                className="whatsapp-contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp /> Chat on WhatsApp
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Nexus POS</h3>
              <p>Innovative POS solutions for modern businesses.</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link to="#home" onClick={() => scrollToSection("home")}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="#products"
                    onClick={() => scrollToSection("products")}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="#services"
                    onClick={() => scrollToSection("services")}
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="#about" onClick={() => scrollToSection("about")}>
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="#contact"
                    onClick={() => scrollToSection("contact")}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="#installations"
                    onClick={() => scrollToSection("installations")}
                  >
                    Installations
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <p>gkmangezi09@gmail.com</p>
              <p>+263 783 556 354</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} Nexus POS. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

// Sample data
const productsData = [
  {
    id: 1,
    name: "All-in-One POS Terminal",
    price: 100,
    description:
      "Complete Android POS system with built-in receipt printer and cash drawer",
    image: "/assets/pos-terminal.png",
    specs: [
      "6-inch touchscreen display",
      "3G Network",
      "2GB RAM, 16GB storage",
      "Built-in receipt printer",
      "Cash drawer support",
      "Android 10 OS",
      "Dual cameras",
    ],
  },
  {
    id: 2,
    name: "All-in-One POS Terminal, V2",
    price: 135,
    description:
      "Complete Android POS system with built-in receipt printer and cash drawer",
    image: "/assets/v2.jpg",
    specs: [
      "6-inch HD touchscreen",
      "4G Network",
      "3GB RAM, 16GB storage",
      "Built-in receipt printer",
      "Cash drawer support",
      "Android 11 OS",
    ],
  },
  {
    id: 3,
    name: "Mobile POS Tablet",
    price: 229,
    description:
      "10-inch tablet with POS software and payment processing capabilities",
    image: "/assets/nexus1.jpg",
    specs: [
      "------COMES WITH------",
      "10.1-inch Full HD display Tablet with:",
      "4G Network",
      "4GB RAM, 64GB storage",
      "Bluetooth printer support",
      "Barcode scanner compatible",
      "Android 11 OS",
      "8MP rear camera",
      "--------------------",
      "Bluetooth Printer",
      "Tablet Holder",
    ],
  },
  {
    id: 4,
    name: "POS Software License",
    price: 59,
    description: "Annual subscription for our cloud-based POS software",
    image: "/assets/pos-software.png",
    specs: [
      "Cloud-based management",
      "Real-time sales tracking",
      "Inventory management",
      "Employee access control",
      "Sale both offline and Online ",
      "Backoffice access for reports access",
    ],
  },
];

const installationsData = [
  {
    id: 1,
    location: "Bulawayo City Center",
    description:
      "Installed at a busy retail store in the heart of Bulawayo with 2 Tablet POS terminals",
    image: "/assets/installation1.jpg",
  },
  {
    id: 2,
    location: "Bindura CBD",
    description: "Grocery Shop installation with a single Tablet POS terminal",
    image: "/assets/installation2.jpg",
  },
  {
    id: 3,
    location: "Harare, Westlea",
    description: "Installed for 4  GlamZone Hair and Cosmentics shops",
    image: "/assets/installation3.jpg",
  },
  {
    id: 4,
    location: "Beitbridge Supermarket",
    description:
      "A small supermarket installation with inventory management integration",
    image: "/assets/installation4.jpg",
  },
  {
    id: 5,
    location: "Bulawayo CBD",
    description: "A small shop installation with inventory management system",
    image: "/assets/installation5.jpg",
  },
  {
    id: 6,
    location: "Bulawayo CBD",
    description:
      "A small motor spares shop installation with inventory management system",
    image: "/assets/installation6.jpg",
  },
];

const servicesData = [
  {
    id: 1,
    title: "Remote Sales Monitoring",
    description:
      "View your sales data in real-time from anywhere with our cloud dashboard",
    icon: <FaChartLine />,
  },
  {
    id: 2,
    title: "Inventory Management",
    description: "Track stock levels, get low stock alerts on your phone",
    icon: <FaWarehouse />,
  },
  {
    id: 3,
    title: "User Access Control",
    description: "Set different permission levels for your staff members",
    icon: <FaUsers />,
  },
  {
    id: 4,
    title: "Mobile POS Setup",
    description: "Convert your existing tablets into powerful POS systems",
    icon: <FaMobileAlt />,
  },
];

const directorsData = [
  {
    id: 1,
    name: "Germany Mangezi",
    position: "Technical Director",
    image: "/assets/jermaine.jpg",
  },
  {
    id: 2,
    name: "Nyasha Chikumbu",
    position: "Operations Director",
    image: "/assets/hun.jpg",
  },
  {
    id: 3,
    name: "Sheila Nyandoro",
    position: "Sales Director",
    image: "/assets/user.png",
  },
];

export default App;
