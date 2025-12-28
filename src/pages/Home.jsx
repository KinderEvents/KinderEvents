import React from 'react';
import {
    LightHero,
    SidePilot,
    BentoPricing,
    SocialStats,
    ServicesHighlight,
    ProjectsGallery,
    Testimonials,
    FormationBanner,
    Contact,
    NewsTrends,
    Pricing,
    WhyChooseAI,
    Process,
    TechStack,
    ScrollReveal,
    NewsletterSignup
} from '../components';

const Home = () => {
    return (
        <div style={{ overflowX: 'hidden', background: '#F8FAFC' }}>
            {/* The Intelligent Assistant - Always accessible */}
            <SidePilot />

            {/* New Light Tech Hero */}
            <LightHero />

            {/* Social Proof (Updated to blend with light theme) */}
            <div style={{ background: 'white' }}>
                <ScrollReveal delay={0.2}>
                    <SocialStats />
                </ScrollReveal>
            </div>

            {/* Pricing / Solutions (The new core) */}
            <ScrollReveal>
                <BentoPricing />
            </ScrollReveal>

            {/* Services Highlight (Detailed view) */}
            <ScrollReveal>
                <ServicesHighlight />
            </ScrollReveal>

            {/* AI VIDEO STUDIO SECTION */}
            <div style={{ background: 'white', paddingBottom: '4rem' }}>
                <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
                    <ScrollReveal>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0F172A' }}>Studio IA & Vidéo</h2>
                        <p style={{ color: '#64748B', maxWidth: '600px', margin: '1rem auto' }}>
                            Créez des visuels impossibles à filmer. L'hyper-réalisme au service de votre marque.
                        </p>
                    </ScrollReveal>
                </div>
                <ScrollReveal delay={0.1}><WhyChooseAI /></ScrollReveal>
                <ScrollReveal delay={0.2}><Pricing /></ScrollReveal>
                <ScrollReveal delay={0.3}><Process /></ScrollReveal>
                <ScrollReveal delay={0.4}><TechStack /></ScrollReveal>
            </div>

            {/* Galerie Projets */}
            <ScrollReveal>
                <ProjectsGallery />
            </ScrollReveal>

            {/* Témoignages */}
            <ScrollReveal>
                <Testimonials />
            </ScrollReveal>

            {/* Banner Formation */}
            <ScrollReveal>
                <FormationBanner />
            </ScrollReveal>

            {/* Actu & Trends */}
            <ScrollReveal>
                <NewsTrends />
            </ScrollReveal>

            {/* Contact Final */}
            <Contact />
        </div>
    );
};

export default Home;
