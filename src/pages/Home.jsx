import React from 'react';
import { Hero, WhyChooseAI, ProjectsGallery, Pricing, Process, TechStack, NewsTrends, Testimonials, Contact, BeforeAfter, FormationBanner } from '../components';

const Home = () => {
    return (
        <>
            <Hero />
            <BeforeAfter />
            <WhyChooseAI />
            <ProjectsGallery />
            <Testimonials />
            <FormationBanner />
            <NewsTrends />
            <Pricing />
            <Process />
            <TechStack />
            <Contact />
        </>
    );
};

export default Home;
