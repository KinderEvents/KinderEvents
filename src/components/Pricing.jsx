import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Zap, Check, Music, Droplet, Users, Sliders } from 'lucide-react';
import '../styles/Pricing.css';

const Pricing = () => {
    return (
        <section id="pricing" className="section-padding container">
            <h2 className="section-title text-center">Grille Tarifaire</h2>

            <div className="pricing-grid">
                {/* Pack 1 */}
                <div className="pricing-card glass-panel">
                    <div className="card-header">
                        <h3>Pack "Visibilité Start"</h3>
                        <p className="price">80 000 FCFA</p>
                    </div>
                    <ul className="features-list">
                        <li><Clock size={18} /> 20 Secondes</li>
                        <li><Check size={18} /> Montage simple (3 scènes)</li>
                        <li><Zap size={18} /> Animation IA basique</li>
                        <li><Music size={18} /> Musique libre de droits</li>
                        <li><Clock size={18} /> Délai: 3-4 Jours</li>
                    </ul>
                    <Link to="/booking" className="btn-secondary w-full text-center" style={{ display: 'block', marginTop: 'auto' }}>Choisir ce Pack</Link>
                </div>

                {/* Pack 2 */}
                <div className="pricing-card glass-panel">
                    <div className="card-header">
                        <h3>Pack "Social Media"</h3>
                        <p className="price">120 000 FCFA</p>
                    </div>
                    <ul className="features-list">
                        <li><Clock size={18} /> 20-25 Secondes</li>
                        <li><Check size={18} /> Scénario & Textes animés</li>
                        <li><Zap size={18} /> Transitions dynamiques</li>
                        <li><Check size={18} /> Qualité HD 1080p</li>
                        <li><Clock size={18} /> Délai: 5 Jours</li>
                    </ul>
                    <Link to="/booking" className="btn-secondary w-full text-center" style={{ display: 'block', marginTop: 'auto' }}>Choisir ce Pack</Link>
                </div>

                {/* Pack 3 - Best Seller */}
                <div className="pricing-card glass-panel best-seller">
                    <div className="badge">⭐ Best-Seller</div>
                    <div className="card-header">
                        <h3>Pack "Tasty Viral"</h3>
                        <p className="price">200 000 FCFA</p>
                    </div>
                    <ul className="features-list">
                        <li><Clock size={18} /> 30 Secondes</li>
                        <li><Music size={18} /> Sound Design ASMR</li>
                        <li><Droplet size={18} /> Physique des fluides avancée</li>
                        <li><Check size={18} /> Incrustation Pro (Reflets)</li>
                        <li><Clock size={18} /> Délai: 7 Jours</li>
                    </ul>
                    <Link to="/booking" className="btn-secondary w-full text-center" style={{ display: 'block', marginTop: 'auto' }}>Choisir ce Pack</Link>
                </div>

                {/* Pack 3 - Best Seller */}
                <div className="pricing-card glass-panel best-seller">
                    <div className="badge">⭐ Best-Seller</div>
                    <div className="card-header">
                        <h3>Pack "Tasty Viral"</h3>
                        <p className="price">200 000 FCFA</p>
                    </div>
                    <ul className="features-list">
                        <li><Clock size={18} /> 30 Secondes</li>
                        <li><Music size={18} /> Sound Design ASMR</li>
                        <li><Droplet size={18} /> Physique des fluides avancée</li>
                        <li><Check size={18} /> Incrustation Pro (Reflets)</li>
                        <li><Clock size={18} /> Délai: 7 Jours</li>
                    </ul>
                    <Link to="/booking" className="btn-primary w-full text-center" style={{ display: 'block' }}>Choisir ce Pack</Link>
                </div>

                {/* Pack 4 */}
                <div className="pricing-card glass-panel">
                    <div className="card-header">
                        <h3>Pack "Brand Universe"</h3>
                        <p className="price">350 000 FCFA</p>
                    </div>
                    <ul className="features-list">
                        <li><Clock size={18} /> 30-40 Secondes</li>
                        <li><Users size={18} /> Intégration Humains IA</li>
                        <li><Sliders size={18} /> Décors Complexes</li>
                        <li><Check size={18} /> Upscale 4K</li>
                        <li><Clock size={18} /> Délai: 8-10 Jours</li>
                    </ul>
                    <Link to="/booking" className="btn-secondary w-full text-center" style={{ display: 'block', marginTop: 'auto' }}>Choisir ce Pack</Link>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
