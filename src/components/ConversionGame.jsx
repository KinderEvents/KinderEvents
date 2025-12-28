import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, XCircle, AlertTriangle, Lock, Users, DollarSign, RefreshCw, ChevronRight } from 'lucide-react';

const Particle = ({ id, status, delay }) => {
    // status: 'flowing', 'dropped', 'success'

    return (
        <motion.div
            layoutId={id}
            initial={{ x: -20, y: 50, opacity: 0 }}
            animate={
                status === 'flowing' ? { x: '100%', opacity: [0, 1, 1, 0] } :
                    status === 'dropped' ? { y: 500, opacity: 0, transition: { duration: 0.8 } } :
                        { x: '100%', opacity: 1, backgroundColor: '#10B981' }
            }
            transition={{
                duration: status === 'flowing' ? 3 : 0.5,
                ease: "linear",
                repeat: status === 'flowing' ? Infinity : 0,
                delay: delay
            }}
            style={{
                position: 'absolute',
                left: 0,
                top: 50 + Math.random() * 40,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: status === 'dropped' ? '#EF4444' : '#06B6D4',
                boxShadow: status === 'dropped' ? '0 0 10px #EF4444' : '0 0 10px #06B6D4',
                zIndex: 10
            }}
        />
    );
};

const ConversionGame = () => {
    const [gameState, setGameState] = useState('intro'); // intro, q1, q2, q3, analyzing, result
    const [particles, setParticles] = useState([]);
    const [score, setScore] = useState(100);
    const [moneyLost, setMoneyLost] = useState(0);

    // Initial particles
    useEffect(() => {
        if (gameState === 'q1' || gameState === 'q2') {
            const newParticles = Array.from({ length: 20 }).map((_, i) => ({
                id: i,
                delay: i * 0.1,
                status: 'flowing'
            }));
            setParticles(newParticles);
        }
    }, [gameState]);

    const handleAnswer = (correct, dropAmount) => {
        if (!correct) {
            setScore(prev => Math.max(0, prev - dropAmount));
            setMoneyLost(prev => prev + (dropAmount * 5000)); // Arbitrary value per lead

            // Visual drop effect
            setParticles(prev => prev.map((p, i) =>
                i % 2 === 0 ? { ...p, status: 'dropped' } : p
            ));

            setTimeout(() => {
                nextStage();
            }, 1000);
        } else {
            nextStage();
        }
    };

    const nextStage = () => {
        if (gameState === 'q1') setGameState('q2');
        else if (gameState === 'q2') setGameState('q3');
        else if (gameState === 'q3') {
            setGameState('analyzing');
            setTimeout(() => setGameState('result'), 2000);
        }
    };

    const handleBAOClick = () => {
        // BAO is always blocked
        const button = document.getElementById('bao-btn');
        if (button) {
            button.classList.add('shake');
            setTimeout(() => button.classList.remove('shake'), 500);
        }

        // Simulating the realisation that BAO is blocked
        setTimeout(() => {
            handleAnswer(false, 40); // Lose big on BAO
        }, 800);
    };

    const restartGame = () => {
        setScore(100);
        setMoneyLost(0);
        setGameState('intro');
    };

    return (
        <div style={{ width: '95%', maxWidth: '900px', margin: '4rem auto', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', border: '1px solid #1E293B', background: '#0F172A', color: 'white', position: 'relative', fontFamily: 'Inter, sans-serif' }}>

            {/* Header */}
            <div style={{ padding: '1.5rem', background: '#1E293B', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ padding: '8px', background: '#EF4444', borderRadius: '8px' }}>
                        <AlertTriangle size={20} color="white" />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '700' }}>CRASH TEST MARKETING</h3>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#94A3B8' }}>Simulation de votre business</p>
                    </div>
                </div>
                <div style={{ padding: '8px 16px', background: '#0F172A', borderRadius: '12px', border: '1px solid #334155' }}>
                    <span style={{ fontSize: '0.9rem', color: '#94A3B8' }}>Clients restants:</span> <span style={{ fontWeight: '700', color: '#06B6D4' }}>{score}</span>
                </div>
            </div>

            {/* Game Area */}
            <div style={{ height: '400px', position: 'relative', background: 'radial-gradient(circle at center, #1E293B 0%, #0F172A 100%)', overflow: 'hidden' }}>

                {/* Visual Pipeline Background */}
                <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '100px', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}></div>

                {/* Particles */}
                {(gameState === 'q1' || gameState === 'q2' || gameState === 'q3') && particles.map(p => (
                    <Particle key={p.id} {...p} />
                ))}

                {/* Overlays / Stages */}
                <AnimatePresence mode='wait'>

                    {gameState === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(5px)' }}
                        >
                            <h2 className="intro-title" style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', background: 'linear-gradient(to right, #06B6D4, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                LE PANIER PERCÉ
                            </h2>
                            <p style={{ maxWidth: '500px', color: '#CBD5E1', marginBottom: '2rem', fontSize: '1.1rem' }}>
                                Dans la vraie vie, vous perdez des clients sans vous en rendre compte.
                                <br /><br />
                                Prenez les commandes. Voyons combien d'argent vous laissez sur la table.
                            </p>
                            <button onClick={() => setGameState('q1')} style={{ padding: '1rem 3rem', fontSize: '1.2rem', fontWeight: '700', background: '#2563EB', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 0 20px rgba(37, 99, 235, 0.5)' }}>
                                LANCER LA SIMULATION
                            </button>
                        </motion.div>
                    )}

                    {gameState === 'q1' && (
                        <motion.div
                            key="q1"
                            initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}
                            style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}
                        >
                            <div style={{ width: '90%', maxWidth: '500px', background: 'rgba(30, 41, 59, 0.95)', padding: '2rem', borderRadius: '16px', border: '1px solid #475569', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
                                <div style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Étape 1 : Attention</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Comment attires-tu l'attention ?</h3>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    <button onClick={() => handleAnswer(false, 30)} style={{ padding: '1rem', background: '#0F172A', border: '1px solid #334155', borderRadius: '8px', color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                                        A. Je poste mon flyer 10 fois par jour partout
                                    </button>
                                    <button onClick={() => handleAnswer(true, 0)} style={{ padding: '1rem', background: '#0F172A', border: '1px solid #334155', borderRadius: '8px', color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                                        B. J'utilise une accroche émotionnelle (Hook)
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {gameState === 'q2' && (
                        <motion.div
                            key="q2"
                            initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}
                            style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}
                        >
                            <div style={{ width: '90%', maxWidth: '500px', background: 'rgba(30, 41, 59, 0.95)', padding: '2rem', borderRadius: '16px', border: '1px solid #475569', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
                                <div style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Étape 2 : Vente</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Le client demande "C'est combien ?"</h3>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    <button onClick={() => handleAnswer(false, 40)} style={{ padding: '1rem', background: '#0F172A', border: '1px solid #334155', borderRadius: '8px', color: '#CBD5E1', cursor: 'pointer', textAlign: 'left' }}>
                                        A. Je donne mon prix tout de suite (Honnêteté)
                                    </button>
                                    <button onClick={() => handleAnswer(true, 0)} style={{ padding: '1rem', background: '#0F172A', border: '1px solid #334155', borderRadius: '8px', color: '#CBD5E1', cursor: 'pointer', textAlign: 'left' }}>
                                        B. Je vends d'abord la transformation
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {gameState === 'q3' && (
                        <motion.div
                            key="q3"
                            initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}
                            style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}
                        >
                            <div style={{ width: '90%', maxWidth: '500px', textAlign: 'center' }}>
                                <h3 className="bao-title" style={{ fontSize: '2rem', marginBottom: '2rem', textShadow: '0 0 10px #2563EB' }}>BOOST VIRAL DISPONIBLE</h3>
                                <p className="bao-text" style={{ marginBottom: '2rem', color: '#94A3B8' }}>Transformer vos clients en ambassadeurs pour doubler vos ventes gratuitement ?</p>

                                <button
                                    id="bao-btn"
                                    onClick={handleBAOClick}
                                    style={{
                                        padding: '1.5rem 3rem', background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                        color: 'white', border: 'none', borderRadius: '50px',
                                        fontSize: '1.2rem', fontWeight: '800', cursor: 'pointer',
                                        boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)',
                                        display: 'inline-flex', alignItems: 'center', gap: '10px'
                                    }}
                                >
                                    <Lock size={24} /> ACTIVER LE BOUCHE-À-OREILLE
                                </button>

                                <div style={{ marginTop: '2rem', color: '#EF4444', fontWeight: 'bold', opacity: 0 }} className='error-msg'>
                                    ERREUR : VOUS N'AVEZ PAS LA MÉTHODE
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {gameState === 'analyzing' && (
                        <motion.div
                            key="analyzing"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            style={{ position: 'absolute', inset: 0, background: '#0F172A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <RefreshCw className="spin" size={48} color="#06B6D4" />
                            <h3 style={{ marginTop: '1rem', letterSpacing: '2px' }}>ANALYSE DU BUSINESS...</h3>
                        </motion.div>
                    )}

                    {gameState === 'result' && (
                        <motion.div
                            key="result"
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}
                        >
                            <div style={{ textAlign: 'center', maxWidth: '600px', padding: '2rem' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#EF4444', marginBottom: '0.5rem' }}>ECHEC CRITIQUE</h2>
                                <p style={{ fontSize: '1.2rem', color: '#94A3B8', marginBottom: '2rem' }}>Votre processus commercial a trop de fuites.</p>

                                <div className="result-stats-grid">
                                    <div style={{ background: '#1E293B', padding: '1.5rem', borderRadius: '12px' }}>
                                        <div style={{ fontSize: '0.9rem', color: '#94A3B8' }}>Clients Perdus</div>
                                        <div style={{ fontSize: '2rem', fontWeight: '700', color: '#EF4444' }}>{100 - score}</div>
                                    </div>
                                    <div style={{ background: '#1E293B', padding: '1.5rem', borderRadius: '12px' }}>
                                        <div style={{ fontSize: '0.9rem', color: '#94A3B8' }}>Argent Perdu (Est.)</div>
                                        <div style={{ fontSize: '2rem', fontWeight: '700', color: '#F59E0B' }}>{moneyLost.toLocaleString()} F</div>
                                    </div>
                                </div>

                                <p style={{ color: 'white', marginBottom: '2rem', fontStyle: 'italic' }}>
                                    "Le Bouche-à-Oreille ne s'active pas par hasard. C'est une mécanique précise que vous ne maîtrisez pas encore."
                                </p>

                                <button onClick={() => document.getElementById('pricing-grid')?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '1.2rem 2.5rem', background: '#2563EB', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', boxShadow: '0 0 20px rgba(37, 99, 235, 0.6)', animation: 'pulse 2s infinite' }}>
                                    OBTENIR LA MÉTHODE VISIONR <ChevronRight size={20} style={{ verticalAlign: 'middle' }} />
                                </button>

                                <button onClick={restartGame} style={{ display: 'block', margin: '1rem auto', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', textDecoration: 'underline' }}>
                                    Recommencer le test
                                </button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>

            </div>

            <style>{`
                .shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
                @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); } 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); } }
                
                .result-stats-grid { 
                    display: grid; 
                    grid-template-columns: 1fr 1fr; 
                    gap: 2rem; 
                    margin-bottom: 2rem; 
                }
                
                @media (max-width: 640px) {
                    .result-stats-grid { 
                        grid-template-columns: 1fr; 
                        gap: 1rem; 
                    }
                    div[style*="height: 400px"] {
                        height: 500px !important;
                    }
                    .bao-title {
                        font-size: 1.5rem !important;
                    }
                    .bao-text {
                        font-size: 0.9rem !important;
                    }
                    #bao-btn {
                        padding: 1rem 1.5rem !important;
                        font-size: 1rem !important;
                        width: 100%;
                    }
                    .intro-title {
                        font-size: 1.8rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ConversionGame;
