import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Zap, Building, Smartphone, Globe, ArrowRight } from 'lucide-react';
import ServiceModal from './ServiceModal';
import '../styles/BentoPricing.css';

const pricingData = {
    WEB: [
        {
            title: "Vitrine Simple",
            price: "150 000",
            period: "FCFA",
            desc: "Présence Essentielle",
            features: ["5 Pages", "Design Unique", "Responsive Mobile", "Formulaire Contact"],
            icon: Globe,
            highlight: false
        },
        {
            title: "Vitrine Pro",
            price: "250 000",
            period: "FCFA",
            desc: "Crédibilité Max",
            features: ["10 Pages + Blog", "SEO Avancé", "Newsletter", "Google Maps Intégré"],
            icon: Building,
            highlight: true
        },
        {
            title: "E-Commerce",
            price: "400 000",
            period: "FCFA",
            desc: "Vente en Ligne",
            features: ["Boutique 50 Produits", "Paiement Mobile Money", "Panel Admin", "Formation Incluse"],
            icon: Zap,
            highlight: false
        }
    ],
    APPS: [
        {
            title: "Start App",
            price: "300 000",
            period: "FCFA",
            desc: "Lancement Rapide",
            features: ["iOS & Android", "Interface Native", "Push Notifications", "Mise en ligne Store"],
            icon: Smartphone,
            highlight: false
        },
        {
            title: "Business App",
            price: "500 000",
            period: "FCFA",
            desc: "Gestion Complète",
            features: ["Comptes Clients", "Base de Données", "Paiements In-App", "Dashboard Admin"],
            icon: Building,
            highlight: true
        },
        {
            title: "Sur Mesure",
            price: "Devis",
            period: "",
            desc: "Innovation Totale",
            features: ["Architecture Complexe", "Géolocalisation Live", "Intelligence Artificielle", "Maintenance Dedicacée"],
            icon: Star,
            highlight: false
        }
    ],
    GROWTH: [
        {
            title: "Starter",
            price: "300 000",
            period: "FCFA/mois",
            desc: "Community Management",
            features: ["3 Posts / semaine", "Modération", "Calendrier Éditorial", "Rapport Mensuel"],
            icon: Zap,
            highlight: false
        },
        {
            title: "Growth",
            price: "600 000",
            period: "FCFA/mois",
            desc: "Ads & Content",
            features: ["Gestion Publicité (Ads)", "2 Vidéos TikTok/Reels", "Copywriting Avancé", "Retargeting"],
            icon: Zap,
            highlight: false
        },
        {
            title: "PACK EMPIRE",
            price: "Sur Devis",
            period: "Custom",
            desc: "Premium Scale",
            subtext: "De 1M à 10M+ FCFA",
            features: ["Stratégie 360°", "Campagnes Internationales", "Équipe Dédiée", "Rapport ROI Temps Réel"],
            icon: Star,
            highlight: true,
            badge: "RECOMMANDÉ PAR VISIONR"
        }
    ]
};

const BentoPricing = () => {
    const [activeTab, setActiveTab] = useState('WEB');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState('');

    const handleOpenModal = (serviceTitle) => {
        setSelectedService(serviceTitle);
        setIsModalOpen(true);
    };

    return (
        <section className="pricing-section container section-padding" id="pricing">
            <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedService={selectedService} />

            <div className="text-center mb-12">
                <h2 className="section-title">Nos Offres</h2>
                <p style={{ color: '#64748B', fontSize: '1.2rem' }}>Choisissez l'ambition de votre croissance.</p>
            </div>

            {/* Smart Switcher */}
            <div className="pricing-tabs">
                {Object.keys(pricingData).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pricing-tab-btn ${activeTab === tab ? 'active' : ''}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Grid */}
            <div className="pricing-grid">
                <AnimatePresence mode='wait'>
                    {pricingData[activeTab].map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="glass-panel"
                            style={{
                                padding: '2.5rem',
                                background: 'white',
                                border: item.highlight ? '2px solid #2563EB' : '1px solid #E2E8F0',
                                position: 'relative',
                                transformStyle: 'preserve-3d',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                            whileHover={{ scale: 1.02 }}
                        >
                            {item.badge && (
                                <div style={{
                                    position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)',
                                    background: '#2563EB', color: 'white', padding: '6px 16px', borderRadius: '30px',
                                    fontSize: '0.8rem', fontWeight: '800', letterSpacing: '0.5px',
                                    boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)'
                                }}>
                                    {item.badge}
                                </div>
                            )}

                            <div className="card-header" style={{ marginBottom: '2rem', textAlign: 'left' }}>
                                <item.icon size={32} color={item.highlight ? '#2563EB' : '#0F172A'} style={{ marginBottom: '1rem' }} />
                                <h3 style={{ fontSize: '1.5rem', color: '#0F172A', marginBottom: '0.5rem' }}>{item.title}</h3>
                                <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{item.desc}</p>

                                <div className="price-block">
                                    <span style={{
                                        fontSize: '2rem',
                                        fontWeight: '800',
                                        background: 'linear-gradient(135deg, #0F172A 0%, #2563EB 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}>
                                        {item.price}
                                    </span>
                                    <span style={{ color: '#94A3B8', fontSize: '0.9rem', marginLeft: '5px' }}>{item.period}</span>
                                </div>
                                {item.subtext && <p style={{ color: '#2563EB', fontSize: '0.85rem', marginTop: '5px', fontWeight: '600' }}>{item.subtext}</p>}
                            </div>

                            <ul className="features-list" style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
                                {item.features.map((feat, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: '#334155' }}>
                                        <div style={{ background: '#EFF6FF', borderRadius: '50%', padding: '4px' }}>
                                            <Check size={14} color="#2563EB" />
                                        </div>
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleOpenModal(item.title)}
                                className={item.highlight ? 'btn-primary' : 'btn-secondary'}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    borderRadius: '12px',
                                    border: item.highlight ? 'none' : '1px solid #E2E8F0',
                                    background: item.highlight ? 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)' : 'white',
                                    color: item.highlight ? 'white' : '#0F172A',
                                    fontWeight: '600',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'all 0.2s',
                                    cursor: 'pointer'
                                }}>
                                Choisir ce pack <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default BentoPricing;
