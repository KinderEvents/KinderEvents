import React, { useEffect, useRef } from 'react';
import { Users, Globe2, TrendingUp, Award } from 'lucide-react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const StatItem = ({ stat, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Extract number and suffix
    const numericValue = parseInt(stat.number.replace(/\D/g, '')) || 0;
    const suffix = stat.number.replace(/[0-9]/g, '');

    const count = useMotionValue(0);
    const rounded = useSpring(count, { stiffness: 50, damping: 20, duration: 2.5 });

    useEffect(() => {
        if (isInView) {
            count.set(numericValue);
        }
    }, [isInView, numericValue, count]);

    // Create a ref to display the animated value
    const displayRef = useRef(null);

    useEffect(() => {
        const unsubscribe = rounded.on("change", (latest) => {
            if (displayRef.current) {
                displayRef.current.textContent = Math.round(latest) + suffix;
            }
        });
        return () => unsubscribe();
    }, [rounded, suffix]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                padding: 'clamp(1.25rem, 4vw, 2rem)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                textAlign: 'center',
                cursor: 'default',
                boxShadow: isInView ? '0 10px 30px rgba(0,0,0,0.05)' : 'none'
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1rem',
                color: stat.color
            }}>
                {stat.icon}
            </div>
            <h3 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', margin: '0 0 0.5rem 0', fontWeight: '800', color: '#0F172A' }}>
                <span ref={displayRef}>0{suffix}</span>
            </h3>
            <p style={{ margin: 0, opacity: 0.7, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748B' }}>
                {stat.label}
            </p>
        </motion.div>
    );
};

const SocialStats = () => {
    const stats = [
        { icon: <Users size={24} />, number: "50+", label: "Entreprises Accompagnées", color: "#3B82F6" },
        { icon: <TrendingUp size={24} />, number: "250%", label: "Croissance Moyenne", color: "#10B981" },
        { icon: <Globe2 size={24} />, number: "5+", label: "Pays Couverts", color: "#8B5CF6" },
        { icon: <Award size={24} />, number: "100%", label: "Clients Satisfaits", color: "#F59E0B" },
    ];

    return (
        <section style={{ padding: '3rem 1rem', background: 'transparent' }}>
            <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.5rem'
            }}>
                {stats.map((stat, idx) => (
                    <StatItem key={idx} stat={stat} index={idx} />
                ))}
            </div>
        </section>
    );
};

export default SocialStats;
