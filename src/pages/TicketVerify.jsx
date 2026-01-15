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
        try {
            // Show feedback
            const btn = document.querySelector('.download-btn-action');
            if (btn) btn.innerText = "Génération PDF...";

            // Dynamically import jsPDF to avoid SSR issues if any
            const { jsPDF } = await import('jspdf');

            // Create PDF (A5 format is good for tickets, or stick to A4)
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a5'
            });

            // --- Background & Styling ---
            doc.setFillColor(15, 23, 42); // #0F172A (Dark Blue)
            doc.rect(0, 0, 148, 210, 'F');

            doc.setFillColor(30, 41, 59); // #1E293B (Lighter Blue Card)
            doc.roundedRect(14, 30, 120, 150, 5, 5, 'F');

            // --- Header ---
            doc.setTextColor(212, 175, 55); // #D4AF37 (Gold)
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text("VISIONR EVENT", 74, 50, { align: 'center' });

            doc.setTextColor(148, 163, 184); // #94A3B8 (Slate 400)
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text("BILLET OFFICIEL", 74, 58, { align: 'center' });

            // --- QR Code ---
            // We use the existing canvas or create a new one for the QR
            const qrCanvas = document.querySelector("canvas");
            if (qrCanvas) {
                const qrDataUrl = qrCanvas.toDataURL("image/png");
                doc.addImage(qrDataUrl, 'PNG', 49, 70, 50, 50);
            }

            // --- Status Badge ---
            if (isValid) {
                doc.setFillColor(6, 78, 59); // #064E3B (Green bg)
                doc.setDrawColor(5, 150, 105); // #059669 (Green border)
                doc.roundedRect(49, 125, 50, 10, 5, 5, 'FD');

                doc.setTextColor(52, 211, 153); // #34D399 (Green text)
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.text("CONFIRMÉ", 74, 131, { align: 'center' });
            }

            // --- Details Box ---
            // doc.setDrawColor(51, 65, 85);
            // doc.line(24, 145, 124, 145);

            doc.setTextColor(148, 163, 184); // Label color
            doc.setFontSize(8);
            doc.text("PARTICIPANT", 24, 155);

            doc.setTextColor(241, 245, 249); // Value color (White)
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(ticket.full_name, 24, 162);

            doc.setTextColor(148, 163, 184);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.text("FORMATION", 24, 175);

            doc.setTextColor(212, 175, 55); // Gold
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text(ticket.formation_type, 24, 182);

            // --- Footer Info ---
            doc.setDrawColor(51, 65, 85);
            doc.line(24, 190, 124, 190);

            doc.setTextColor(148, 163, 184);
            doc.setFontSize(8);
            doc.text(`DATE: ${new Date(ticket.confirmed_at || ticket.created_at).toLocaleDateString()}`, 24, 196);
            doc.text(`ID: #${ticket.id.toString().padStart(6, '0')}`, 124, 196, { align: 'right' });

            // --- Save ---
            doc.save(`VisionR-Ticket-${ticket.full_name.replace(/\s+/g, '_')}.pdf`);

            if (btn) {
                btn.innerHTML = `<div style="display:flex; align-items:center; justifyContent:center; gap:10px;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg> Télécharger mon Ticket</div>`;
            }

        } catch (err) {
            console.error("PDF Download failed", err);
            alert("Erreur lors de la génération du PDF. Veuillez réessayer.");
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
