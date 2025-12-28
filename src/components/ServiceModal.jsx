import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceRequestForm from './ServiceRequestForm';

const ServiceModal = ({ isOpen, onClose, selectedService }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                    background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(5px)', zIndex: 99999,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
                }} onClick={onClose}>
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        style={{
                            width: '100%', maxWidth: '500px', background: 'white', borderRadius: '20px',
                            position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            maxHeight: '90vh', overflowY: 'auto', padding: '2rem'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button onClick={onClose} style={{
                            position: 'absolute', top: '15px', right: '15px', background: '#F1F5F9',
                            border: 'none', borderRadius: '50%', width: '32px', height: '32px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10
                        }}>
                            <X size={18} color="#64748B" />
                        </button>

                        <ServiceRequestForm selectedService={selectedService} onClose={onClose} />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ServiceModal;
