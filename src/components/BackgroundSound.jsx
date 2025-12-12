import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundSound = () => {
    const [isMuted, setIsMuted] = useState(true); // Default muted (browser policy)
    const audioRef = useRef(null);

    const toggleSound = () => {
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.volume = 0.3; // Low volume background
                audioRef.current.play().catch(e => console.log("Audio play failed", e));
            } else {
                audioRef.current.pause();
            }
            setIsMuted(!isMuted);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #bd00ff',
            borderRadius: '50%',
            padding: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(189, 0, 255, 0.4)'
        }} onClick={toggleSound}>
            {isMuted ? <VolumeX color="white" size={24} /> : <Volume2 color="#bd00ff" size={24} />}
            <audio ref={audioRef} loop>
                <source src="https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3" type="audio/mpeg" />
            </audio>
        </div>
    );
};

export default BackgroundSound;
