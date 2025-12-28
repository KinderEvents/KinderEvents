import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import '../styles/global.css'; // Utilizing global styles for glass-panel

const Founder = () => {
    return (
        <section className="container" style={{ padding: '6rem 0' }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-panel"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                    padding: '4rem',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    alignItems: 'center',
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                {/* Decorative Background for Card */}
                <div style={{
                    position: 'absolute', top: -50, right: -50, width: 200, height: 200,
                    background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)',
                    zIndex: 0, pointerEvents: 'none'
                }}></div>

                {/* Left: Photo / Visual */}
                <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                    <div style={{
                        width: '280px',
                        height: '280px',
                        borderRadius: '30px',
                        background: 'linear-gradient(135deg, #E2E8F0 0%, #F8FAFC 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                        border: '1px solid white'
                    }}>
                        {/* Placeholder for Founder Image - Using Initials if image not available */}
                        <span style={{ fontSize: '5rem', fontWeight: '800', color: '#CBD5E1' }}>PG</span>
                    </div>

                    {/* Floating Badge */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.4, type: 'spring' }}
                        style={{
                            position: 'absolute',
                            bottom: -20,
                            right: 20,
                            background: '#0F172A',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '50px',
                            boxShadow: '0 10px 20px rgba(15, 23, 42, 0.2)',
                            fontSize: '0.9rem',
                            fontWeight: '700'
                        }}
                    >
                        THE ARCHITECT
                    </motion.div>
                </div>

                {/* Right: Content */}
                <div style={{ textAlign: 'left', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#0F172A', fontWeight: '800', margin: 0 }}>
                            Papa Ngagne Gueye
                        </h2>
                        <span style={{
                            background: '#EFF6FF', color: '#2563EB', padding: '6px 14px', borderRadius: '50px',
                            fontSize: '0.85rem', fontWeight: '700', border: '1px solid #DBEAFE'
                        }}>
                            aka Ecstasy
                        </span>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem', flexWrap: 'wrap' }}>
                        {['Growth Marketer', 'Growth Hacker', 'Entrepreneur'].map((title, i) => (
                            <motion.span
                                key={title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                                style={{
                                    fontSize: '0.9rem', color: '#64748B', fontWeight: '500',
                                    border: '1px solid #E2E8F0', padding: '4px 12px', borderRadius: '6px'
                                }}
                            >
                                {title}
                            </motion.span>
                        ))}
                    </div>

                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', background: 'linear-gradient(90deg, #0F172A, #334155)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        "Transformer les idées en systèmes de croissance."
                    </h3>

                    <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                        Passionné par la communication et la croissance exponentielle. Avec une expertise solide en automatisation et stratégie digitale, je ne me contente pas de gérer des projets : je construis des machines à vendre pour des entreprises ambitieuses.
                    </p>
                    <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
                        Toujours en mouvement, je combine analyse technique et vision créative pour générer un impact réel.
                    </p>

                    <p style={{ color: '#94A3B8', fontStyle: 'italic', fontSize: '0.9rem', marginBottom: '2rem' }}>
                        Étudiant & Communicant Curieux @ UGB
                    </p>

                    <a href="mailto:gueye.papa-ngagne@ugb.edu.sn" style={{ textDecoration: 'none' }}>
                        <button className="btn-primary" style={{
                            padding: '14px 28px',
                            borderRadius: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontSize: '1rem',
                            fontWeight: '600'
                        }}>
                            <Mail size={18} /> Contacter le fondateur directement
                        </button>
                    </a>
                </div>
            </motion.div>
        </section>
    );
};

export default Founder;
