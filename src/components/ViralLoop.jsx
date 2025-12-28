import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ShieldCheck, CreditCard, Megaphone, ArrowRight, CornerLeftUp } from 'lucide-react';

const Card = ({ icon: Icon, title, subtitle, isActive, isGold, index }) => (
    <motion.div
        animate={{
            scale: isActive ? 1.05 : 1,
            borderColor: isGold ? '#F59E0B' : isActive ? '#3B82F6' : '#E2E8F0',
            boxShadow: isGold ? '0 10px 30px -5px rgba(245, 158, 11, 0.3)' : isActive ? '0 10px 25px -5px rgba(59, 130, 246, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}
        transition={{ duration: 0.5 }}
        style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '2px solid',
            width: '100%',
            maxWidth: '220px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 10,
            position: 'relative'
        }}
    >
        <div style={{
            background: isGold ? '#FEF3C7' : isActive ? '#EFF6FF' : '#F1F5F9',
            padding: '12px',
            borderRadius: '50%',
            marginBottom: '1rem',
            color: isGold ? '#D97706' : isActive ? '#2563EB' : '#64748B',
            transition: 'all 0.5s'
        }}>
            <Icon size={24} />
        </div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.25rem' }}>{title}</h3>
        <p style={{ fontSize: '0.85rem', color: '#64748B' }}>{subtitle}</p>
    </motion.div>
);

const ViralLoop = () => {
    const [step, setStep] = useState(0); // 0, 1, 2, 3 (steps), 4 (BAO loop)

    useEffect(() => {
        const sequence = async () => {
            while (true) {
                // Phase 1: Linear Flow
                for (let i = 0; i < 4; i++) {
                    setStep(i);
                    await new Promise(r => setTimeout(r, 1000));
                }

                // Phase 2: BAO Activation (Ambassadors)
                setStep(4);
                await new Promise(r => setTimeout(r, 3000));

                // Reset slightly
                setStep(-1);
                await new Promise(r => setTimeout(r, 500));
            }
        };
        sequence();
    }, []);

    return (
        <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '2rem 0', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{
                    display: 'inline-block', padding: '6px 12px', background: '#F0F9FF',
                    color: '#0284C7', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '1rem'
                }}>
                    MÉTHODE VISIONR
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0F172A', marginBottom: '1rem' }}>
                    La Méthode <span style={{ color: '#F59E0B' }}>VisionR</span>
                </h2>
                <p style={{ color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
                    La plupart des business s'arrêtent à la Vente. Nous, on active les Ambassadeurs pour que vos clients vous apportent... d'autres clients.
                </p>
            </div>

            <div style={{ position: 'relative', padding: '2rem 0' }}>
                {/* Desktop Line Connector */}
                <div className="vl-connector-desktop" style={{
                    position: 'absolute', top: '50%', left: '10%', right: '10%', height: '4px', background: '#E2E8F0', transform: 'translateY(-50%)', zIndex: 0
                }}>
                    <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: step >= 0 && step < 4 ? `${(step / 3) * 100}%` : step === 4 ? '100%' : '0%' }}
                        style={{ height: '100%', background: step === 4 ? 'linear-gradient(90deg, #2563EB, #F59E0B)' : '#3B82F6', borderRadius: '4px' }}
                    />
                </div>

                {/* Cards Container */}
                <div className="vl-grid" style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', position: 'relative', flexWrap: 'nowrap' }}>
                    <Card icon={Eye} title="VISIBILITÉ" subtitle="Connaissance" isActive={step >= 0} index={0} />
                    <Card icon={ShieldCheck} title="CONFIANCE" subtitle="Considération" isActive={step >= 1} index={1} />
                    <Card icon={CreditCard} title="VENTE" subtitle="Achat" isActive={step >= 2} index={2} />
                    <Card icon={Megaphone} title="AMBASSADEURS" subtitle="Recommandation" isActive={step >= 3} isGold={step === 4} index={3} />
                </div>

                {/* BAO Loop Arrow (Overlay) */}
                <AnimatePresence>
                    {step === 4 && (
                        <motion.div
                            className="bao-arrow-desktop"
                            initial={{ opacity: 0, pathLength: 0 }}
                            animate={{ opacity: 1, pathLength: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ position: 'absolute', top: '-60px', left: 0, width: '100%', height: '140%', pointerEvents: 'none', zIndex: 20 }}
                        >
                            <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="goldGradient" x1="100%" y1="0%" x2="0%" y2="0%">
                                        <stop offset="0%" stopColor="#F59E0B" />
                                        <stop offset="100%" stopColor="#3B82F6" />
                                    </linearGradient>
                                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                                    </marker>
                                </defs>
                                <motion.path
                                    d="M 700 80 Q 400 -80 100 80"
                                    fill="none"
                                    stroke="url(#goldGradient)"
                                    strokeWidth="4"
                                    strokeDasharray="10 10"
                                    markerEnd="url(#arrowhead)"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                            </svg>
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                style={{
                                    position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)',
                                    background: 'white', padding: '5px 15px', borderRadius: '20px',
                                    boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)', border: '2px solid #F59E0B',
                                    color: '#B45309', fontWeight: '800', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px'
                                }}
                            >
                                ACTIVATION BAO 🚀
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Mobile Vertical Return Loop (Shooting Particle) */}
                <AnimatePresence>
                    {step === 4 && (
                        <motion.div
                            className="mobile-return-particle"
                            initial={{ top: '100%', opacity: 1, scale: 0.5 }}
                            animate={{ top: '0%', opacity: [1, 1, 0], scale: [1, 1.5, 0.5] }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            style={{
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '4px',
                                height: '40px',
                                background: 'linear-gradient(to top, #F59E0B, #2563EB)',
                                borderRadius: '4px',
                                zIndex: 100,
                                boxShadow: '0 0 20px #F59E0B',
                                display: 'none' // Hidden on desktop via CSS, shown on mobile
                            }}
                        >
                            <div style={{
                                position: 'absolute', top: 0, left: '-18px', width: '40px',
                                textAlign: 'center', fontSize: '1.5rem', filter: 'drop-shadow(0 0 10px rgba(245,158,11,0.5))'
                            }}>
                                🚀
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Connection Line Mobile */}
                <div className="mobile-connector-line" />
            </div>

            <style>{`
                .mobile-connector-line { display: none; }

                @media (max-width: 768px) {
                    .vl-grid { 
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                        gap: 2rem !important; /* Increased gap for visual flow */
                        overflow-x: visible !important;
                        flex-wrap: nowrap !important;
                    }
                    
                    .vl-connector-desktop { display: none !important; }
                    .bao-arrow-desktop { display: none !important; } 

                    .mobile-return-particle {
                        display: block !important;
                    }

                    /* Add a background line behind cards to show path */
                    .mobile-connector-line {
                        display: block;
                        position: absolute;
                        top: 2rem;
                        bottom: 2rem;
                        left: 50%;
                        width: 2px;
                        background: #E2E8F0;
                        transform: translateX(-50%);
                        z-index: 0;
                    }
                }
            `}</style>
        </div >
    );
};

export default ViralLoop;
