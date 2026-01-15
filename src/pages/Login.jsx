import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple hardcoded security - change this code if needed
        if (password === 'VISIONR2025') {
            localStorage.setItem('admin_auth', 'true');
            navigate('/admin');
        } else {
            setError('Mot de passe incorrect');
            setPassword('');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0F172A',
            padding: '20px',
            fontFamily: 'Helvetica Neue, sans-serif'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    background: '#1E293B',
                    padding: '40px',
                    borderRadius: '24px',
                    width: '100%',
                    maxWidth: '400px',
                    border: '1px solid #334155',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <div style={{ background: '#334155', padding: '16px', borderRadius: '50%' }}>
                        <Lock color="#D4AF37" size={32} />
                    </div>
                </div>

                <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '8px', fontSize: '24px' }}>
                    Accès Admin
                </h1>
                <p style={{ color: '#94A3B8', textAlign: 'center', marginBottom: '32px', fontSize: '14px' }}>
                    Veuillez entrer le code de sécurité
                </p>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Code d'accès"
                            style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '12px',
                                background: '#0F172A',
                                border: error ? '1px solid #EF4444' : '1px solid #334155',
                                color: 'white',
                                fontSize: '16px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                        {error && (
                            <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '8px', paddingLeft: '4px' }}>
                                {error}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: '#D4AF37',
                            color: '#0F172A',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        <span>Connexion</span>
                        <ArrowRight size={18} />
                    </button>
                </form>

                <div style={{ marginTop: '30px', textAlign: 'center', color: '#475569', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <ShieldCheck size={14} />
                    <span>Zone Sécurisée VisionR</span>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
