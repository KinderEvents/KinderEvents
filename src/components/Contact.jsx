import React from 'react';
import '../styles/Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="section-padding container">
            <div className="contact-wrapper glass-panel">
                <h2 className="section-title text-center">Prêt à faire décoller votre marque ?</h2>
                <p className="contact-subtitle text-center">
                    Discutons de votre projet et voyons comment l'IA peut transformer votre communication.
                </p>
                <div className="contact-actions">
                    <a href="mailto:hello@visionr.ai" className="btn-primary">Nous Écrire</a>
                    <button className="btn-secondary" onClick={() => alert('Ouverture du calendrier de réservation...')}>Réserver un Appel</button>
                </div>
            </div>
        </section>
    );
};

export default Contact;
