import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, Award, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';

const TicketVerify = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useState(new URLSearchParams(window.location.search));
    const ticketRef = useRef(null);

    useEffect(() => {
        fetchTicket();
    }, [id]);

    // Auto-download trigger
    useEffect(() => {
        if (ticket && ticketRef.current && searchParams.get('auto_down') === 'true') {
            // Small delay to ensure rendering is complete
            setTimeout(() => {
                downloadTicket();
            }, 1500);
        }
    }, [ticket]);

    const fetchTicket = async () => {
        try {
            const response = await fetch(`/api/verify-ticket?id=${id}`);
            const result = await response.json();

            if (result.success) {
                setTicket(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    const downloadTicket = async () => {
        if (!ticketRef.current) return;

        try {
            // Show feedback
            const btn = document.querySelector('.download-btn-action');
            if (btn) btn.innerText = "Génération en cours...";

            // Wait a bit for images to load if needed
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(ticketRef.current, {
                backgroundColor: '#1E293B',
                scale: 2,
                useCORS: true,
                logging: false,
                allowTaint: true
            });

            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = image;
            link.download = `VisionR-Ticket-${ticket.full_name ? ticket.full_name.replace(/\s+/g, '_') : 'Invite'}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            if (btn) {
                btn.innerHTML = `<div style="display:flex; align-items:center; gap:10px;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg> Télécharger mon Ticket</div>`;
            }

        } catch (err) {
            console.error("Download failed", err);
            alert("Le téléchargement automatique a échoué. Vous pouvez faire une capture d'écran du ticket.");
            const btn = document.querySelector('.download-btn-action');
            if (btn) btn.innerText = "Réessayer le téléchargement";
        }
    };

    if (loading) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0F172A',
                color: 'white'
            }}>
                <Loader2 className="spin" size={48} color="#D4AF37" />
                <style>{`
                    .spin { animation: spin 1s linear infinite; }
                    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                `}</style>
            </div>
        );
    }

    const isValid = ticket && ticket.status === 'inscription_confirmee';

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0F172A',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            fontFamily: 'Helvetica Neue, sans-serif'
        }}>
            <motion.div
                ref={ticketRef}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    background: '#1E293B',
                    maxWidth: '400px',
                    width: '100%',
                    borderRadius: '24px',
                    padding: '40px 20px',
                    textAlign: 'center',
                    border: '1px solid #334155',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    position: 'relative'
                }}
            >
                {/* Status Icon */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px'
                }}>
                    {error ? (
                        <div style={{ background: '#FECACA', padding: '20px', borderRadius: '50%' }}>
                            <XCircle size={64} color="#EF4444" />
                        </div>
                    ) : isValid ? (
                        <div style={{ background: '#D1FAE5', padding: '20px', borderRadius: '50%' }}>
                            <CheckCircle size={64} color="#10B981" />
                        </div>
                    ) : (
                        <div style={{ background: '#FEF3C7', padding: '20px', borderRadius: '50%' }}>
                            <XCircle size={64} color="#F59E0B" />
                        </div>
                    )}
                </div>

                {/* Status Text */}
                <h1 style={{
                    color: error ? '#EF4444' : isValid ? '#10B981' : '#F59E0B',
                    margin: '0 0 10px 0',
                    fontSize: '28px',
                    fontWeight: '800',
                    textTransform: 'uppercase'
                }}>
                    {error ? 'TICKET INCONNU' : isValid ? 'TICKET VALIDE' : 'EN ATTENTE'}
                </h1>

                {!error && ticket && (
                    <div style={{ marginTop: '30px' }}>
                        <div style={{
                            background: '#0F172A',
                            padding: '20px',
                            borderRadius: '16px',
                            border: '1px solid #334155'
                        }}>
                            <div style={{ fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '5px' }}>
                                Participant
                            </div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#F1F5F9', marginBottom: '20px' }}>
                                {ticket.full_name}
                            </div>

                            <div style={{ fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '5px' }}>
                                Formation
                            </div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#D4AF37' }}>
                                {ticket.formation_type}
                            </div>

                            <div style={{ borderTop: '1px dashed #334155', margin: '20px 0', paddingTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '10px', color: '#64748B' }}>DATE VALIDATION</div>
                                    <div style={{ color: '#94A3B8', fontWeight: '600' }}>
                                        {new Date(ticket.confirmed_at || ticket.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '10px', color: '#64748B' }}>ID UNIQUE</div>
                                    <div style={{ color: '#94A3B8', fontWeight: '600', fontFamily: 'monospace' }}>
                                        #{ticket.id.toString().padStart(6, '0')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isValid && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '20px', color: '#10B981', fontSize: '14px', fontWeight: '600' }}>
                                <Award size={18} />
                                <span>Membre Officiel Certifié</span>
                            </div>
                        )}
                    </div>
                )}

                <div style={{ marginTop: '40px', color: '#475569', fontSize: '12px' }}>
                    Système de vérification VisionR
                </div>
            </motion.div>

            {/* Download Action */}
            {isValid && (
                <button
                    className="download-btn-action"
                    onClick={downloadTicket}
                    style={{
                        marginTop: '30px',
                        background: '#D4AF37',
                        color: '#0F172A',
                        border: 'none',
                        padding: '16px 32px',
                        borderRadius: '50px',
                        fontSize: '16px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        boxShadow: '0 10px 25px -5px rgba(212, 175, 55, 0.4)',
                        transition: 'transform 0.2s',
                        width: '100%',
                        maxWidth: '300px'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Download size={20} />
                    Télécharger mon Ticket
                </button>
            )}
        </div>
    );
};

export default TicketVerify;
