import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, TrendingUp } from 'lucide-react';
import '../styles/formationBanner.css';

const FormationBanner = () => {
    return (
        <section className="formation-banner-section">
            <div className="formation-banner-container">
                <div className="banner-glow"></div>

                <div className="banner-content">
                    <div className="banner-badge">
                        <Sparkles size={16} />
                        <span>Nouvelle Formation 2025</span>
                    </div>

                    <h2 className="banner-title">
                        BOOST E-COMMERCE IA
                    </h2>

                    <p className="banner-subtitle">
                        Vendeurs en ligne : Créez vos <strong>Logos</strong>, vos <strong>Mannequins Virtuels</strong> et vos <strong>Pubs Facebook</strong> avec l'IA
                    </p>

                    <div className="banner-features">
                        <div className="banner-feature">
                            <Zap className="feature-icon" size={20} />
                            <span>Formation 100% en ligne</span>
                        </div>
                        <div className="banner-feature">
                            <TrendingUp className="feature-icon" size={20} />
                            <span>Accès immédiat 24h</span>
                        </div>
                        <div className="banner-feature">
                            <Sparkles className="feature-icon" size={20} />
                            <span>À partir de 5 000 FCFA</span>
                        </div>
                    </div>

                    <Link to="/formation" className="banner-cta">
                        <span>DÉCOUVRIR LA FORMATION</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="banner-image">
                    <img
                        src="/formation-preview.png"
                        alt="Formation BOOST E-COMMERCE IA"
                        className="preview-image"
                    />
                </div>
            </div>
        </section>
    );
};

export default FormationBanner;
