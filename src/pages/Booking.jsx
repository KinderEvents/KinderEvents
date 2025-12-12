import React from 'react';
import { CalendlyWidget } from '../components';

const Booking = () => {
    return (
        <div className="section-padding container" style={{ marginTop: '80px' }}>
            <h1 className="section-title text-center">Réserver un Appel Découverte</h1>
            <p className="text-center" style={{ marginBottom: '2rem', maxWidth: '600px' }}>
                Choisissez un créneau ci-dessous pour discuter de votre projet vidéo avec notre équipe.
                C'est gratuit et sans engagement.
            </p>
            <div className="glass-panel" style={{ width: '100%', padding: '1rem' }}>
                <CalendlyWidget />
            </div>
        </div>
    );
};

export default Booking;
