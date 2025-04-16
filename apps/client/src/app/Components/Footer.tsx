"use client";
import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import "../Styles/footer.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          {/* About Section */}
          <div className="footer-section about-section">
            <h3 className="section-title">About Us</h3>
            <p>
              We are dedicated to providing exceptional services and solutions
              to our clients with a focus on quality, innovation, and customer
              satisfaction.
            </p>
            <div className="social-links">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="social-link facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="social-link instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="social-link twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="social-link linkedin"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="footer-section links-section">
            <h3 className="section-title">Major Services</h3>
            <ul className="footer-links">
              <li>
                <Link href="/regulatory" className="footer-link">
                  <ArrowRight size={16} />
                  <span>Service 1</span>
                </Link>
              </li>
              <li>
                <Link href="/environmental" className="footer-link">
                  <ArrowRight size={16} />
                  <span>Service 1</span>
                </Link>
              </li>
              <li>
                <Link href="/license" className="footer-link">
                  <ArrowRight size={16} />
                  <span>Service 1</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Informative Section */}
          <div className="footer-section info-section">
            <h3 className="section-title">Informative</h3>
            <ul className="footer-links">
              <li>
                <Link href="/about" className="footer-link">
                  <ArrowRight size={16} />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  <ArrowRight size={16} />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="footer-link">
                  <ArrowRight size={16} />
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="footer-link">
                  <ArrowRight size={16} />
                  <span>Projects</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section contact-section">
            <h3 className="section-title">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <span>info@example.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={18} />
                <span>
                  123 Business St, Suite 100
                  <br />
                  San Francisco, CA 94103
                </span>
              </div>
            </div>
          </div>

          {/* Services Section (Horizontally Aligned) */}
          <div className="footer-section services-section">
            <h3 className="section-title">Services</h3>
            <ul className="footer-links horizontal-links">
              {[
                "Service",
                "development",
                "support",
                "maintenance",
                "training",
                "design",
                "cloud",
                "security",
                "analytics",
                "automation",
              ].map((service) => (
                <li key={service}>
                  <Link href={`/services/${service}`} className="footer-link">
                    <ArrowRight size={16} />
                    <span>
                      {service.charAt(0).toUpperCase() + service.slice(1)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          <p>
            &copy; {currentYear} Brothers Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
