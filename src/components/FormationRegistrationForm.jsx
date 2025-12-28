import React, { useState } from 'react';
// import emailjs from '@emailjs/browser'; // Replaced by Resend
import { supabase } from '../config/supabaseClient';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentButton from './PaymentButton';

const FormationRegistrationForm = ({ selectedPack, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        email: '',
        boutique: '',
        pack: selectedPack || 'Formation Initiale'
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [errorMessage, setErrorMessage] = useState('');

    React.useEffect(() => {
        if (selectedPack) {
            setFormData(prev => ({ ...prev, pack: selectedPack }));
        }
    }, [selectedPack]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        try {
            // 1. Envoi vers notre API sécurisée (Server-Side)
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: formData.name,
                    email: formData.email,
                    whatsapp: formData.whatsapp,
                    project_name: formData.boutique,
                    pack_type: formData.pack,
                    price: formData.pack.includes('10000') ? 10000 : 5000
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Erreur API');
            }

            console.log('Inscription réussie via API:', result);

            // 2. Envoi Email via API (Resend) - Optionnel / Non-bloquant
            try {
                const emailResponse = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email || 'Pas d\'email',
                        subject: `🎓 Inscription Formation: ${formData.pack}`,
                        details: `
                        <p><strong>Pack :</strong> ${formData.pack}</p>
                        <p><strong>WhatsApp :</strong> ${formData.whatsapp}</p>
                        <p><strong>Projet/Boutique :</strong> ${formData.boutique}</p>
                    `
                    })
                });
                if (!emailResponse.ok) console.warn('Email API non disponible en local (ceci est normal)');
            } catch (emailErr) {
                console.warn('Erreur envoi email (non bloquant):', emailErr);
            }

            setStatus('success');
        } catch (error) {
            console.error('Registration Error:', error);
            setStatus('error');
            setErrorMessage('Une erreur est survenue lors de l\'enregistrement. Vérifiez votre connexion.');
        }
    };

    if (status === 'success') {
        const packAmount = formData.pack.includes('10000') ? 10000 : 5000;

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="success-message"
                style={{ textAlign: 'center', padding: '2rem' }}
            >
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                    <CheckCircle size={64} color="#10B981" />
                </div>
                <h3 style={{ fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>Inscription Reçue !</h3>
                <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
                    Merci {formData.name}. Votre demande pour <strong>{formData.pack}</strong> est enregistrée.
                </p>

                <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                    <p style={{ color: '#0F172A', fontWeight: '600', marginBottom: '1rem' }}>Finaliser votre inscription :</p>
                    <PaymentButton
                        amount={packAmount}
                        packName={formData.pack}
                        customerData={{
                            name: formData.name,
                            email: formData.email,
                            whatsapp: formData.whatsapp
                        }}
                        onSuccess={() => console.log('Paiement initié')}
                        onError={(error) => console.error('Erreur paiement:', error)}
                    />
                </div>

                <p style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    Ou contactez-nous sur WhatsApp : {formData.whatsapp}
                </p>

                <button
                    onClick={onClose}
                    style={{
                        padding: '10px 20px',
                        background: 'transparent',
                        color: '#64748B',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    Fermer
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#0F172A', textAlign: 'center', marginBottom: '0.5rem' }}>
                Inscription Rapide
            </h3>
            <p style={{ textAlign: 'center', color: '#64748B', marginBottom: '1rem', fontSize: '0.9rem' }}>
                Remplissez ce formulaire pour réserver votre place.
            </p>

            <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#334155', marginBottom: '0.5rem' }}>Nom complet</label>
                <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    style={{
                        width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '1rem'
                    }}
                />
            </div>

            <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#334155', marginBottom: '0.5rem' }}>Numéro WhatsApp</label>
                <input
                    type="tel"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="+221 ..."
                    style={{
                        width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '1rem'
                    }}
                />
            </div>

            <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#334155', marginBottom: '0.5rem' }}>Email (Optionnel)</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    style={{
                        width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '1rem'
                    }}
                />
            </div>

            <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#334155', marginBottom: '0.5rem' }}>Nom de votre Boutique / Projet</label>
                <input
                    type="text"
                    name="boutique"
                    value={formData.boutique}
                    onChange={handleChange}
                    placeholder="Ex: Ma Boutique Mode"
                    style={{
                        width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '1rem'
                    }}
                />
            </div>

            <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#334155', marginBottom: '0.5rem' }}>Pack Choisi</label>
                <select
                    name="pack"
                    value={formData.pack}
                    onChange={handleChange}
                    style={{
                        width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '1rem', background: '#F8FAFC'
                    }}
                >
                    <option value="Formation Initiale - 5000 FCFA">Pack Découverte - 5.000 FCFA</option>
                    <option value="Formation Avancée - 10000 FCFA">Pack Complet - 10.000 FCFA</option>
                    <option value="Boost E-Commerce IA">Boost E-Commerce IA</option>
                    <option value="Growth Hacking 360">Growth Hacking 360</option>
                </select>
            </div>

            {status === 'error' && (
                <div style={{ color: '#EF4444', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <AlertCircle size={16} /> {errorMessage}
                </div>
            )}

            <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                    marginTop: '1rem',
                    padding: '14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: status === 'sending' ? '#94A3B8' : '#2563EB',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'background 0.3s'
                }}
            >
                {status === 'sending' ? <><Loader2 className="spin" size={20} /> Envoi...</> : <><Send size={20} /> Valider l'inscription</>}
            </button>
            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </form>
    );
};

export default FormationRegistrationForm;
