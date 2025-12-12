import React from 'react';
import { Citrus, Rocket, Wallet } from 'lucide-react';
import '../styles/WhyChooseAI.css';

const WhyChooseAI = () => {
    return (
        <section id="why-ai" className="section-padding container">
            <h2 className="section-title text-center">Pourquoi Choisir l'IA ?</h2>
            <div className="features-grid">
                <div className="feature-card glass-panel">
                    <div className="icon"><Citrus size={64} className="text-neon" /></div>
                    <h3>L'Ultra-Fraîcheur Visuelle</h3>
                    <p>
                        Nous générons des textures impossibles à filmer au smartphone : éclaboussures de lait, fruits givrés, condensation sur la bouteille.
                        On vend le goût par les yeux.
                    </p>
                </div>
                <div className="feature-card glass-panel">
                    <div className="icon"><Rocket size={64} className="text-neon" /></div>
                    <h3>Rapidité & Flexibilité</h3>
                    <p>
                        Pas de location de studio, pas d'équipe de tournage. Votre vidéo est prête en moins de 7 jours.
                        Vous voulez changer le décor ? C'est fait en un clic.
                    </p>
                </div>
                <div className="feature-card glass-panel">
                    <div className="icon"><Wallet size={64} className="text-neon" /></div>
                    <h3>Budget Maîtrisé</h3>
                    <p>
                        Obtenez un rendu visuel digne d'une publicité à 5 millions de FCFA, pour une fraction du prix.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseAI;
