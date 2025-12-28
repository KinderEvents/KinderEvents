import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '../config/supabaseClient';
import '../styles/Newsletter.css';

const NewsletterSignup = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Appel API Sécurisé (Backend Vercel)
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Erreur API');
            }

            setStatus('success');
            setEmail('');
        } catch (error) {
            console.error('Subscription error:', error);
            setStatus('error');
            alert(`Une erreur est survenue lors de l'inscription.`);
        }
    };

    return (
        <div className="newsletter-wrapper">
            <div className="newsletter-content">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: '#2563EB' }}>
                    <Mail size={48} strokeWidth={1.5} />
                </div>
                <h3 className="newsletter-title">Rejoignez le cercle VisionR</h3>
                <p className="newsletter-text">
                    Recevez nos analyses exclusives, guides pratiques et l'actualité de l'IA sans jargon. Directement dans votre boîte mail.
                </p>

                {status === 'success' ? (
                    <div className="newsletter-success">
                        <CheckCircle size={20} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '8px' }} />
                        Inscription validée ! À très vite.
                    </div>
                ) : (
                    <form onSubmit={handleSubscribe} className="newsletter-form">
                        <input
                            type="email"
                            placeholder="votre@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="newsletter-input"
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="newsletter-btn"
                        >
                            {status === 'loading' ? (
                                <Loader2 size={20} className="animate-spin" />
                            ) : (
                                <>S'inscrire <ArrowRight size={18} style={{ marginLeft: '8px' }} /></>
                            )}
                        </button>
                    </form>
                )}

                {status === 'error' && (
                    <p className="newsletter-error">Une erreur est survenue. Réessayez.</p>
                )}
            </div>
        </div>
    );
};

export default NewsletterSignup;
