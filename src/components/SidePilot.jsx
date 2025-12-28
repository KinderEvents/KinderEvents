import React, { useState, useEffect } from 'react';
import { MessageSquare, X, ChevronRight, Check, Send, Lock } from 'lucide-react';
import '../styles/SidePilot.css';

const SidePilot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLocked, setIsLocked] = useState(true);
    const [history, setHistory] = useState([]);
    const [userData, setUserData] = useState({ name: '', email: '', phone: '' });

    // Toggle Sidebar
    const toggleSidebar = () => setIsOpen(!isOpen);

    // Listen for global open event
    useEffect(() => {
        const handleOpenEvent = () => setIsOpen(true);
        window.addEventListener('openSidePilot', handleOpenEvent);
        return () => window.removeEventListener('openSidePilot', handleOpenEvent);
    }, []);

    const handleGateSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        setUserData(data);
        setIsLocked(false);

        setHistory([
            {
                type: 'bot',
                text: `Ravi de vous rencontrer, ${data.name}. Je suis votre stratège digital. Quel est votre objectif prioritaire ce mois-ci ?`,
                options: [
                    { label: "Gagner en Visibilité", value: "visibility" },
                    { label: "Augmenter mes Ventes", value: "sales" },
                    { label: "Digitaliser mon Activité", value: "tech" }
                ]
            }
        ]);

        // Mock API call
        // fetch('/api/submit-lead'...)
    };

    const handleOptionSelect = (option) => {
        const newHistory = [...history, { type: 'user', text: option.label }];
        setHistory(newHistory);
        setTimeout(() => processResponse(option), 500);
    };

    const processResponse = (option) => {
        let nextMessage = "";
        let nextOptions = [];
        let nextType = "options";

        if (option.value === 'visibility') {
            nextMessage = "La visibilité est la clé. Le Pack 'Vitrine Pro' (250k) est conçu pour ça. Voulez-vous voir les détails ?";
            nextOptions = [
                { label: "Voir Vitrine Pro", value: "web_pro" },
                { label: "Non, autre chose", value: "other" }
            ];
        } else if (option.value === 'sales') {
            nextMessage = "Parlons ROI. Le Pack 'Empire' (1M+) déploie une équipe complète pour vos ads. Quel est votre budget mensuel publicitaire actuel ?";
            nextOptions = [
                { label: "< 500k FCFA", value: "budget_low" },
                { label: "> 1M FCFA", value: "budget_high" }
            ];
        } else if (option.value === 'tech') {
            nextMessage = "Applications ou E-commerce. Nous construisons du solide. Avez-vous un cahier des charges ?";
            nextOptions = [
                { label: "Oui", value: "specs_yes" },
                { label: "Non, aidez-moi", value: "specs_no" }
            ];
        } else {
            nextMessage = "J'ai noté. Un expert vous appellera au numéro fourni sous 24h.";
            nextType = "end";
        }

        const botMsg = { type: 'bot', text: nextMessage, options: nextOptions, inputType: nextType };
        setHistory(prev => [...prev, botMsg]);
    };

    return (
        <>
            <button
                className={`side-pilot-trigger ${isOpen ? 'hidden' : ''}`}
                onClick={toggleSidebar}
                style={{ background: '#2563EB' }} // Royal Blue
            >
                <div className="pilot-icon" style={{ background: 'white' }}>
                    <MessageSquare size={20} color="#2563EB" />
                </div>
                <span className="pilot-label">Assistant VisionR</span>
            </button>

            <div className={`side-pilot-overlay ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}></div>

            <div className={`side-pilot-container ${isOpen ? 'open' : ''}`} style={{ background: '#F8FAFC' }}>
                <div className="pilot-header" style={{ background: 'white', borderBottom: '1px solid #E2E8F0' }}>
                    <div className="pilot-identity">
                        <div className="pilot-avatar" style={{ background: '#2563EB', borderRadius: '8px' }}>V</div>
                        <div>
                            <h3 style={{ color: '#0F172A' }}>Assistant Expert</h3>
                            <span className="status-dot"></span> <small style={{ color: '#64748B' }}>En ligne</small>
                        </div>
                    </div>
                    <button className="close-btn" onClick={toggleSidebar}><X size={20} color="#64748B" /></button>
                </div>

                {isLocked ? (
                    <div className="gate-container" style={{ background: 'white' }}>
                        <div className="gate-icon" style={{ background: '#F1F5F9', color: '#0F172A' }}><Lock size={32} /></div>
                        <h3 style={{ color: '#0F172A' }}>Identification Requise</h3>
                        <p style={{ color: '#64748B' }}>Débloquez votre diagnostic gratuit.</p>

                        <form className="gate-form" onSubmit={handleGateSubmit}>
                            <div className="input-group">
                                <label style={{ color: '#334155' }}>Nom complet</label>
                                <input name="name" required style={{ border: '1px solid #E2E8F0', background: 'white' }} />
                            </div>
                            <div className="input-group">
                                <label style={{ color: '#334155' }}>Email</label>
                                <input name="email" type="email" required style={{ border: '1px solid #E2E8F0', background: 'white' }} />
                            </div>
                            <div className="input-group">
                                <label style={{ color: '#334155' }}>Téléphone</label>
                                <input name="phone" required style={{ border: '1px solid #E2E8F0', background: 'white' }} />
                            </div>
                            <button type="submit" className="unlock-btn" style={{ background: '#2563EB', color: 'white' }}>
                                Lancer l'analyse
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="pilot-messages" style={{ background: '#F8FAFC' }}>
                        {history.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.type}`}>
                                <div className="bubble" style={
                                    msg.type === 'bot'
                                        ? { background: 'white', border: '1px solid #E2E8F0', color: '#1E293B' }
                                        : { background: '#2563EB', color: 'white' }
                                }>
                                    {msg.text}
                                </div>
                                {msg.options && (
                                    <div className="options-grid">
                                        {msg.options.map((opt, i) => (
                                            <button key={i} className="option-chip"
                                                onClick={() => handleOptionSelect(opt)}
                                                style={{ background: 'white', border: '1px solid #CBD5E1', color: '#475569' }}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default SidePilot;
