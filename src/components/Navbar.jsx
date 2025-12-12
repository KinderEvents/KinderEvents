import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './index';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    // Function to handle scroll anchors on home page vs navigation on other pages
    const getLink = (anchor) => {
        if (location.pathname === '/') {
            return anchor;
        }
        return `/${anchor}`;
    };

    return (
        <nav className="navbar glass-panel">
            <Link to="/" className="logo" onClick={() => window.scrollTo(0, 0)}>
                VISIONR <span className="text-gradient">AI STUDIO</span>
            </Link>

            <div className="mobile-toggle" onClick={toggleMenu}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </div>

            <div className={`nav-actions ${isOpen ? 'active' : ''}`}>
                <ul className="nav-links">
                    <li><Link to="/" onClick={() => window.scrollTo(0, 0)}>Accueil</Link></li>
                    <li><Link to="/blog">Blog & Actu</Link></li>
                    <li><Link to="/ecstasy" style={{ color: 'var(--color-neon-purple)', fontWeight: '700' }}>✦ Ecstasy AI</Link></li>
                    <li><a href={getLink('#projects')}>Réalisations</a></li>
                    <li><a href={getLink('#pricing')}>Tarifs</a></li>
                    <li><a href={getLink('#process')}>Processus</a></li>
                </ul>
                <a href="/booking" className="btn-glow">Réserver un Call</a>
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
