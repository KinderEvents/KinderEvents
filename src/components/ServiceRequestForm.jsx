import React, { useState } from 'react';
// import emailjs from '@emailjs/browser';
import { supabase } from '../config/supabaseClient';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceRequestForm = ({ selectedService, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        whatsapp: '',
        email: '',
        service: selectedService || 'Sur Mesure',
        budget: 'Indéfini'
    });
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');

    React.useEffect(() => {
        if (selectedService) {
            setFormData(prev => ({ ...prev, service: selectedService }));
        }
    }, [selectedService]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        try {
            // Envoi API Sécurisée (Backend)
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: formData.name,
                    company_name: formData.company,
                    email: formData.email,
                    whatsapp: formData.whatsapp,
                    service_type: formData.service,
                    budget_range: formData.budget
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Erreur API');
            }

            setStatus('success');
        } catch (error) {
            console.error('Submission Error:', error);
            setStatus('error');
            setErrorMessage('Une erreur est survenue. Vérifiez votre connexion.');
        }
    };

    if (status === 'success') {
        // Auto-close modal after 3 seconds
        React.useEffect(() => {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }, [onClose]);

        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '2rem' }}>
                <CheckCircle size={64} color="#2563EB" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#0F172A' }}>Demande Reçue !</h3>
                <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
                    Merci {formData.name}. Nous avons bien noté votre intérêt pour le service <strong>{formData.service}</strong>.
                </p>
                <p style={{ color: '#475569' }}>Un expert VisionR va vous recontacter très vite.</p>
                <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: '1rem' }}>Cette fenêtre se fermera automatiquement...</p>
                <button onClick={onClose} style={{ marginTop: '1.5rem', padding: '10px 20px', background: '#0F172A', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Fermer maintenant</button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#0F172A', textAlign: 'center' }}>Démarrer un Projet</h3>
            <p style={{ textAlign: 'center', color: '#64748B', fontSize: '0.9rem' }}>Parlez-nous de vos besoins.</p>

            <input type="text" name="name" required placeholder="Votre Nom" value={formData.name} onChange={handleChange} style={inputStyle} />
            <input type="text" name="company" placeholder="Nom de votre Entreprise" value={formData.company} onChange={handleChange} style={inputStyle} />
            <div style={{ display: 'flex', gap: '10px' }}>
                <input type="tel" name="whatsapp" required placeholder="WhatsApp" value={formData.whatsapp} onChange={handleChange} style={{ ...inputStyle, flex: 1 }} />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={{ ...inputStyle, flex: 1 }} />
            </div>

            <select name="service" value={formData.service} onChange={handleChange} style={{ ...inputStyle, background: '#F8FAFC' }}>
                <option value="Vitrine Simple">Site Vitrine Simple</option>
                <option value="Vitrine Pro">Site Vitrine Pro</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="Start App">App Mobile Starter</option>
                <option value="Business App">App Business</option>
                <option value="Sur Mesure">Solution Sur Mesure</option>
                <option value="Growth Starter">Community Management</option>
                <option value="Growth Empire">Pack Empire (Growth)</option>
            </select>

            <select name="budget" value={formData.budget} onChange={handleChange} style={{ ...inputStyle, background: '#F8FAFC' }}>
                <option value="Indéfini">Budget non défini</option>
                <option value="< 500k">Moins de 500.000 FCFA</option>
                <option value="500k - 1M">500.000 - 1M FCFA</option>
                <option value="1M - 5M">1M - 5M FCFA</option>
                <option value="+ 5M">Plus de 5M FCFA</option>
            </select>

            {status === 'error' && <div style={{ color: '#EF4444', fontSize: '0.9rem' }}><AlertCircle size={16} /> {errorMessage}</div>}

            <button type="submit" disabled={status === 'sending'} style={buttonStyle}>
                {status === 'sending' ? <Loader2 className="spin" /> : <><Send size={18} /> Envoyer ma demande</>}
            </button>
            <style>{` .spin { animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } `}</style>
        </form>
    );
};

const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.95rem' };
const buttonStyle = { padding: '14px', borderRadius: '8px', border: 'none', background: '#2563EB', color: 'white', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' };

export default ServiceRequestForm;
