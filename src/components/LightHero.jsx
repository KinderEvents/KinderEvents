import React, { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import '../styles/LightHero.css';

const LightHero = () => {
    // We need a way to trigger the SidePilot. 
    // Dispatch custom event which SidePilot listens to.
    const openAssistant = () => {
        window.dispatchEvent(new Event('openSidePilot'));
    };

    const scrollToCases = () => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="light-hero-container">

            {/* Background Fluid Animation */}
            <div className="fluid-bg">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>

            <div className="hero-content-left">
                <div className="pill-badge">
                    <span className="dot"></span>
                    Agence Digitale Premium
                </div>

                <h1 className="hero-title">
                    Transformez votre vision<br />
                    en <span className="gradient-text">empire digital.</span>
                </h1>

                <p className="hero-subtitle">
                    Stratégie, Développement et Growth Hacking pour les leaders de demain.
                    Nous construisons les outils qui propulsent votre chiffre d'affaires.
                </p>

                <div className="cta-group">
                    <button className="primary-btn pulse-effect" onClick={openAssistant}>
                        Démarrer le diagnostic
                        <ArrowRight size={20} />
                    </button>

                    <button className="secondary-btn" onClick={scrollToCases}>
                        <Play size={20} fill="currentColor" />
                        Voir le Showreel
                    </button>
                </div>

                {/* Minimal Stats */}
                <div className="hero-stats">
                    <div className="stat-item">
                        <span className="stat-number">50+</span>
                        <span className="stat-label">Projets</span>
                    </div>
                    <div className="separator"></div>
                    <div className="stat-item">
                        <span className="stat-number">4M+</span>
                        <span className="stat-label">Générés</span>
                    </div>
                </div>
            </div>

            <div className="hero-visual-right">
                {/* 3D / Abstract Visual Placeholder */}
                <div className="hero-visual-card">
                    {/* Animated Elements inside the card */}
                    <div className="animated-shapes-container">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-main">V</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LightHero;
