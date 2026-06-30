import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import '../Assets/css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
<div className="logo-container">
          <div className="logo-ribbon">
            <span className="logo-text">Mohit's Decor</span>
          </div>
          <p className="footer-tagline">Make your party more colorful</p>
        </div>
          <a
            href="https://wa.me/+918208239407"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-whatsapp-btn"
          >
            Get in Touch 
          </a>
        </div>

        <div className="footer-links">
          <h4 className="footer-heading">Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/category">All Decorations</Link></li>
            <li><Link to="/categoryid/1">Birthday Decor</Link></li>
            <li><Link to="/categoryid/9">Baby Welcome</Link></li>
            <li><Link to="/categoryid/4">Anniversary Decor</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4 className="footer-heading">Categories</h4>
          <ul>
            <li><Link to="/categoryid/2">Canopy Decorations</Link></li>
            <li><Link to="/categoryid/3">Room Decorations</Link></li>
            <li><Link to="/categoryid/5">Temple Decorations</Link></li>
            <li><Link to="/categoryid/6">Kids Decorations</Link></li>
            <li><Link to="/categoryid/7">Farewell Decorations</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4 className="footer-heading">Contact Us</h4>
          <p><a href="tel:8208239407">📞 +91 82082 39407</a></p>
          <p>📍Mahalaxmi Angan, Behind Panchvati Theater, Ichalkaranji, Maharashtra</p>
          <p className="footer-hours">Mon – Sun: 9 AM – 9 PM</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
         Made with <Heart size={13} className="footer-heart" />by <a style={{ "color":"inherit"}} href="https://mohit-rathi.vercel.app" target="_blank" rel="noopener noreferrer"> MR Tech</a>  &nbsp;|&nbsp; © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
