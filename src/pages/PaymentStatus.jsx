import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowRight, Home } from 'lucide-react';

const PaymentStatus = ({ type }) => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const isSuccess = type === 'success';

    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: '#F8FAFC'
        }}>
            <div style={{
                maxWidth: '500px',
                width: '100%',
                background: 'white',
                padding: '3rem',
                borderRadius: '24px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                textAlign: 'center'
            }}>
                <div style={{ marginBottom: '2rem' }}>
                    {isSuccess ? (
                        <CheckCircle size={80} color="#10B981" style={{ margin: '0 auto' }} />
                    ) : (
                        <XCircle size={80} color="#EF4444" style={{ margin: '0 auto' }} />
                    )}
                </div>

                <h1 style={{ fontSize: '2rem', color: '#0F172A', marginBottom: '1rem' }}>
                    {isSuccess ? 'Paiement Réussi !' : 'Paiement Annulé'}
                </h1>

                <p style={{ color: '#64748B', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                    {isSuccess
                        ? 'Votre transaction a été confirmée. Vous recevrez un email de confirmation sous peu avec vos accès.'
                        : 'Le processus de paiement a été interrompu. Aucun montant n\'a été débité de votre compte.'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Link to="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        padding: '14px',
                        background: isSuccess ? '#2563EB' : '#0F172A',
                        color: 'white',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        transition: 'transform 0.2s'
                    }}>
                        <Home size={20} /> Retour à l'accueil
                    </Link>

                    {!isSuccess && (
                        <Link to="/formation" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            padding: '14px',
                            background: 'transparent',
                            color: '#2563EB',
                            border: '1px solid #2563EB',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}>
                            Réessayer <ArrowRight size={20} />
                        </Link>
                    )}
                </div>

                {token && (
                    <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: '#CBD5E1' }}>
                        ID Transaction: {token}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PaymentStatus;
