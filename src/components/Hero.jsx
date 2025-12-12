import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Mascot } from './index';
import '../styles/Hero.css';

const Hero = () => {
    const [prompt, setPrompt] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (prompt.trim()) {
            navigate('/ecstasy', { state: { subject: prompt } });
        }
    };

    return (
        <section id="hero" className="hero-section">
            <div className="hero-bg-animation"></div>
            <div className="container hero-content">
                <h1 className="hero-title">
                    Transformez vos Produits en <br />
                    <span className="text-gradient">Expérience Visuelle Virale.</span>
                </h1>

                {/* Ecstasy AI Search Integration */}
                <div className="hero-search-container">
                    <Mascot />
                    <form onSubmit={handleSearch} className="ecstasy-search-form">
                        <div className="input-wrapper">
                            <Sparkles className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Décrivez votre idée... (ex: Chaussure en feu)"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                            <button type="submit" className="btn-search">
                                <ArrowRight size={24} />
                            </button>
                        </div>
                    </form>
                </div>

                <p className="hero-subtitle">
                    Nous créons des publicités "Qualité Télévision" pour les réseaux sociaux, grâce à la puissance de l'IA Générative.
                    Sans tournage, sans limite créative.
                </p>
                <div className="hero-cta-group">
                    <a href="#projects" className="btn-primary">Voir nos Réalisations</a>
                    <a href="#pricing" className="btn-secondary">Découvrir l'Offre</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
