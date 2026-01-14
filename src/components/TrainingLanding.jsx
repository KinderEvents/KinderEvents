import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Clock, HelpCircle, Lock, CheckCircle, ArrowRight, Star, ShieldCheck, Check, Zap, Search, Rocket, Timer, Video } from 'lucide-react';
import FormationInscriptionForm from './FormationInscriptionForm';
import ViralLoop from './ViralLoop';
import NewsletterSignup from './NewsletterSignup';
import '../styles/TrainingLanding.css';



const TrainingLanding = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openBooking = () => {
        setIsModalOpen(true);
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="training-page">
            {/* Modal for FormationInscriptionForm */}
            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '1rem'
                    }}
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '2rem',
                            maxWidth: '600px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflow: 'auto'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FormationInscriptionForm onClose={() => setIsModalOpen(false)} />
                    </div>
                </div>
            )}

            {/* 1. HERO SECTION */}
            <section className="t-container t-hero">
                <motion.div
                    initial="hidden" animate="visible" variants={fadeInUp}
                    className="t-hero-content"
                >
                    <span className="t-badge">Session Intensive • Places Limitées</span>
                    <h1>Tu as le projet.<br />Il te manque <span style={{ color: '#2563EB' }}>la méthode.</span></h1>
                    <p>
                        Apprends à utiliser les outils des pros (Meta, Canva, IA) pour vendre plus et te démarquer, même avec 0 budget.
                    </p>
                    <button onClick={() => openBooking()} className="t-btn-primary">
                        Réserver ma place (Dès 5 000 FCFA) <ArrowRight size={20} />
                    </button>

                    <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#64748B' }}>
                        <div style={{ display: 'flex' }}>
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />)}
                        </div>
                        <span>4.9/5 par +50 élèves</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
                    className="t-hero-visual mobile-visible"
                >
                    {/* CSS 3D Smartphone Mockup */}
                    <div className="t-phone-mockup">
                        <div className="t-phone-screen">
                            <div className="t-notif" style={{ animationDelay: '0.2s' }}>
                                <div style={{ background: '#10B981', padding: '5px', borderRadius: '50%' }}><CheckCircle size={14} /></div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Nouvelle commande</div>
                                    <div style={{ fontWeight: 'bold' }}>+ 15 000 FCFA</div>
                                </div>
                            </div>
                            <div className="t-notif" style={{ animationDelay: '1.5s' }}>
                                <div style={{ background: '#2563EB', padding: '5px', borderRadius: '50%' }}><CheckCircle size={14} /></div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Nouveau client</div>
                                    <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>Pack Validé <Check size={12} strokeWidth={3} /></div>
                                </div>
                            </div>
                            <div className="t-notif" style={{ animationDelay: '2.8s' }}>
                                <div style={{ background: '#F59E0B', padding: '5px', borderRadius: '50%' }}><Star size={14} /></div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Avis Reçu</div>
                                    <div style={{ fontWeight: 'bold' }}>"Formation incroyable !"</div>
                                </div>
                            </div>

                            {/* Fake Graph */}
                            <div style={{ marginTop: '50px', height: '150px', display: 'flex', alignItems: 'flex-end', gap: '10px', padding: '0 10px' }}>
                                <div style={{ flex: 1, height: '30%', background: 'rgba(255,255,255,0.1)', borderRadius: '5px' }}></div>
                                <div style={{ flex: 1, height: '50%', background: 'rgba(255,255,255,0.1)', borderRadius: '5px' }}></div>
                                <div style={{ flex: 1, height: '40%', background: 'rgba(255,255,255,0.1)', borderRadius: '5px' }}></div>
                                <div style={{ flex: 1, height: '80%', background: '#10B981', borderRadius: '5px', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* 2. THE PROBLEM GRID */}
            <section className="t-container t-section">
                <h2 className="t-section-title">Pourquoi tu stagnes <span style={{ color: '#EF4444' }}>(et comment <span style={{ whiteSpace: 'nowrap' }}>arrêter)&nbsp;?</span></span></h2>
                <div className="t-grid-4">
                    <motion.div whileHover={{ y: -5 }} className="t-card-problem">
                        <div className="t-icon-box t-icon-orange"><Eye /></div>
                        <h3>Tu postes dans le vide.</h3>
                        <p style={{ color: '#64748B' }}>Personne ne réagit. Tes vues ne décollent pas malgré tes efforts.</p>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} className="t-card-problem">
                        <div className="t-icon-box t-icon-red"><Clock /></div>
                        <h3>Tu perds ton temps.</h3>
                        <p style={{ color: '#64748B' }}>Tu passes des heures sur Canva ou WhatsApp sans stratégie claire.</p>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} className="t-card-problem">
                        <div className="t-icon-box t-icon-orange"><HelpCircle /></div>
                        <h3>Tu manques d'inspiration.</h3>
                        <p style={{ color: '#64748B' }}>Syndrome de la page blanche. Tu ne sais pas quoi dire pour vendre.</p>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} className="t-card-problem">
                        <div className="t-icon-box t-icon-red"><Lock /></div>
                        <h3>La méthode te manque.</h3>
                        <p style={{ color: '#64748B' }}>Tu vois les autres réussir et encaisser, mais tu n'as pas leur "secret".</p>
                    </motion.div>
                </div>
            </section>

            {/* NEW: VIRAL LOOP ANIMATION */}
            <section className="t-container" style={{ marginBottom: '6rem' }}>
                <ViralLoop />
            </section>

            {/* 3. CURRICULUM */}
            <section className="t-container t-section" style={{ background: '#F8FAFC' }}>
                <h2 className="t-section-title">Ce que tu vas maîtriser</h2>
                <div className="t-curriculum-list">
                    <div className="t-check-item" style={{ alignItems: 'flex-start' }}>
                        <div style={{ background: '#DCFCE7', padding: '10px', borderRadius: '50%', color: '#16A34A', flexShrink: 0 }}>
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', marginTop: 0 }}>Lancer & Choisir son Produit</h3>
                            <p style={{ color: '#64748B', lineHeight: 1.5 }}>Comment faire sa veille, trouver un produit gagnant et créer une offre irrésistible.</p>
                        </div>
                    </div>

                    <div className="t-check-item" style={{ alignItems: 'flex-start' }}>
                        <div style={{ background: '#DCFCE7', padding: '10px', borderRadius: '50%', color: '#16A34A', flexShrink: 0 }}>
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', marginTop: 0 }}>Vente & Closing (Psychologie)</h3>
                            <p style={{ color: '#64748B', lineHeight: 1.5 }}>Savoir parler au client, gérer les objections ("C'est trop cher") et fermer la vente.</p>
                        </div>
                    </div>

                    <div className="t-check-item" style={{ alignItems: 'flex-start' }}>
                        <div style={{ background: '#DCFCE7', padding: '10px', borderRadius: '50%', color: '#16A34A', flexShrink: 0 }}>
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', marginTop: 0 }}>Tournage & Montage (CapCut)</h3>
                            <p style={{ color: '#64748B', lineHeight: 1.5 }}>Créer des vidéos qui accrochent (Hooks), filmer au smartphone et montage pro.</p>
                        </div>
                    </div>

                    <div className="t-check-item" style={{ alignItems: 'flex-start' }}>
                        <div style={{ background: '#DCFCE7', padding: '10px', borderRadius: '50%', color: '#16A34A', flexShrink: 0 }}>
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', marginTop: 0 }}>Stratégie & Publicité Meta</h3>
                            <p style={{ color: '#64748B', lineHeight: 1.5 }}>Cibler les acheteurs qualifiés et ne plus jeter son argent par la fenêtre.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. PRICING */}
            <section id="pricing-grid" className="t-container t-section">
                <h2 className="t-section-title">Investis en toi-même</h2>
                <div className="t-pricing-grid">
                    {/* Card 1 */}
                    <div className="t-price-card">
                        <h3 style={{ fontSize: '1.5rem', color: '#64748B' }}>ESSENTIEL</h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: '800', margin: '1rem 0', color: '#0F172A' }}>5 000 <span style={{ fontSize: '1rem', fontWeight: '500' }}>FCFA</span></div>
                        <p style={{ marginBottom: '2rem', color: '#64748B' }}>Pour démarrer proprement.</p>

                        <ul style={{ textAlign: 'left', marginBottom: '2rem', space: '10px' }}>
                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={18} color="#16A34A" /> Accès Formation Vidéo</li>
                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={18} color="#16A34A" /> Outils & Templates de base</li>
                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={18} color="#16A34A" /> Replay disponible 24/7</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={18} color="#16A34A" /> Support Groupe WhatsApp</li>
                        </ul>

                        <button onClick={() => openBooking()} className="t-btn-outline">
                            Je commence (5k)
                        </button>
                    </div>

                    {/* Card 2 - Highlight */}
                    <div className="t-price-card t-price-highlight">
                        <div className="t-price-badge">RECOMMANDÉ</div>
                        <h3 style={{ fontSize: '1.5rem', color: '#2563EB', fontWeight: '800' }}>ACCÉLÉRATION</h3>
                        <div style={{ fontSize: '3rem', fontWeight: '800', margin: '1rem 0', color: '#0F172A' }}>10 000 <span style={{ fontSize: '1rem', fontWeight: '500' }}>FCFA</span></div>
                        <p style={{ marginBottom: '2rem', color: '#64748B' }}>Pour des résultats rapides.</p>

                        <ul style={{ textAlign: 'left', marginBottom: '2rem' }}>
                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={18} color="#16A34A" /> <strong>Tout le pack Essentiel</strong></li>
                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><Video size={18} color="#F59E0B" /> <strong>Module Tournage & Montage (CapCut)</strong></li>
                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><Zap size={18} color="#F59E0B" /> <strong>Coaching Personnalisé (1h)</strong></li>
                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><Search size={18} color="#2563EB" /> <strong>Audit de ton Business</strong></li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Rocket size={18} color="#9333EA" /> <strong>Priorité aux Questions</strong></li>
                        </ul>

                        <button onClick={() => openBooking()} className="t-btn-grad">
                            Je veux des résultats (10k)
                        </button>
                    </div>
                </div>
            </section>

            {/* 5. TRUST & AUTHORITY */}
            <section className="t-trust">
                <div className="t-container">
                    {/* Partners */}
                    <p style={{ textTransform: 'uppercase', letterSpacing: '2px', color: '#94A3B8', fontWeight: '700', marginBottom: '1.5rem' }}>
                        PARTENAIRES
                    </p>
                    <div style={{
                        display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap',
                        opacity: 0.5, filter: 'grayscale(100%)', marginBottom: '3rem', alignItems: 'center'
                    }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0F172A' }}>JËNDAL</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0F172A' }}>UGB MARKET</div>
                    </div>

                    {/* Certifications & Tools */}
                    <p style={{ textTransform: 'uppercase', letterSpacing: '2px', color: '#94A3B8', fontWeight: '700', marginBottom: '1.5rem' }}>
                        CERTIFICATIONS & OUTILS MAÎTRISÉS
                    </p>
                    <div style={{
                        display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap',
                        opacity: 0.4, alignItems: 'center', fontWeight: '700', color: '#334155'
                    }}>
                        <div style={{ fontSize: '1.4rem' }}>OPENCLASSROOMS</div>
                        <div style={{ fontSize: '1.4rem' }}>META</div>
                        <div style={{ fontSize: '1.4rem' }}>LINKEDIN LEARNING</div>
                        <div style={{ fontSize: '1.4rem' }}>FORCE ONE</div>
                        <div style={{ width: '1px', height: '30px', background: '#CBD5E1' }}></div>
                        <div style={{ fontSize: '1.4rem' }}>CANVA</div>
                        <div style={{ fontSize: '1.4rem' }}>AI TOOLS</div>
                    </div>

                    {/* Bio */}
                    <div className="t-bio">
                        <div className="t-bio-img"></div>
                        <div>
                            <p style={{ fontStyle: 'italic', marginBottom: '0.8rem', color: '#475569', fontSize: '1.05rem', lineHeight: '1.6' }}>
                                "J'ai réuni dans cette formation mes certifications (Meta, Google) et surtout mon expérience terrain avec Jëndal et UGB Market. Je ne vends pas du rêve, je partage la méthode exacte qui m'a permis de réussir."
                            </p>
                            <p style={{ fontWeight: '800', color: '#0F172A' }}>— Le Formateur VisionR</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. URGENCY FOOTER (Mobile Sticky) */}
            <div className="t-sticky-footer">
                <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '5px' }}><Timer size={14} /> PLACES LIMITÉES</div>
                    <div style={{ fontSize: '0.9rem', color: '#0F172A' }}>Prochaine session bientôt</div>
                </div>
                <button
                    onClick={() => openBooking()}
                    style={{ background: '#2563EB', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '700' }}
                >
                    Réserver
                </button>
            </div>

            <div className="t-container" style={{ marginTop: '4rem', marginBottom: '8rem' }}>
                <NewsletterSignup />
            </div>
        </div>
    );
};

export default TrainingLanding;
