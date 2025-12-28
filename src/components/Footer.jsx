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
                    <a href="https://wa.me/221704925239" target="_blank" rel="noopener noreferrer">WhatsApp: 70 492 52 39</a>
                    <a href="https://www.instagram.com/ecstasy_23d?igsh=MTdoMzdqMHkwdzhmbA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
            </div>
            <div className="text-center copyright">
                &copy; 2024 VisionR Studio. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
