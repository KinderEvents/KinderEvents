import React, { useState } from 'react';
import { CreditCard, Loader2, Smartphone } from 'lucide-react';

/**
 * Bouton de paiement PayDunya avec options Orange Money et Wave
 */
const PaymentButton = ({
    amount,
    packName,
    customerData,
    onSuccess,
    onError,
    disabled = false
}) => {
    const [loading, setLoading] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null);

    const handlePayment = async (method) => {
        setLoading(true);
        setSelectedMethod(method);

        try {
            const response = await fetch('/api/payment/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: amount,
                    customer_name: customerData.name,
                    customer_email: customerData.email,
                    customer_phone: customerData.whatsapp,
                    pack_type: 'formation',
                    pack_name: packName,
                    description: `Inscription ${packName} via ${method}`
                })
            });

            if (!response.ok) {
                throw new Error(`Erreur serveur: ${response.status}`);
            }

            const data = await response.json();

            if (data.success && data.payment_url) {
                // Pour une meilleure expérience, on attend un tout petit peu
                setTimeout(() => {
                    window.location.href = data.payment_url;
                }, 500);
                if (onSuccess) onSuccess(data);
            } else {
                throw new Error(data.error || 'Erreur lors de la création du paiement');
            }

        } catch (error) {
            console.error('Erreur paiement:', error);
            setLoading(false);
            setSelectedMethod(null);
            if (onError) onError(error);
            alert(`Erreur: ${error.message}. Veuillez réessayer.`);
        }
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B', fontWeight: '500' }}>
                Choisissez votre mode de paiement :
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {/* Bouton Wave */}
                <button
                    onClick={() => handlePayment('Wave')}
                    disabled={disabled || loading}
                    style={{
                        padding: '16px 10px',
                        borderRadius: '12px',
                        border: '2px solid #D4F1FF',
                        background: selectedMethod === 'Wave' ? '#00A9E0' : 'white',
                        color: selectedMethod === 'Wave' ? 'white' : '#00A9E0',
                        fontWeight: '700',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s',
                        opacity: loading && selectedMethod !== 'Wave' ? 0.5 : 1
                    }}
                >
                    {loading && selectedMethod === 'Wave' ? (
                        <Loader2 size={24} className="spin" />
                    ) : (
                        <>
                            <img src="/assets/wave-logo.png" alt="Wave" style={{ height: '32px', objectFit: 'contain' }} />
                        </>
                    )}
                </button>

                {/* Bouton Orange Money */}
                <button
                    onClick={() => handlePayment('Orange Money')}
                    disabled={disabled || loading}
                    style={{
                        padding: '16px 10px',
                        borderRadius: '12px',
                        border: '2px solid #FFE5D4',
                        background: selectedMethod === 'Orange Money' ? '#FF6B00' : 'white',
                        color: selectedMethod === 'Orange Money' ? 'white' : '#FF6B00',
                        fontWeight: '700',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s',
                        opacity: loading && selectedMethod !== 'Orange Money' ? 0.5 : 1
                    }}
                >
                    {loading && selectedMethod === 'Orange Money' ? (
                        <Loader2 size={24} className="spin" />
                    ) : (
                        <>
                            <img src="/assets/om-logo.png" alt="Orange Money" style={{ height: '32px', objectFit: 'contain' }} />
                        </>
                    )}
                </button>
            </div>

            <button
                onClick={() => handlePayment('Autre')}
                disabled={disabled || loading}
                style={{
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    background: '#F8FAFC',
                    color: '#64748B',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                }}
            >
                <CreditCard size={18} /> Autres (Carte, Wizall...)
            </button>

            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default PaymentButton;
