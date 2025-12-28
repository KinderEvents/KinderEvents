import React from 'react';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/formationBanner.css'; // We will overwrite this CSS shortly or use inline for guarantees

const FormationBanner = () => {
    return (
        <section className="formation-banner-container" style={{ padding: '6rem 0', background: 'transparent' }}>
            <div className="container">
                <div className="formation-card" style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '4rem',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E2E8F0',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Decorative Background Blob */}
                    <div style={{
                        position: 'absolute', top: '-50%', left: '-20%', width: '500px', height: '500px',
                        background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)',
                        zIndex: 0
                    }}></div>

                    <div style={{ position: 'relative', zIndex: 10 }}>
                        <div style={{
                            margin: '0 auto 1.5rem',
                            width: '64px',
                            height: '64px',
                            background: '#F1F5F9',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <GraduationCap size={32} color="#2563EB" />
                        </div>

                        <h2 style={{
                            fontSize: '2.5rem',
                            marginBottom: '1rem',
                            color: '#0F172A',
                            fontWeight: '800',
                            letterSpacing: '-0.5px'
                        }}>
                            Maîtrisez l'IA et le Growth
                        </h2>

                        <p style={{
                            fontSize: '1.2rem',
                            color: '#475569',
                            marginBottom: '2.5rem',
                            maxWidth: '600px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                            Ne dépendez plus des agences. Formez vos équipes aux outils qui génèrent du résultat.
                        </p>

                        <Link to="/formation">
                            <button style={{
                                background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
                                color: 'white',
                                padding: '16px 32px',
                                borderRadius: '50px',
                                border: 'none',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
                                transition: 'transform 0.2s ease'
                            }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                Découvrir le programme <ArrowRight size={20} />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormationBanner;
