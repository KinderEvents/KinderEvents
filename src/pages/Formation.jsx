import React, { useState } from 'react';
import { Check, X, Sparkles, Zap, TrendingUp, Users, Award, ChevronRight, XCircle, UserX, TrendingDown, Palette, ShoppingBag, Megaphone, CreditCard } from 'lucide-react';
import '../styles/formation.css';

const Formation = () => {
    const [selectedPack, setSelectedPack] = useState('pro');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        boutique: '',
        whatsapp: '',
        pack: 'pro'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const formMessage = `
Nouvelle inscription - BOOST E-COMMERCE IA

👤 Nom: ${formData.name}
🏪 Boutique: ${formData.boutique || 'Non spécifié'}
📱 WhatsApp: ${formData.whatsapp}
💼 Pack choisi: ${formData.pack === 'pro' ? 'Pack E-Commerce PRO (10 000 FCFA)' : 'Pack Standard (5 000 FCFA)'}
📅 Date: ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Dakar', dateStyle: 'full', timeStyle: 'short' })}
            `.trim();

            // Utiliser Web3Forms (gratuit, sans configuration)
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: 'e8f3c4a0-8b2d-4e9a-9f1c-7d6e5a4b3c2d',
                    subject: 'Nouvelle Inscription - BOOST E-COMMERCE IA',
                    from_name: formData.name,
                    email: 'eventskinder@gmail.com',
                    message: formMessage
                })
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Erreur lors de l\'envoi');
            }

            setSubmitStatus('success');
            setFormData({
                name: '',
                boutique: '',
                whatsapp: '',
                pack: 'pro'
            });

            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 2000);

        } catch (error) {
            console.error('Erreur:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="formation-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-background">
                    <div className="gradient-orb orb-1"></div>
                    <div className="gradient-orb orb-2"></div>
                    <div className="gradient-orb orb-3"></div>
                </div>

                <div className="hero-content container">
                    <div className="hero-badge">
                        <Sparkles size={16} />
                        <span>Formation Exclusive 2025</span>
                    </div>

                    <h1 className="hero-title">
                        VENDEURS EN LIGNE :<br />
                        <span className="gradient-text">Arrêtez de payer des Shootings Photos !</span>
                    </h1>

                    <p className="hero-subtitle">
                        Maîtrisez l'IA pour créer vos <strong>Logos</strong>, vos <strong>Mannequins</strong> et vos <strong>Pubs Facebook</strong> qui vendent.
                    </p>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">Vendeurs Formés</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">10x</div>
                            <div className="stat-label">ROI Moyen</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">24h</div>
                            <div className="stat-label">Accès Immédiat</div>
                        </div>
                    </div>

                    <a href="#pricing" className="cta-button primary-cta">
                        <span>JE RÉSERVE MA PLACE</span>
                        <ChevronRight size={20} />
                    </a>
                </div>
            </section>

            {/* Problem Section */}
            <section className="problem-section section-padding">
                <div className="container">
                    <h2 className="section-title">Vous Reconnaissez-vous ?</h2>

                    <div className="problems-grid">
                        <div className="problem-card">
                            <div className="problem-icon">
                                <XCircle size={48} strokeWidth={2} />
                            </div>
                            <h3>Shooting Photos Trop Cher</h3>
                            <p>Vous dépensez <strong>50 000 FCFA</strong> pour un shooting photo ?</p>
                        </div>

                        <div className="problem-card">
                            <div className="problem-icon">
                                <UserX size={48} strokeWidth={2} />
                            </div>
                            <h3>Mannequins Indisponibles</h3>
                            <p>Vos mannequins ne sont pas disponibles quand vous en avez besoin ?</p>
                        </div>

                        <div className="problem-card">
                            <div className="problem-icon">
                                <TrendingDown size={48} strokeWidth={2} />
                            </div>
                            <h3>Pubs Qui Ne Convertissent Pas</h3>
                            <p>Vos pubs Facebook ne rapportent pas de clients ?</p>
                        </div>
                    </div>

                    <div className="solution-banner">
                        <Zap className="solution-icon" size={32} />
                        <div className="solution-text">
                            <h3>La Solution : Devenez Autonome avec l'Intelligence Artificielle</h3>
                            <p>Créez des visuels professionnels en quelques minutes, sans dépendre de personne.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Program Section */}
            <section className="program-section section-padding">
                <div className="container">
                    <h2 className="section-title">Ce Que Vous Allez Apprendre</h2>

                    <div className="modules-container">
                        <div className="module-card">
                            <div className="module-header">
                                <div className="module-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                    <Palette size={40} strokeWidth={2} color="white" />
                                </div>
                                <h3>Module 1 : Branding & Logo</h3>
                                <span className="module-badge">IA Design</span>
                            </div>
                            <ul className="module-features">
                                <li><Check size={18} /> Créez un logo pro en 5 minutes sans graphiste</li>
                                <li><Check size={18} /> Créez l'identité visuelle de votre boutique</li>
                                <li><Check size={18} /> Générez des variations illimitées</li>
                            </ul>
                        </div>

                        <div className="module-card featured">
                            <div className="featured-badge">
                                <Award size={16} />
                                <span>LE SECRET</span>
                            </div>
                            <div className="module-header">
                                <div className="module-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                                    <ShoppingBag size={40} strokeWidth={2} color="white" />
                                </div>
                                <h3>Module 2 : Mannequins Virtuels</h3>
                                <span className="module-badge">Technologie Avancée</span>
                            </div>
                            <ul className="module-features">
                                <li><Check size={18} /> Prenez votre vêtement en photo sur un lit</li>
                                <li><Check size={18} /> L'IA le met sur un mannequin réaliste (Africain, Européen, Métis)</li>
                                <li><Check size={18} /> Décors de luxe automatiques</li>
                                <li><Check size={18} /> Technologie : Flux / Fal.ai</li>
                            </ul>
                        </div>

                        <div className="module-card">
                            <div className="module-header">
                                <div className="module-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                                    <Megaphone size={40} strokeWidth={2} color="white" />
                                </div>
                                <h3>Module 3 : Meta Ads & Copywriting</h3>
                                <span className="module-badge">Conversion</span>
                            </div>
                            <ul className="module-features">
                                <li><Check size={18} /> Générez des images de publicité qui arrêtent le scroll</li>
                                <li><Check size={18} /> Écrivez des textes de vente avec ChatGPT</li>
                                <li><Check size={18} /> Stratégies de ciblage Facebook/Instagram</li>
                                <li><Check size={18} /> Optimisation pour WhatsApp Business</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="pricing-section section-padding">
                <div className="container">
                    <h2 className="section-title">Choisissez Votre Pack</h2>
                    <p className="pricing-subtitle">Investissez dans votre business aujourd'hui. Économisez des milliers demain.</p>

                    <div className="pricing-grid">
                        {/* Pack Standard */}
                        <div className={`pricing-card ${selectedPack === 'standard' ? 'selected' : ''}`}>
                            <div className="pricing-header">
                                <h3>Pack STANDARD</h3>
                                <div className="price">
                                    <span className="currency">FCFA</span>
                                    <span className="amount">5 000</span>
                                </div>
                                <p className="price-description">Pour débuter avec l'IA</p>
                            </div>

                            <ul className="features-list">
                                <li className="included">
                                    <Check size={20} />
                                    <span>Les bases du Prompting</span>
                                </li>
                                <li className="included">
                                    <Check size={20} />
                                    <span>Création de Logo IA</span>
                                </li>
                                <li className="included">
                                    <Check size={20} />
                                    <span>Génération d'images simples</span>
                                </li>
                                <li className="included">
                                    <Check size={20} />
                                    <span>Support PDF</span>
                                </li>
                                <li className="excluded">
                                    <X size={20} />
                                    <span>Pas de Mannequins</span>
                                </li>
                                <li className="excluded">
                                    <X size={20} />
                                    <span>Pas de Module Meta Ads</span>
                                </li>
                                <li className="excluded">
                                    <X size={20} />
                                    <span>Pas de Replay Vidéo</span>
                                </li>
                            </ul>

                            <button
                                className="select-button"
                                onClick={() => {
                                    setSelectedPack('standard');
                                    setFormData(prev => ({ ...prev, pack: 'standard' }));
                                    document.getElementById('inscription').scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                CHOISIR 5 000 F
                            </button>
                        </div>

                        {/* Pack Pro */}
                        <div className={`pricing-card pro ${selectedPack === 'pro' ? 'selected' : ''}`}>
                            <div className="popular-badge">
                                <Sparkles size={14} />
                                <span>RECOMMANDÉ</span>
                            </div>

                            <div className="pricing-header">
                                <h3>Pack E-COMMERCE PRO</h3>
                                <div className="price">
                                    <span className="currency">FCFA</span>
                                    <span className="amount">10 000</span>
                                </div>
                                <p className="price-description">Pour les vendeurs sérieux</p>
                            </div>

                            <ul className="features-list">
                                <li className="included">
                                    <Check size={20} />
                                    <span><strong>Tout le Pack Standard</strong></span>
                                </li>
                                <li className="included highlight">
                                    <Check size={20} />
                                    <span><strong>Création de Mannequins Virtuels</strong></span>
                                </li>
                                <li className="included highlight">
                                    <Check size={20} />
                                    <span><strong>Intégration Produit Réaliste (Fal.ai)</strong></span>
                                </li>
                                <li className="included">
                                    <Check size={20} />
                                    <span>Module Pubs Meta (Facebook/Insta)</span>
                                </li>
                                <li className="included">
                                    <Check size={20} />
                                    <span>Accès au Replay Vidéo</span>
                                </li>
                                <li className="included">
                                    <Check size={20} />
                                    <span>Support WhatsApp Prioritaire</span>
                                </li>
                                <li className="included">
                                    <Check size={20} />
                                    <span>Mises à jour gratuites</span>
                                </li>
                            </ul>

                            <button
                                className="select-button pro-button"
                                onClick={() => {
                                    setSelectedPack('pro');
                                    setFormData(prev => ({ ...prev, pack: 'pro' }));
                                    document.getElementById('inscription').scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                <span>CHOISIR 10 000 F</span>
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="payment-info">
                        <p><CreditCard size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} /> Paiement sécurisé via <strong>Wave</strong> ou <strong>Orange Money</strong></p>
                    </div>
                </div>
            </section>

            {/* Registration Form */}
            <section id="inscription" className="registration-section section-padding">
                <div className="container">
                    <div className="form-container">
                        <div className="form-header">
                            <h2>Réservez Votre Place Maintenant</h2>
                            <p>Remplissez le formulaire ci-dessous. Nous vous contacterons sur WhatsApp pour finaliser votre inscription.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="registration-form">
                            <div className="form-group">
                                <label htmlFor="name">Nom Complet *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Votre nom complet"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="boutique">Nom de la Boutique (Optionnel)</label>
                                <input
                                    type="text"
                                    id="boutique"
                                    name="boutique"
                                    value={formData.boutique}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Fashion Store Dakar"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="whatsapp">Numéro WhatsApp *</label>
                                <input
                                    type="tel"
                                    id="whatsapp"
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="+221 XX XXX XX XX"
                                />
                            </div>

                            <div className="form-group">
                                <label>Choix du Pack *</label>
                                <div className="radio-group">
                                    <label className={`radio-option ${formData.pack === 'standard' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="pack"
                                            value="standard"
                                            checked={formData.pack === 'standard'}
                                            onChange={handleInputChange}
                                        />
                                        <span className="radio-label">
                                            <strong>Pack Standard</strong> - 5 000 FCFA
                                        </span>
                                    </label>

                                    <label className={`radio-option ${formData.pack === 'pro' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="pack"
                                            value="pro"
                                            checked={formData.pack === 'pro'}
                                            onChange={handleInputChange}
                                        />
                                        <span className="radio-label">
                                            <strong>Pack E-Commerce PRO</strong> - 10 000 FCFA
                                            <span className="recommended-tag">Recommandé</span>
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {submitStatus === 'success' && (
                                <div className="form-message success-message">
                                    <Check size={20} />
                                    <span>Inscription réussie ! Nous vous contacterons sur WhatsApp pour finaliser le paiement.</span>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="form-message error-message">
                                    <X size={20} />
                                    <span>Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.</span>
                                </div>
                            )}

                            <button type="submit" className="submit-button" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <div className="spinner"></div>
                                        <span>ENVOI EN COURS...</span>
                                    </>
                                ) : (
                                    <>
                                        <Zap size={20} />
                                        <span>CONFIRMER MON INSCRIPTION</span>
                                    </>
                                )}
                            </button>

                            <p className="form-footer">
                                En vous inscrivant, vous acceptez de recevoir les détails de paiement par WhatsApp.
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="trust-section">
                <div className="container">
                    <div className="trust-content">
                        <Users size={48} className="trust-icon" />
                        <h3>Rejoignez des centaines de vendeurs qui ont transformé leur business</h3>
                        <p>Formation 100% en ligne • Accès immédiat • Support WhatsApp inclus</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Formation;
