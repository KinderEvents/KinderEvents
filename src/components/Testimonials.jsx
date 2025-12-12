import React from 'react';
import { Quote } from 'lucide-react';
import '../styles/Testimonials.css';

const testimonials = [
    {
        text: "VisionR a transformé notre campagne publicitaire. La vidéo générée par IA a fait 3 fois plus de vues que nos spots classiques, pour moitié moins cher.",
        author: "Aminata Diop",
        role: "Directrice Marketing",
        company: "Vitrine Digital",
        image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200"
    },
    {
        text: "Bluffant. On avait besoin d'une pub pour notre nouvelle app Jëndal en 48h. Le rendu est ultra-pro, on dirait un tournage fait des meilleurs studios du monde.",
        author: "Moussa Sow",
        role: "CEO",
        company: "Tech Dakar Solutions",
        image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=200"
    },
    {
        text: "L'effet 'Food Porn' sur nos burgers est incroyable. Les textures coulantes générées par leur IA donnent vraiment faim. Nos commandes ont explosé.",
        author: "Omar Fall",
        role: "Fondateur",
        company: "Dakar Burger",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    }
];

const Testimonials = () => {
    return (
        <section className="section-padding container">
            <h2 className="section-title text-center">Ils nous font confiance</h2>
            <div className="testimonials-grid">
                {testimonials.map((t, i) => (
                    <div key={i} className="testimonial-card glass-panel">
                        <Quote className="quote-icon" size={40} />
                        <p className="testimonial-text">"{t.text}"</p>
                        <div className="testimonial-author">
                            <img src={t.image} alt={t.author} />
                            <div className="author-info">
                                <h4>{t.author}</h4>
                                <p>{t.role} chez <span className="text-neon">{t.company}</span></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
