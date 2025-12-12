import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container footer-content">
                <div className="footer-brand">
                    <h3>VISIONR AI STUDIO</h3>
                    <p>L'Intelligence Artificielle au service de votre Marque.</p>
                </div>
                <div className="footer-links">
                    <a href="/mentions">Mentions Légales</a>
                    <a href="#contact">Contact</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
            </div>
            <div className="text-center copyright">
                &copy; 2024 VisionR Studio. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
