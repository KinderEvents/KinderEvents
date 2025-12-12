import React from 'react';
import { Mail, TrendingUp, Zap, Newspaper } from 'lucide-react';
import '../styles/NewsTrends.css';

const trends = [
    {
        icon: <TrendingUp size={32} />,
        title: "Génération Vidéo Temps Réel",
        desc: "Les modèles comme Runway Gen-3 permettent désormais de créer des variations de publicités en quelques secondes pour l'A/B testing."
    },
    {
        icon: <Zap size={32} />,
        title: "Hyper-Personnalisation",
        desc: "Adaptez le produit dans la vidéo selon l'audience cible (ex: Bouteille glacée pour l'été, ambiance cozy pour l'hiver) sans re-tourner."
    }
];

const NewsTrends = () => {
    return (
        <section className="section-padding container">
            <h2 className="section-title text-center">Tendances & Actualités IA</h2>

            <div className="trends-grid">
                {trends.map((trend, index) => (
                    <div key={index} className="trend-card glass-panel">
                        <div className="trend-icon">{trend.icon}</div>
                        <h3>{trend.title}</h3>
                        <p>{trend.desc}</p>
                    </div>
                ))}
            </div>

            <div className="newsletter-wrapper glass-panel">
                <div className="newsletter-content">
                    <div className="newsletter-header">
                        <Newspaper size={40} className="text-neon" />
                        <h3>La Veille VisionR</h3>
                    </div>
                    <p>Recevez chaque semaine les dernières innovations de l'Intelligence Artificielle appliquée au Marketing.</p>
                    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="input-group">
                            <Mail className="input-icon" size={20} />
                            <input type="email" placeholder="Votre email professionnel" required />
                        </div>
                        <button type="submit" className="btn-primary">M'abonner</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NewsTrends;
