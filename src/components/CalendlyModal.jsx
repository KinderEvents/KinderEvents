import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const CalendlyModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Load Calendly script dynamically if not present
            const script = document.createElement("script");
            script.src = "https://assets.calendly.com/assets/external/widget.js";
            script.async = true;
            document.body.appendChild(script);
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(5px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }} onClick={onClose}>
            <div style={{
                width: '90%',
                maxWidth: '1000px',
                height: '80vh',
                background: 'white',
                borderRadius: '20px',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>

                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: '#F1F5F9',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10
                }}>
                    <X size={20} color="#0F172A" />
                </button>

                <div
                    className="calendly-inline-widget"
                    data-url="https://calendly.com/visionr-studio?hide_gdpr_banner=1"
                    style={{ minWidth: '320px', height: '100%' }}
                />
            </div>
        </div>
    );
};

export default CalendlyModal;
