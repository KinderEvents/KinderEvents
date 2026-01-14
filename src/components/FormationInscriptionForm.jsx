import React, { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FormationInscriptionForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        formation: 'Formation A'
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        try {
            const response = await fetch('/api/register-formation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Erreur lors de l\'inscription');
            }

            console.log('✅ Inscription réussie:', result);
            setStatus('success');

        } catch (error) {
            console.error('❌ Erreur inscription:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Une erreur est survenue. Veuillez réessayer.');
        }
    };

    // Success Screen
    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '2rem' }}
            >
                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <CheckCircle size={64} color="#10B981" />
                </div>

                <h3 style={{ fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>
                    ✅ Votre demande de participation a bien été enregistrée
                </h3>

                <div style={{
                    background: '#EFF6FF',
                    border: '2px solid #2563EB',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    marginBottom: '1.5rem'
                }}>
                    <p style={{ color: '#1E40AF', fontWeight: '600', margin: 0 }}>
                        📩 Les instructions de paiement vous ont été envoyées par email
                    </p>
                </div>

                <div style={{
                    background: '#F8FAFC',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    textAlign: 'left',
                    marginBottom: '1.5rem'
                }}>
                    <h4 style={{ color: '#0F172A', marginTop: 0 }}>Prochaines étapes :</h4>
                    <ol style={{ color: '#475569', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                        <li>Consultez votre email pour les instructions de paiement</li>
                        <li>Effectuez le paiement via Wave ou Orange Money</li>
                        <li>Envoyez la preuve de paiement par WhatsApp ou email</li>
                        <li>Votre inscription sera confirmée sous 24h</li>
                    </ol>
                </div>

                <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Vous n'avez pas reçu l'email ? Vérifiez vos spams ou contactez-nous sur WhatsApp.
                </p>

                <button
                    onClick={onClose}
                    style={{
                        padding: '12px 24px',
                        background: '#2563EB',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    Fermer
                </button>
            </motion.div>
        );
    }

    // Form Screen
    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#0F172A', textAlign: 'center', marginBottom: '0.5rem' }}>
                Inscription à la Formation
            </h3>
            <p style={{ textAlign: 'center', color: '#64748B', marginBottom: '1rem', fontSize: '0.9rem' }}>
                Remplissez ce formulaire pour réserver votre place
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#334155', marginBottom: '0.5rem' }}>
                        Prénom *
                    </label>
                    <input
                        type="text"
                        name="prenom"
                        required
                        value={formData.prenom}
                        onChange={handleChange}
                        placeholder="Votre prénom"
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #CBD5E1',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#334155', marginBottom: '0.5rem' }}>
                        Nom *
                    </label>
                    <input
                        type="text"
                        name="nom"
                        required
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #CBD5E1',
                            fontSize: '1rem'
                        }}
                    />
                </div>
            </div>

            <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#334155', marginBottom: '0.5rem' }}>
                    Email *
                </label>
                <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '1rem'
                    }}
                />
            </div>

            <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#334155', marginBottom: '0.5rem' }}>
                    Téléphone / WhatsApp *
                </label>
                <input
                    type="tel"
                    name="telephone"
                    required
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="+221 77 XXX XX XX"
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '1rem'
                    }}
                />
            </div>

            <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#334155', marginBottom: '0.5rem' }}>
                    Formation Choisie *
                </label>
                <select
                    name="formation"
                    value={formData.formation}
                    onChange={handleChange}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '1rem',
                        background: '#F8FAFC'
                    }}
                >
                    <option value="Formation A">Formation A - 5 000 FCFA</option>
                    <option value="Formation B">Formation B - 10 000 FCFA</option>
                </select>
            </div>

            {status === 'error' && (
                <div style={{
                    color: '#EF4444',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#FEF2F2',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #FCA5A5'
                }}>
                    <AlertCircle size={18} />
                    {errorMessage}
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
                {status === 'sending' ? (
                    <>
                        <Loader2 className="spin" size={20} />
                        Envoi en cours...
                    </>
                ) : (
                    <>
                        <Send size={20} />
                        Valider l'inscription
                    </>
                )}
            </button>

            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </form>
    );
};

export default FormationInscriptionForm;
