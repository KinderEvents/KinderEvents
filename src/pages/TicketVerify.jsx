import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, Award, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';

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

            // Wait a bit for images/qr to load if needed
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(ticketRef.current, {
                backgroundColor: '#1E293B',
                scale: 2,
                useCORS: true,
                logging: false,
                allowTaint: true
            });

            const image = canvas.toDataURL("image/png");

            // Mobile-friendly download approach
            const link = document.createElement('a');
            link.href = image;
            link.download = `VisionR-Ticket-${ticket.full_name ? ticket.full_name.replace(/\s+/g, '_') : 'Invite'}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            if (btn) {
                btn.innerHTML = `<div style="display:flex; align-items:center; justifyContent:center; gap:10px;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg> Télécharger mon Ticket</div>`;
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
    const qrValue = `https://visionr-studio.vercel.app/verify/${id}`;

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
                    maxWidth: '350px',
                    width: '100%',
                    borderRadius: '24px',
                    padding: '30px 20px',
                    textAlign: 'center',
                    border: '1px solid #334155',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute', top: '-50px', left: '-50px', width: '100px', height: '100px',
                    background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%'
                }} />
                <div style={{
                    position: 'absolute', bottom: '-50px', right: '-50px', width: '100px', height: '100px',
                    background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%'
                }} />

                {/* Header */}
                <div style={{ marginBottom: '20px', borderBottom: '1px dashed #334155', paddingBottom: '20px' }}>
                    <h2 style={{ color: '#D4AF37', margin: 0, fontSize: '18px', textTransform: 'uppercase', letterSpacing: '2px' }}>VisionR Event</h2>
                    <p style={{ color: '#64748B', fontSize: '12px', margin: '5px 0 0 0' }}>Billet Officiel</p>
                </div>

                {!error && ticket && (
                    <div>
                        {/* QR Code Section */}
                        <div style={{
                            background: 'white',
                            padding: '10px',
                            borderRadius: '12px',
                            display: 'inline-block',
                            marginBottom: '20px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            <QRCodeSVG
                                value={qrValue}
                                size={120}
                                level={"H"}
                                includeMargin={false}
                                fgColor={"#0F172A"}
                            />
                        </div>

                        {/* Valid Badge */}
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: isValid ? '#064E3B' : '#78350F',
                            color: isValid ? '#34D399' : '#FCD34D',
                            padding: '4px 12px',
                            borderRadius: '50px',
                            marginBottom: '20px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            border: `1px solid ${isValid ? '#059669' : '#B45309'}`
                        }}>
                            {isValid ? <CheckCircle size={14} style={{ marginRight: '5px' }} /> : <XCircle size={14} style={{ marginRight: '5px' }} />}
                            {isValid ? 'CONFIRMÉ' : 'EN ATTENTE'}
                        </div>

                        {/* Details */}
                        <div style={{ textAlign: 'left', padding: '0 10px' }}>
                            <div style={{ marginBottom: '15px' }}>
                                <div style={{ fontSize: '10px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px' }}>Participant</div>
                                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#F1F5F9' }}>{ticket.full_name}</div>
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <div style={{ fontSize: '10px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px' }}>Formation</div>
                                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#D4AF37' }}>{ticket.formation_type}</div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #334155', paddingTop: '15px', marginTop: '10px' }}>
                                <div>
                                    <div style={{ fontSize: '10px', color: '#64748B' }}>DATE</div>
                                    <div style={{ color: '#cbd5e1', fontWeight: '500', fontSize: '12px' }}>
                                        {new Date(ticket.confirmed_at || ticket.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '10px', color: '#64748B' }}>ID TICKET</div>
                                    <div style={{ color: '#cbd5e1', fontWeight: '500', fontFamily: 'monospace', fontSize: '12px' }}>
                                        #{ticket.id.toString().padStart(6, '0')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer Deco */}
                <div style={{
                    marginTop: '25px',
                    background: 'repeating-linear-gradient(45deg, #334155, #334155 10px, #1E293B 10px, #1E293B 20px)',
                    height: '10px',
                    width: '100%',
                    borderRadius: '4px',
                    opacity: 0.3
                }} />
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
