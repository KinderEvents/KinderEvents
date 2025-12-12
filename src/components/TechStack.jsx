import React from 'react';
import '../styles/TechStack.css';

const tools = [
    'Flux Pro', 'Midjourney v6', 'Kling AI', 'Runway Gen-3', 'Topaz Video AI', 'Adobe Suite'
];

const TechStack = () => {
    return (
        <section className="section-padding container">
            <h2 className="section-title text-center">Nos Outils Technologiques</h2>
            <div className="tech-grid">
                {tools.map(tool => (
                    <div key={tool} className="tech-item glass-panel">
                        <span>{tool}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TechStack;
