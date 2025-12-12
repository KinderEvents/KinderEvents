import React, { useState, useRef } from 'react';
import '../styles/BeforeAfter.css';

const BeforeAfter = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPosition(percentage);
    };

    const handleTouchMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPosition(percentage);
    };

    return (
        <section className="section-padding container">
            <h2 className="section-title text-center">La Preuve par l'Image</h2>
            <p className="section-subtitle text-center">Glissez pour voir la différence IA</p>

            <div
                className="before-after-container glass-panel"
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
            >
                <div
                    className="image-after"
                    style={{ backgroundImage: 'url(/assets/projects/burger-smoke.jpg)' }}
                >
                    <span className="label label-after">APRÈS (IA VisionR)</span>
                </div>

                <div
                    className="image-before"
                    style={{ width: `${sliderPosition}%`, backgroundImage: 'url(/assets/projects/burger-float.png)' }}
                >
                    <span className="label label-before">AVANT (Smartphone)</span>
                </div>

                <div
                    className="slider-handle"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="slider-line"></div>
                    <div className="slider-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(180deg)' }}><path d="m9 18 6-6-6-6" /></svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BeforeAfter;
