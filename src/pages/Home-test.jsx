import React from 'react';
import { Navbar, Footer } from '../components';

const Home = () => {
    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
            <Navbar />

            <div style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: '#0F172A',
                    marginBottom: '1rem'
                }}>
                    VisionR AI Studio
                </h1>
                <p style={{
                    fontSize: '1.2rem',
                    color: '#64748B',
                    marginBottom: '2rem'
                }}>
                    L'Intelligence Artificielle au service de votre Marque
                </p>

                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    marginTop: '3rem'
                }}>
                    <h2 style={{ color: '#0F172A', marginBottom: '1rem' }}>
                        Site en cours de chargement...
                    </h2>
                    <p style={{ color: '#64748B' }}>
                        Si vous voyez ce message, le site fonctionne ! 🎉
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
