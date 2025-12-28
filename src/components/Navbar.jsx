import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar } from 'lucide-react';
import { CalendlyModal } from './index';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
    const location = useLocation();

    // Helper for smooth scroll or navigation
    const getLink = (hash) => {
        return location.pathname === '/' ? hash : `/${hash}`;
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />

            <nav className="navbar">
                <div className="navbar-container container">
                    <Link to="/" className="navbar-logo" onClick={closeMenu}>
                        VISIONR <span className="logo-highlight">STUDIO</span>
                    </Link>

                    <div className="menu-icon" onClick={toggleMenu}>
                        {isOpen ? <X color="#0F172A" size={28} /> : <Menu color="#0F172A" size={28} />}
                    </div>

                    <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={closeMenu}>Accueil</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/formation" className="nav-link" onClick={closeMenu}>Formation</Link>
                        </li>
                        <li className="nav-item">
                            <a href="/#pricing" className="nav-link" onClick={closeMenu}>Tarifs</a>
                        </li>
                        <li className="nav-item">
                            <a href="/#projects" className="nav-link" onClick={closeMenu}>Réalisations</a>
                        </li>
                        <li className="nav-item">
                            <Link to="/blog" className="nav-link" onClick={closeMenu}>Blog</Link>
                        </li>

                        <li className="nav-item" style={{ width: isOpen ? '100%' : 'auto' }}>
                            <button className="btn-booking"
                                onClick={() => {
                                    setIsCalendlyOpen(true);
                                    closeMenu();
                                }}
                            >
                                <Calendar size={18} /> Prendre RDV
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
