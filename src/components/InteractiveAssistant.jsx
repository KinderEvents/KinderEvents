import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, CheckCircle, ArrowRight, Briefcase, Building, Rocket } from 'lucide-react';
import '../styles/InteractiveAssistant.css';

const InteractiveAssistant = () => {
    const [step, setStep] = useState(0);
    const [typing, setTyping] = useState(true);
    const [displayText, setDisplayText] = useState('');
    const [formData, setFormData] = useState({
        visitorType: '',
        services: [],
        name: '',
        contact: '',
        projectDetails: ''
    });
    const [sending, setSending] = useState(false);
    const [completed, setCompleted] = useState(false);

    // Script de la conversation
    const script = [
        {
            id: 0,
            text: "Bonjour ! Je suis l'assistant intelligent de VisionR Studio. Je suis là pour propulser votre business. Pour commencer, quel est votre profil ?",
            options: [
                { label: "Entrepreneur", icon: <User size={18} />, value: "entrepreneur" },
                { label: "Entreprise / PME", icon: <Building size={18} />, value: "company" },
                { label: "Créateur de contenu", icon: <Rocket size={18} />, value: "creator" }
            ]
        },
        {
            id: 1,
            text: "Enchanté ! Pour dominer votre marché, quels leviers souhaitez-vous activer ? (Plusieurs choix possibles)",
            type: "multi-select",
            options: [
                "Stratégie & Marketing Digital",
                "Community Management",
                "Création Site Web / App",
                "Audit & Consulting",
                "Publicité (Ads)",
                "Automatisation IA"
            ]
        },
        {
            id: 2,
            text: "Excellent choix. Ces leviers sont puissants. Dites-moi, quel est le nom de votre projet ou entreprise ?",
            type: "input",
            field: "projectDetails",
            placeholder: "Nom de votre projet..."
        },
        {
            id: 3,
            text: "Parfait. Dernière étape pour recevoir votre audit express ou plan d'action : comment pouvons-nous vous recontacter ?",
            type: "contact-form"
        }
    ];

    const currentScript = script[step];

    // Effet machine à écrire
    useEffect(() => {
        if (completed) return;

        setTyping(true);
        setDisplayText('');
        let i = 0;
        const text = currentScript.text;
        const speed = 30; // Vitesse de frappe

        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
                setTyping(false);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [step, completed]);

    const handleOptionClick = (value) => {
        setFormData({ ...formData, visitorType: value });
        nextStep();
    };

    const handleServiceToggle = (service) => {
        const currentServices = formData.services;
        if (currentServices.includes(service)) {
            setFormData({ ...formData, services: currentServices.filter(s => s !== service) });
        } else {
            setFormData({ ...formData, services: [...currentServices, service] });
        }
    };

    const handleInputChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const nextStep = () => {
        if (step < script.length - 1) {
            setStep(step + 1);
        }
    };

    const submitLead = async () => {
        setSending(true);
        try {
            // Préparation des données pour l'API
            const payload = {
                visitorType: formData.visitorType,
                services: formData.services,
                contactInfo: {
                    name: formData.name,
                    email: formData.contact.includes('@') ? formData.contact : '',
                    whatsapp: !formData.contact.includes('@') ? formData.contact : '',
                    projectDetails: formData.projectDetails
                }
            };

            const response = await fetch('/api/submit-lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setCompleted(true);
            } else {
                alert("Une erreur est survenue. Veuillez réessayer.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Erreur de connexion.");
        } finally {
            setSending(false);
        }
    };

    if (completed) {
        return (
            <div className="interactive-assistant-container">
                <div className="assistant-header">
                    <div className="assistant-avatar">
                        <CheckCircle color="white" size={32} />
                    </div>
                    <h2>Message Reçu ! 🚀</h2>
                    <p>Merci {formData.name}, nous avons bien reçu vos informations.</p>
                    <p>Un expert VisionR va analyser votre demande et vous recontacter très rapidement.</p>

                    <div style={{ marginTop: '2rem' }}>
                        <p className="text-muted">En attendant, vous pouvez :</p>
                        <div className="response-options">
                            <a href="https://calendly.com/visionr-studio" target="_blank" rel="noopener noreferrer" className="option-btn" style={{ justifyContent: 'center' }}>
                                Prendre RDV directement
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="interactive-assistant-container">

            <div className="assistant-header">
                <div className="assistant-avatar">
                    <Bot color="white" size={32} />
                </div>
                {!typing && <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Assistant VisionR (En ligne)</div>}
            </div>

            <div className="chat-interface">
                <div className="message-bubble">
                    {displayText}
                    {typing && <span className="typing-cursor"></span>}
                </div>

                {!typing && (
                    <div className="interaction-area">

                        {/* Step 0: User Type */}
                        {currentScript.id === 0 && (
                            <div className="response-options">
                                {currentScript.options.map((opt, idx) => (
                                    <button key={idx} className="option-btn" onClick={() => handleOptionClick(opt.value)}>
                                        {opt.icon}
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Step 1: Services */}
                        {currentScript.id === 1 && (
                            <div className="service-selection">
                                <div className="service-selector">
                                    {currentScript.options.map((service, idx) => (
                                        <button
                                            key={idx}
                                            className={`service-chip ${formData.services.includes(service) ? 'selected' : ''}`}
                                            onClick={() => handleServiceToggle(service)}
                                        >
                                            {service}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    className="submit-btn"
                                    style={{ marginTop: '1.5rem', width: '100%' }}
                                    onClick={nextStep}
                                    disabled={formData.services.length === 0}
                                >
                                    Valider ces choix <ArrowRight size={16} style={{ display: 'inline', marginLeft: '5px' }} />
                                </button>
                            </div>
                        )}

                        {/* Step 2: Project Name */}
                        {currentScript.id === 2 && (
                            <div className="chat-input-group">
                                <input
                                    type="text"
                                    className="chat-input"
                                    placeholder={currentScript.placeholder}
                                    value={formData.projectDetails}
                                    onChange={(e) => handleInputChange(e, 'projectDetails')}
                                    onKeyDown={(e) => e.key === 'Enter' && nextStep()}
                                    autoFocus
                                />
                                <button className="submit-btn" onClick={nextStep}>Continuer</button>
                            </div>
                        )}

                        {/* Step 3: Contact Form */}
                        {currentScript.id === 3 && (
                            <div className="chat-input-group">
                                <input
                                    type="text"
                                    className="chat-input"
                                    placeholder="Votre Nom complet"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange(e, 'name')}
                                />
                                <input
                                    type="text"
                                    className="chat-input"
                                    placeholder="Email ou WhatsApp"
                                    value={formData.contact}
                                    onChange={(e) => handleInputChange(e, 'contact')}
                                />
                                <button
                                    className="submit-btn"
                                    onClick={submitLead}
                                    disabled={sending || !formData.name || !formData.contact}
                                >
                                    {sending ? 'Envoi en cours...' : 'Recevoir mon plan d\'action 🚀'}
                                </button>
                            </div>
                        )}

                    </div>
                )}
            </div>

        </div>
    );
};

export default InteractiveAssistant;
