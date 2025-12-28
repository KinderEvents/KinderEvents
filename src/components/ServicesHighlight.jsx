import React from 'react';
import { Target, MessageCircle, BarChart3, AppWindow } from 'lucide-react';

const ServicesHighlight = () => {
    const services = [
        {
            icon: <Target size={32} />,
            title: "Startégie Digital & Marketing",
            desc: "Acquisition de trafic qualifié et conversion. Facebook Ads, Google Ads & Funnels de vente.",
            color: "linear-gradient(135deg, #FF6B6B 0%, #EE5D5D 100%)"
        },
        {
            icon: <MessageCircle size={32} />,
            title: "Community Management",
            desc: "Animation de vos réseaux sociaux, création de contenu viral et gestion de votre e-réputation.",
            color: "linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)"
        },
        {
            icon: <BarChart3 size={32} />,
            title: "Audit & Consulting",
            desc: "Analyse approfondie de votre présence en ligne et recommandations stratégiques sur-mesure.",
            color: "linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)"
        },
        {
            icon: <AppWindow size={32} />,
            title: "Sites Web & Apps",
            desc: "Développement de plateformes modernes, rapides et orientées conversion (Shopify, WordPress, Code pur).",
            color: "linear-gradient(135deg, #FA709A 0%, #FEE140 100%)"
        }
    ];

    return (
        <section style={{ padding: '6rem 1rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Nos Expertises</h2>
                    <p style={{ fontSize: '1.2rem', opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
                        Des solutions concrètes pour accélérer votre croissance digitale.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {services.map((service, idx) => (
                        <div key={idx} style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '2rem',
                            borderRadius: '20px',
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                            className="service-card"
                        >
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: service.color,
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                color: 'white'
                            }}>
                                {service.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>{service.title}</h3>
                            <p style={{ lineHeight: '1.6', opacity: 0.8 }}>{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesHighlight;
