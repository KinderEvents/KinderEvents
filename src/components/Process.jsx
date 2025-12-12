import React from 'react';
import '../styles/Process.css';

const steps = [
    { id: 1, title: 'Audit & Concept 🧠', desc: 'Analyse de votre marque et storyboard.' },
    { id: 2, title: 'Digitalisation 📸', desc: 'Détourage et traitement numérique de votre produit.' },
    { id: 3, title: 'Génération IA 🎨', desc: 'Création visuels (Flux/Midjourney) & Animation (Runway).' },
    { id: 4, title: 'Sound Design 🔊', desc: 'Montage dynamique & bruitages ASMR.' },
    { id: 5, title: 'Livraison 📦', desc: 'Export 4K Upscaled pour réseaux sociaux.' },
];

const Process = () => {
    return (
        <section id="process" className="section-padding container">
            <h2 className="section-title text-center">Notre Processus</h2>
            <div className="process-timeline">
                {steps.map((step, index) => (
                    <div key={step.id} className="process-step">
                        <div className="step-number">{step.id}</div>
                        <div className="step-content glass-panel">
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Process;
